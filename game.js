var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];

$(".btn").on("click",function(event){
   var userChoisenColor=event.target.id;
   userClickedPattern.push(userChoisenColor);
   var audio=new Audio("sounds/"+userChoisenColor+".mp3");
    audio.play();
    checkAnswer(userClickedPattern.length-1);
})
var started=false;
var level=0;
$(document).keypress(function(event){
    if (!started) {
        started = true;
        nextSequence();
      }
})
function nextSequence(){
    userClickedPattern=[];
    level++;
  $("#level-title").text("Level " + level);
    var a;
    a=Math.random();
    a=Math.floor(a*4);
    var randomChoisenColour=buttonColours[a];
    gamePattern.push(randomChoisenColour);
    animatePress(randomChoisenColour);
    playSound(randomChoisenColour);
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed"); 
    },100)
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
    }else {
        console.log("failed");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

    if(userClickedPattern.length===gamePattern.length && gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        setTimeout(function(){nextSequence()},1000);
    }else console.log("wrong");
}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}