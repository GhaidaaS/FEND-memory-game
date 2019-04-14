/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cards=[...card];
let deck = document.querySelector(".deck");
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//Shuffle items and add it to the HTML
function add_list(cards) {
   var shuffledCards = shuffle(cards);
   for (var i= 0; i < shuffledCards.length; i++){
      [].forEach.call(shuffledCards, function(item){
         deck.appendChild(item);
      });
   }
}
//function of start game
function startGame(){
  cards = shuffle(cards);
  add_list(cards);

  var preCard;
  var preCardType ;
  var moveCount = 0;
  var matched = 0;
  var cardSelected=false;
  var starsNum =3;
  document.getElementById("moves").textContent=moveCount;
  $(".card").click(function(){
    moveCount+=1;
    if (moveCount===1) {
      start();
    }
    document.getElementById("moves").textContent=moveCount;

    if((cardSelected==true) && (matched<=8) ){
      var curCard= $(this).attr("class");
      var curCardType=$(this).children().attr("class");

    if (curCard === "card") {
      if (curCardType === preCardType) {
        $(this).toggleClass("match show");
        $(".open.show").toggleClass("match show open");
        cardSelected=false;
        matched+=1;

      if(matched==8){
        clearInterval(intervalId);
        swal({
          title: "Congratulations! You Won!",
          text: "With "+moveCount+" moves and "+starsNum+" stars woooo!"  ,
          type: "success",
          button: "play again",
            }).then(function() {
            restart();
            });
        }
        } 
      else {
        $(this).addClass("unmatch show");
        $(".open.show").addClass("unmatch show").removeClass("open");
        setTimeout(function() {
          $(".unmatch.show").removeClass("unmatch show");
          $(".open.show").removeClass("unmatch show ");
          }, 500);
        cardSelected=false;
      }
      }}

    else{
      preCard = $(this).attr("class");
      preCardType=$(this).children().attr("class");
      $(this).addClass("show open ");
      cardSelected=true;
    }
    if(moveCount>= 18 && moveCount<22){
      $("#3").remove();
      starsNum=2;
    }
    else if(moveCount>= 22){
      $("#2").remove();
      starsNum=1;
    }
  });

}
//function of restart
document.getElementById("restart").addEventListener("click", restart);
function restart (){
  setTimeout(function(){
    for (var i = 0; i < cards.length; i++) {
    $(cards[i]).removeClass("show open match");
  }}, 500);
  clearTimeout(intervalId);
  document.getElementById("time").textContent ="00:00";
  startGame();
}

//functions of timer
var time, intervalId;
function start() {
  time = -1;
  incrementTime();
  intervalId = setInterval(incrementTime, 1000);
}
function incrementTime() {
  time++;
  document.getElementById("time").textContent =
    ("0" + Math.trunc(time / 60)).slice(-2) +
    ":" + ("0" + (time % 60)).slice(-2);
}

//start game when loud the page
window.onload = startGame();

