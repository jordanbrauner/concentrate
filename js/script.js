$(document).ready(function() {

  // Declare variables
  var countdownNum = 3;
  var clicks = 0;
  var matched = 0;
  var match1, match2;
  var matchElement1, matchElement2, matchElementColor;
  var wrong;
  var lives = 5;
  var intCountdownRun;

  // Instantiate arrays
  var quotes = ["Democracy is a beautiful thing, except for that part about letting just any old yokel vote.\"", "If trees could scream, would we be so cavalier about cutting them down? We might, if they screamed all the time, for no good reason.\"", "When you go in for a job interview, I think a good thing to ask is if they ever press charges\"", "If you ever accidentally drop your keys into a river of molten lava, let 'em go, because man, they're gone.\"", "Children need encouragement. If a kid gets an answer right, tell him it was a lucky guess. That way he develops a good, lucky feeling.\""];
  var deck = ["color1", "color1", "color2", "color2", "color3", "color3", "color4", "color4", "color5", "color5", "color6", "color6", "color7", "color7", "color8", "color8"];
  var shuffled = [];

  // All methods for randomizing tiles on board
  var tileFunctions = {
    randomizeDeck: function(deck, shuffled) {
      var i = 0;
      var stop = deck.length;
      while (i < stop) {
        var aL = deck.length;
        var r = Math.floor(Math.random() * stop);
        if (deck[r] != "used") {
          shuffled.push(deck[r]);
          deck.splice(r, 1, "used");
          i++;
        }
      }
      console.log("deck: " + deck);
      console.log("shuffled: " + shuffled);
    },

    resetDecks: function(shuffled, deck) {
      tileFunctions.randomizeDeck(shuffled, deck);
    },

    fillBoard: function(shuffled) {
      var i = 0;
      var stop = shuffled.length;
      $("#tile-wrapper").children().each(function(index, element) {
          $(element).addClass(shuffled[i]);
          console.log(element);
          if (i === stop) {
            i = 0;
          }
          i++;
        });
    }
  };

  // Chooses a random quote
  var randomQuote = function(array) {
    var i = Math.floor(Math.random() * array.length);
    $(".quote").text(array[i]);
  };

  // Set game board UI
  $("#quote-wrapper").css('opacity', '0');
  $("#lives").css('opacity', '0');
  $("#lives-left").css('opacity', '0');
  $(".logo").css('opacity', '0');
  $('#small-logo-1').hide();
  $('#small-logo-2').hide();
  $('.game-title').text("READY?");
  // Begin game when user clicks on splash-image
  $('#splash-image').on('click', function() {
    // Clear splash image and show game logo above board
    $('#splash-image').css("opacity", "0");
    $('#small-logo-1').show();
    $('#small-logo-2').show();
    // Run countdown function to show tiles at game start
    setTimeout(resetGame, 1000);
  });

  // Resets game when clicking on game-title
  $('.start').on('click', function() {
    resetGame();
  });

  var resetGame = function() {
    console.log("resetGame function called");
    // set variables
    matched = 0;
    lives = 5;
    countdownNum = 3;
    clicks = 0;
    match1 = undefined;
    match2 = undefined;
    matchElement1 = null;
    matchElement2 = null;
    matchElementColor = null;
    wrong = null;
    quotes = ["Democracy is a beautiful thing, except for that part about letting just any old yokel vote.\"", "If trees could scream, would we be so cavalier about cutting them down? We might, if they screamed all the time, for no good reason.\"", "When you go in for a job interview, I think a good thing to ask is if they ever press charges\"", "If you ever accidentally drop your keys into a river of molten lava, let 'em go, because man, they're gone.\"", "Children need encouragement. If a kid gets an answer right, tell him it was a lucky guess. That way he develops a good, lucky feeling.\""];
    deck = ["color1", "color1", "color2", "color2", "color3", "color3", "color4", "color4", "color5", "color5", "color6", "color6", "color7", "color7", "color8", "color8"];
    shuffled = [];
    $('.hide').off('click');
    $("#tile-wrapper").children().each(function(index, element) {
        $(element).removeAttr('class');
        $(element).addClass('hide');
    });
    for (var i = 8; i > 0; i--) {
      $("#match-icon-"+i).css('background-color', 'white');
    }
    $('#lives').text(lives);
    // Render random quote
    console.log("calling randomQuote");
    randomQuote(quotes);
    // Randomize deck
    console.log("calling randomizeDeck");
    tileFunctions.randomizeDeck(deck, shuffled);
    // Fill board
    console.log("calling fillBoard. Here is shuffled: " + shuffled);
    tileFunctions.fillBoard(shuffled);
    // Initiate countdown
    countdownClear();
  };

  // Countdown until show board and startgame are called
  var countdownClear = function() {
    console.log("countdownClear called");

    // set up board
    $('#splash-image').hide();
    $('#lives').text(lives);

    // fade in UI
    $("#quote-wrapper").css('opacity', '1');
    $("#lives").css('opacity', '1');
    $("#lives-left").css('opacity', '1');
    $("#lives-left").css('opacity', '1');
    $(".logo").css('opacity', '1');

    // run countdown to game start
    intCountdownRun = setInterval(countdownRun, 1000);
  };

  var countdownRun = function() {
    console.log("countdownRun called");
    if (countdownNum > 0) {
      $('.game-title').text(countdownNum);
      countdownNum -= 1;
    } else {
      clearInterval(intCountdownRun);
      begin();
    }
  };

  // reveals board then starts game
  var begin = function() {
    console.log("Match1: " + match1);
    console.log("Match2: " + match2);
    console.log("clicks: " + clicks);
    $('.game-title').text("CONCENTRATE!");
    showBoard();
    setTimeout(startGame, 3000);
  };

  // shows all the colors briefly at the start of the game
  var showBoard = function () {
    $('.start').toggleClass('start');
    $('.game-title').text('CONCENTRATE!');
    $('.hide').toggleClass('hide');
  };

  // starts the game
  var startGame = function() {
    $('.game-title').text('FIND A MATCH!');
    $('#tile-wrapper div').toggleClass('hide');
    $('.hide').on('click', clickTile);
  };

  // Handles tile clicks
  var clickTile = function() {
    if ((lives > 0) && (matched < 8) && (-1 < clicks < 2)) {
      if (clicks === 0) {
        clicks += 1;
        $(this).toggleClass('hide');
        matchElement1 = $(this);
        match1 = $(this).attr('class');
      }
      else if (clicks === 1) {
        clicks += 1;
        $(this).toggleClass('hide');
        matchElement2 = $(this);
        match2 = $(this).attr('class');
        if (match1 === match2) {
          $('.game-title').text('IT\'S A MATCH!');
          clicks = 0;
          matched += 1;
          matchElementColor = matchElement1.css('background-color');
          $("#match-icon-"+matched).css('background-color', matchElementColor);
          setTimeout(correctMatch, 1000);
          console.log(matched);
        }
        else {
          $('.game-title').text('NOPE!');
          setTimeout(wrongMatch, 1000);
        }
      }
      else {
        console.log("Not allowing click");
      }
    }
  };

  // runs when a correct match is made
  var correctMatch = function () {
    if (matched < 8) {
      $('.game-title').text('PICK ANOTHER!');
    }
    else {
      $('.game-title').text('CONGRATULATIONS!');
    }
  };

  // runs when an incorrect match is made
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
  };

});
