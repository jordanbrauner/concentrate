$(document).ready(function() {

  // create tile divs
  var createTileDivs = function() {
    for (var i = 0; i < 16; i ++) {
      $('#tile-wrapper').append("<div class='tile-bottom'><div class='tile-top'></div></div>");
      // $('#tile-wrapper').append("<div class='tile' id=\""+i+"tile\"></div>");
    }
    $('.tile-top').append("<p id='tile-back'>C</p>")
  }
  createTileDivs();

  // On click, reveal tile
  // $('.tile-top').on('click', function() {
  //   $(this).hide()
  // });
});

var guesses = 4;
$('#guesses').append(guesses);


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

// $(document).ready(function() {
//
//   // create tile divs
//   var createTileDivs = function() {
//     for (var i = 0; i < 16; i ++) {
//       $('#tile-wrapper').append("<div class='tile'></div>");
//       // $('#tile-wrapper').append("<div class='tile' id=\""+i+"tile\"></div>");
//     }
//     $('.tile').append("<p id='tileBack'>C</p>")
//   }
//   createTileDivs();
//
//   // On click, reveal tile
// });
//
// var guesses = 4;
// $('#guesses').append(guesses);
//
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


// for (var i = 0; usedTiles.length < 17; i++) {
//   usedTiles.push(deck[i]);
//   // $("\"#"+i+"tile\"").css("background-color", deck[i]);
// }

// $('#tile-yellow').on('click', function () {
//   $(this).attr('background', 'yellow');
// });


// var storeColor = function(color) {
//   $('#2tile').css("background-color", color);
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
