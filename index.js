//taking constants in order to manipulate the canvas

const ground = document.querySelector('.ground');
const ctx = ground.getContext('2d');
//working on canvas responsiveness in each width of the different screens 
function setupCanvas(){
    const container  = document.querySelector('.ground-container');
    const rect = container.getBoundingClientRect();

    ground.width = rect.width;
    ground.height = rect.height;

    ground.style.width = rect.width + 'px';
    ground.style.height = rect.height +'px';
}

setupCanvas();

let groundWidth = ground.width;
let groundHeight = ground.height;

window.addEventListener('resize' , () => {
    setupCanvas();
    groundWidth = ground.width;
    groundHeight = ground.height;

    calculateBrickLayout();
    resetGameElement();

});

let score = 0;
let gameRunning = true;

//keeping the valus of brick column and row same cuz the no of bricks must remain constant
const brickRowCount = 8;
const brickColumnCount = 5;

let brickLayout = {};

function calculateBrickLayout(){
    const topMargin = groundHeight * 0.13 ;
    const sideMargin = groundWidth * 0.05 ;
    const bottomMargin = groundHeight *0.4;

    const availableWidth = groundWidth - (sideMargin * 2);
    const availableHeight = groundHeight -topMargin - bottomMargin ;

    const paddingBetweenBricks = Math.min(groundWidth *0.01,8);

    const totalPaddingWidth = (brickRowCount - 1) * paddingBetweenBricks;
    const totalPaddingHeight = (brickColumnCount - 1) * paddingBetweenBricks;

    brickLayout = {
        w : (availableWidth - totalPaddingWidth) / brickRowCount,
        h : (availableHeight - totalPaddingHeight) / brickColumnCount,
        padding : paddingBetweenBricks ,
        offsetX : sideMargin,
        offsetY :topMargin,
        visible : true
    };
}

calculateBrickLayout();
//setting up the objects as 0 as they change acc to canvas size
const ball ={
    x:0 ,y : 0, size:0,speed:0,dx:0,dy:0
};
const paddle ={
    x: 0, y:0,w:0,h:0,speed : 0,dx :0
};

const bricks =[];
function createBricks(){
    bricks.length = 0

    for(let i =0 ; i < brickRowCount ; i++){
        bricks[i] =[];
        for(let j = 0 ; j <brickColumnCount ; j++){
            const x = i* (brickLayout.w + brickLayout.padding) + brickLayout.offsetX;
            const y = j * (brickLayout.h +brickLayout.padding) +brickLayout.offsetY;
            bricks[i][j] ={
                x,
                y,
                w : brickLayout.w,
                h :brickLayout.h-10,
                visible :true,
                color : '#F0F6FC'
            };
        }
    }
}

function resetGameElement(){
    ball.size = Math.min(groundWidth, groundHeight) * 0.015;
    ball.speed = Math.min(groundWidth , groundHeight) * 0.008;
    ball.x = groundWidth / 2;
    ball.y = groundHeight *0.7;
    ball.dx = ball.speed;
    ball.dy = -ball.speed;

    paddle.w = groundWidth * 0.15;
    paddle.h = groundHeight * 0.02;
    paddle.x = groundWidth / 2 - paddle.w /2 ;
    paddle.y = groundHeight - paddle.h - (groundHeight *0.05);
    paddle.speed = groundWidth * 0.012 ;
    paddle.dx = 0;
}
createBricks();
resetGameElement();
function drawBall(){
    ctx.beginPath();
    //ctx arc is used to draw a circle or semi circle just nedd to add at last math.pi*2 for circle
    ctx.arc(ball.x , ball.y,ball.size,0 ,Math.PI *2);
    ctx.fillStyle ='#F0F6FC'
    ctx.fill();
    ctx.strokeStyle='##3D444D';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddle.x ,paddle.y , paddle.w , paddle.h ,5);
    ctx.fillStyle = '#F0F6FC';
    ctx.fill();
    ctx.strokeStyle= '#3D444D';
    ctx.lineWidth= 2;
    ctx.stroke();
    ctx.closePath();
}

