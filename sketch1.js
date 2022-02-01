var ball;
var hipnoticBall,database;
var position;

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);
    //ball = createSprite(250,250,10,10);
    //ball.shapeColor = "red";
    hipnoticBall = createSprite (250,250,20,20);
    hipnoticBall.shapeColor = "lightgreen";
    var hipnoticBallPosition = database.ref('pelota/posición');
    hipnoticBallPosition.on("value",readPosition,showError);
}

function draw(){
    background("orange");
    if(position!== undefined){

        if(keyDown(LEFT_ARROW)){
            //changePosition(-1,0);
            writePosition(-1,0)
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
    drawSprites();
    }
}

function writePosition(x,y){
    database.ref('pelota/posición').set({
     'x' : position.x + x,
     'y' : position.y + y
    })
}

function readPosition(data){
    position = data.val();
    hipnoticBall.x = position.x;
    hipnoticBall.y = position.y;
}

function showError(){
    console.log("error al escribir en la BD");
}
