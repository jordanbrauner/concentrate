$(document).ready(function() {

  // Start splash screen
  $('#small-logo-1').hide();
  $('#small-logo-2').hide();
  $('.game-title').text("READY?");

  // Declare variables
  var countdownNum = 3;
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
  // var dingSFX = $('#dingSound')[0];
  // var matchSFX = $('#matchSound')[0];

  // Sound effects
  // $(".hide").mouseenter(function() {
  //   dingSFX.play();
  // });

  // Choose a random quote
  var randomQuote = function () {
    var random = Math.random();
    if (random < 0.20) {
      $('.quote').text("Democracy is a beautiful thing, except for that part about letting just any old yokel vote.\"");
    }
    else if (random < 0.40) {
      $('.quote').text("If trees could scream, would we be so cavalier about cutting them down? We might, if they screamed all the time, for no good reason.\"");
    }
    else if (random < 0.60) {
      $('.quote').text("When you go in for a job interview, I think a good thing to ask is if they ever press charges\"");
    }
    else if (random < 0.80) {
      $('.quote').text("If you ever accidentally drop your keys into a river of molten lava, let 'em go, because man, they're gone.\"");
    }
    else {
      $('.quote').text("Children need encouragement. If a kid gets an answer right, tell him it was a lucky guess. That way he develops a good, lucky feeling.\"");
    }
  }
  randomQuote();

  // Begin game when user clicks on #splash-image
  $('#splash-image').on('click', function() {
    $('#splash-image').hide();
    $('#small-logo-1').show();
    $('#small-logo-2').show();
    setInterval(countdown, 1000);
  });

  // Resets game when clicking on game-title
  // BUG: Semi-working. Need to reset match icons
  $('.start').on('click', function() {
    countdownNum = 0;
    lives = 4;
    for (var i = 0; i < 8; i++) {
      $("#match-icon-"+i).css('background-color', 'white');
    }
    $('#lives').text(lives);
    setInterval(countdown, 1000);
  });

  // Countdown until begin is called
  var countdown = function() {
    if (countdownNum > 0) {
      $('.game-title').text(countdownNum);
      countdownNum -= 1;
    }
    else if (countdownNum === 0) {
      begin();
      countdownNum -=1;
    }
  }

  // Reveal board then start game
  // BUG: countdown continues to loop as clearInterval is not working
  var begin = function() {
    if (countdownNum === 0) {
      clearInterval(countdown);
      $('.game-title').text("MEMORIZE!");
      showBoard();
      setTimeout(startGame, 3000);
      // console.log('running countdown else');
    }
    else {
      countdown();
    }
  }

  // Show all tile colors briefly at the start of the game
  var showBoard = function () {
    $('.start').toggleClass('start');
    $('.game-title').text('MEMORIZE!');
    $('.hide').toggleClass('hide');
  }

  // Start game
  var startGame = function () {
    clearInterval(countdown);
    $('.game-title').text('TAKE YOUR PICK!');
    $('#tile-wrapper div').toggleClass('hide')
    $('.hide').on('click', function() {
    if ((lives !== 0) && (matched !== 8)) {
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
          $('.game-title').text('IT\'S A MATCH!');
          clicks = 0;
          matched += 1;
          matchElementColor = matchElement2.css('background-color');
          $("#match-icon-"+matched).css('background-color', matchElementColor);
          setTimeout(correctMatch, 1000);
          console.log(matched);
        }
        else {
          $('.game-title').text('NOPE!');
          setTimeout(wrongMatch, 1000);
        }
      }
    }
  });
  }

  // Will run when a correct match is made
  var correctMatch = function () {
    if (matched < 8) {
      $('.game-title').text('PICK ANOTHER!');
    }
    else {
      $('.game-title').text('CONGRATULATIONS!');
    }
  }

  // Will run when an incorrect match is made
  var wrongMatch = function () {
    $(matchElement1).toggleClass('hide');
    $(matchElement2).toggleClass('hide');
    lives -= 1;
    $('#lives').text(lives);
    clicks = 0;
    console.log(lives);
    $('.game-title').text('PICK ANOTHER!');
    if (lives === 0) {
      $('.game-title').text('TRY AGAIN?');
      $('.game-title').toggleClass('start');
    }
  }
});




/************************
OLD/UNUSED CODE
************************/

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
