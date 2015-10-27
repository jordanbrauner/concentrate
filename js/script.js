$(document).ready(function() {

  var clicks = 0;
  var matched = 0;
  var match1;
  var match2;
  var matchElement1;
  var matchElement2;
  var wrong;

  var guesses = 4;
  $('#guesses').text(guesses);

  var showBoard = function () {
    $('.hide').toggleClass('hide');
  }

  var hideBoard = function () {
    $('#tile-wrapper div').toggleClass('hide');
  }

  var wrongMatch = function () {
    console.log("Sorry, try again!!");
    $(matchElement1).toggleClass('hide');
    $(matchElement2).toggleClass('hide');
    guesses -= 1;
    $('#guesses').text(guesses);
    clicks = 0;
    console.log(guesses);
    if (guesses === 0) {
      console.log("game over!");
    }
  }

  $('.hide').on('click', function() {
    if (matched === 1) {
      console.log('You Win');
    }
    else if ((guesses !== 0) && (matched !== 8)) {
      if (clicks === 0) {
        $(this).toggleClass('hide');
        matchElement1 = $(this);
        match1 = $(this).attr('class');
        clicks += 1;
      }
      else {
        $(this).toggleClass('hide');
        matchElement2 = $(this);
        match2 = $(this).attr('class');
        if (match1 === match2) {
          console.log("It's a match!");
          clicks = 0;
          matched += 1;
          console.log("Matches: " + matched);
        }
        else {
          setTimeout(wrongMatch, 700);
        }
      }
    }
  });
  setTimeout(showBoard, 1000);
  setTimeout(hideBoard, 3000);
});


/************************
RANDOMIZING THE BOARD
************************/

// var deck = [
//     "red",
//     "red",
//     "blue",
//     "blue",
//     "yellow",
//     "yellow",
//     "green",
//     "green",
//     "aqua",
//     "aqua",
//     "slategray",
//     "slategray",
//     "lemonchiffon",
//     "lemonchiffon",
//     "rebeccapurple",
//     "rebeccapurple"
// ];
//
// var usedTiles = [];



/************************
OLD CODE
************************/

// var deck = [
//     "red",
//     "red",
//     "blue",
//     "blue",
//     "yellow",
//     "yellow",
//     "green",
//     "green",
//     "aqua",
//     "aqua",
//     "slategray",
//     "slategray",
//     "lemonchiffon",
//     "lemonchiffon",
//     "rebeccapurple",
//     "rebeccapurple"
// ];

// var usedTiles = [];

// for (var i = 0; usedTiles.length < 17; i++) {
//   usedTiles.push(deck[i]);
//   // $("\"#"+i+"tile\"").css("background-color", deck[i]);
// }

// random: function () {
//     var random = Math.random();
//     for (var i = 0; i < 16; i++) {
//       var ranNum = 0;
//       var rng = function () {
//         if (random < 0.12) {
//             var ranNum = this.deck[0];
//         }
//         else if (random < 0.24) {
//             var ranNum = this.deck[1];
//         }
//         else if (random < 0.36) {
//             var ranNum = this.deck[2];
//         }
//         else if (random < 0.48) {
//             var ranNum = this.deck[3];
//         }
//         else if (random < 0.60) {
//             var ranNum = this.deck[4];
//         }
//         else if (random < 0.72) {
//             var ranNum = this.deck[5];
//         }
//         else if (random < 0.84) {
//             var ranNum = this.deck[6];
//         }
//         else {
//             var ranNum = this.deck[7];
//         }
//       }
//     }