function drawScore(){
    const fontSize = Math.min(groundWidth , groundHeight) * 0.04;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle ='white';
    ctx.textAlign ='left';
    ctx.fillText(`Score : ${score}`,20,fontSize +10);
    ground.style.padding ='20px';
    ctx.font = `${fontSize *0.6}px Arial`;
    ctx.fillStyle ='#888';
    ctx.fillText(`${groundWidth} x ${groundHeight}` , 20 , fontSize + 30)
}

function drawBricks(){
    bricks.forEach(column =>{
        column.forEach(brick =>{
            if(brick.visible){
                ctx.beginPath();
                ctx.rect(brick.x,brick.y,brick.w ,brick.h,3);
                ctx.fillStyle = brick.color;
                ctx.fill();
                ctx.strokeStyle = '#3D444D';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.closePath();
            }
        });
    });
}

function movePaddle(){
    paddle.x += paddle.dx ;
    //keeps the paddle on the canvas of the right wall so it doesnt vanishes
    if( paddle.x + paddle.w > groundWidth){
        paddle.x = groundWidth - paddle.w;
    }
    //keeps the paddle on the canvas of the left wall so it doesnt vanishes
    if(paddle.x < 0 ){
        paddle.x = 0;
    }
}

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.x +ball.size >groundWidth || ball.x - ball.size <0){
        ball.dx *=-1;
    }
    if (ball.y - ball.size < 0){
        ball.dy *= -1;
    }
    
    if(
        ball.x +ball.size >paddle.x && 
        ball.x - ball.size <paddle.x +paddle.w && 
        ball.y + ball.size > paddle.y &&
        ball.y - ball.size < paddle.y +paddle.h
    ){
        //made some bouncing angle when ball hits on the paddle
        const hitpos = (ball.x - paddle.x) / paddle.w;
        const angle = (hitpos - 0.5) * Math.PI / 3;
        const speed = ball.speed;
        ball.dx = Math.sin(angle)* speed;
        ball.dy = -Math.abs(Math.cos(angle) * speed);
    }
    bricks.forEach(column =>{
        column.forEach(brick =>{
            if(brick.visible){
                if(
                    ball.x -ball.size <brick.x + brick.w &&
                    ball.x + ball.size > brick.x &&
                    ball.y - ball.size < brick.y +brick.h &&
                    ball.y + ball.size >brick.y
                ){
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                }
            }
        });
    });
    //checks if the ball hits the ground insted of paddle
    if (ball.y +ball.size >groundHeight){
        resetGame();
    }
}
function increaseScore(){
    score++;
    let allDestroyed = true;
    bricks.forEach(column => {
        column.forEach(brick =>{
            if(brick.visible) allDestroyed = false;
        });
    });
    //jumps into next level so that the game continues
    if(allDestroyed){
        createBricks();
    }
}

function resetGame(){
    score = 0;
    createBricks();
    resetGameElement();
}


function draw(){
    //clears the canvas and draws the objects using function call
    ctx.clearRect(0,0, groundWidth,groundHeight);
    if(gameRunning){
        drawBall();
        drawPaddle();
        drawScore();
        drawBricks();
    }
}

function update(){
    //makes a slide frame so it looks like the objects are moving
    if (gameRunning){
        movePaddle();
        moveBall();
    }
    draw();
    //requesting an animation frame to constantly update the screen
    requestAnimationFrame(update);
}

//key funtions wich control the paddle so that the user could control the paddle and move it as he wants
function KeyDown(e){
    if(e.key === 'ArrowRight' || e.key === 'Right' || e.key === 'd' || e.key === 'D'){
        paddle.dx = paddle.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left' || e.key === 'a'|| e.key ==='A'){
        paddle.dx =-paddle.speed;
    }
    if(e.key === ' '){
        e.preventDefault();
        gameRunning = !gameRunning;
    }
}
//function for movement of the arrow key to move the paddle
function KeyUp(e){
    if (
        e.key ==='ArrowRight' || e.key ==='Right' || e.key === 'd'|| e.key === 'D' ||
        e.key === 'ArrowLeft' || e.key === 'Left' || e.key === 'a' || e.key === 'A'
    ){
        paddle.dx =0;
    }
}
//keeps a record wheather a key is pressed in order to move the paddle and calls the function accordingly
document.addEventListener('keydown' ,KeyDown);
document.addEventListener('keyup' , KeyUp);

update();