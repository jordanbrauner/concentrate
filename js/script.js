$(document).ready(function() {

  // declare variables
  var clicks = 0;
  var matched = 0;
  var match1;
  var match2;
  var matchElement1;
  var matchElement2;
  var matchElementColor;
  var wrong;
  var lives = 4;
  $('#lives').text(lives);

  // shows all the colors briefly at the start of the game
  var showBoard = function () {
    $('.start').toggleClass('start');
    $('.game-title').text('CONCENTRATE!');
    $('.hide').toggleClass('hide');
  }

  // runs when an incorrect match is made
  var wrongMatch = function () {
    $(matchElement1).toggleClass('hide');
    $(matchElement2).toggleClass('hide');
    lives -= 1;
    $('#lives').text(lives);
    clicks = 0;
    console.log(lives);
    $('.game-title').text('CONCENTRATE!');
    if (lives === 0) {
      $('.game-title').text('GAME OVER!');
      $('.game-title').toggleClass('start');
    }
  }

  // runs when a correct match is made
  var correctMatch = function () {
    $('.game-title').text('PICK ANOTHER!');
  }

  // starts the game
  var startGame = function () {
    $('#tile-wrapper div').toggleClass('hide')
    $('.hide').on('click', function() {
    if (matched === 5) {
      console.log('You Win');
    }
    else if ((lives !== 0) && (matched !== 8)) {
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
          $('.game-title').text('MATCHED!');
          clicks = 0;
          matched += 1;
          matchElementColor = matchElement2.css('background-color');
          $("#match-icon-"+matched).css('background-color', matchElementColor);
          setTimeout(correctMatch, 1000);
        }
        else {
          $('.game-title').text('NOT A MATCH!');
          setTimeout(wrongMatch, 1000);
        }
      }
    }
  });
  }
  //shows the colors in the tiles then hides them
  $('.game-title').on('click', function() {
    setTimeout(showBoard, 300);
    setTimeout(startGame, 2000);
  });
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
