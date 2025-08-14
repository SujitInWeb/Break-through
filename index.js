const ground = document.querySelector('.ground');
const ctx = ground.getContext('2d');

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

const brickRowCount = 8;
const brickColumnCount = 5;

let brickLayout = {};

function calculateBrickLayout(){
    const topMargin = groundHeight * 0.1 ;
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
                h :brickLayout.h,
                visible :true,
                color : 'lightgreen'
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
    paddle.y = groundHeight - paddle.h - (groundHeight *0.5);
    paddle.speed = ground * 0.012 ;
    paddle.dx = 0;
}
createBricks();
resetGameElement();
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x , ball.y,ball.size,0 ,Math.PI *2);
    ctx.fillStyle ='red'
    ctx.fill();
    ctx.strokeStyle='red';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.roundRect(paddle.x ,paddle.y , paddle.w , paddle.h ,5);
    ctx.fillStyle = 'lightgreen';
    ctx.fill();
    ctx.strokeStyle= 'lightgreen';
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

    ctx.font = `${fontSize *0.6}px Arial`;
    ctx.fillStyle ='#888';
    ctx.fillText(`${groundWidth} x ${groundHeight}` , 20 , fontSize + 30);
}

function drawBricks(){
    bricks.forEach(column =>{
        column.forEach(brick =>{
            if(brick.visible){
                ctx.beginPath();
                ctx.roundRect(brick.x,brick.y,brick.w ,brick.h,3);
                ctx.fillStyle = brick.color;
                ctx.fill();
                ctx.strokeStyle = 'light green';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.closePath();
            }
        });
    });
}

function movePaddle(){
    paddle.x += paddle.dx ;

    if( paddle.x + paddle.w > groundWidth){
        paddle.x = groundWidth - paddle.w;
    }
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
    ctx.clearRect(0,0, groundWidth,groundHeight);
    if(gameRunning){
        drawBall();
        drawPaddle();
        drawScore();
        drawBricks();
    }
}

function update(){
    if (gameRunning){
        movePaddle();
        moveBall();
    }
    draw();
    requestAnimationFrame(update);
}
update();