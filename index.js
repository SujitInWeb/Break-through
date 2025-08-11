const ground = document.querySelector('.ground');
const ctx = ground.getContext('2d');

ground.width = ground.clientWidth;
ground.height = ground.clientHeight;

const groundWidth = ground.width;
const groundHeight = ground.height;

let score = 0;

const brickRowCount = 9;
const brickColumnCount= 5;

//create ball
const ball ={
    x: ground.width /2,
    y : ground.height /2,
    size:10,
    speed : 4,
    dx :4,
    dy : -4
};

//create paddle
const paddle ={
    x:ground.width / 2 -40,
    y : ground.height - 20,
    w :80,
    h: 10,
    speed :8,
    dx :0
};
//create brick
const brickInfo ={
    w: 70,
    h: 20,
    padding : 10,
    offsetX :45,
    offsetY : 60,
    visible: true
};

//create bricks
const bricks = [];
for (let i = 0 ; i <brickRowCount ; i ++){
    bricks[i]=[];
    for(let j = 0 ; j <brickColumnCount; j ++ ){
        const x= i * (brickInfo.w + brickInfo.padding)+brickInfo.offsetX;
        const y = j *(brickInfo.h +brickInfo.padding)+brickInfo.offsetY;
        bricks[i][j] = {x,y, ...brickInfo};
    }
}
//draw ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.size ,0 , Math.PI *2);
    ctx.fillStyle = 'Red';
    ctx.fill();
    ctx.closePath();
}
//draw paddle on canvas
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddle.x,paddle.y,paddle.w,paddle.h);
    ctx.fillStyle ='lightgreen'
    ctx.fill();
    ctx.closePath();
}
//draw Score on canvas
function drawScore(){
    ctx.font = '20px Arial';
    ctx.filltext(`Score :${score}` , ground.width -100 ,30);
}
//Draw bricks
function DrawBricks(){
    
}