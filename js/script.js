$(document).ready(function() {

  // Testing
  // $('#board-wrapper').attr("class", "you-won");

  // Declare variables
  var countdownNum = 3;
  var clicks = 0;
  var matched = 0;
  var match1, match2;
  var matchElement1, matchElement2, matchElementColor;
  var wrong;
  var lives;
  var intCountdownRun;
  var chosenDifficulty;

  // Instantiate arrays
  var quotes = [
                 "Often, when I am reading a good book, I stop and thank my teacher. That is, I used to, until she got an unlisted number.\"",
                 "Democracy is a beautiful thing, except for that part about letting just any old yokel vote.\"",
                 "If trees could scream, would we be so cavalier about cutting them down? We might, if they screamed all the time, for no good reason.\"",
                 "If God dwells inside us like some people say, I sure hope He likes enchiladas, because that's what He's getting.\"",
                 "I don't think I'm alone when I say I'd like to see more and more planets fall under the ruthless domination of our solar system.\"",
                 "When you go in for a job interview, I think a good thing to ask is if they ever press charges.\"",
                 "If you ever accidentally drop your keys into a river of molten lava, let 'em go, because man, they're gone.\"",
                 "Children need encouragement. If a kid gets an answer right, tell him it was a lucky guess. That way he develops a good, lucky feeling.\"",
                 "When I die, I want to die peacefully, in my sleep, like my grandpa did. Not like the screaming passengers in his car.\"",
                 "Whether they find a life there or not, I think Jupiter should be called an enemy planet.\"",
                 "If any man says he hates war more than I do, he better have a knife, that's all I have to say\"",
                 "When I go to heaven, I want to see my grandpa again. But he better have lost the nose hair and the old-man smell.\""
  ];

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
  var randomQuote = function(quoteArray) {
    console.log(quoteArray.length);
    var i = Math.floor(Math.random() * quoteArray.length);
    console.log("Random Quote index is: " + i);
    $(".quote").text(quoteArray[i]);
  };

  // Set game board UI
  $('.notification').css('opacity', '1');
  $("#quote-wrapper").css('opacity', '0');
  $("#lives").css('opacity', '0');
  $("#lives-left").css('opacity', '0');
  $(".logo").css('opacity', '0');
  $('#small-logo-1').hide();
  $('#small-logo-2').hide();
  $('.notification').html("<div id='difficulty'><button id='easy'>EASY</button><button id='medium'>MEDIUM</button><button id='hard'>HARD</button></div>");

  // Begin game when user clicks on splash-image
  $('#splash-image').on('click', function() {
    // Clear splash image and show game logo above board
    $('#splash-image').css("opacity", "0");
    $('#small-logo-1').show();
    $('#small-logo-2').show();
    // Run countdown function to show tiles at game start
    setTimeout(chooseDifficulty, 750);
  });

  // Resets game when clicking on restart button
  $('.start').on('click', function() {
    setTimeout(chooseDifficulty, 700);
  });

  var chooseDifficulty = function() {
    $('.notification').html("<div id='difficulty'><button id='easy'>EASY</button><button id='medium'>MEDIUM</button><button id='hard'>HARD</button></div>");
    $('#splash-image').hide();
    $('#easy').on('click', function() {
      chosenDifficulty = 'easy';
      $('.notification').addClass('fade-out');
      setTimeout(resetGame, 750);
    });
    $('#medium').on('click', function() {
      chosenDifficulty = 'medium';
      $('.notification').addClass('fade-out');
      setTimeout(resetGame, 750);
    });
    $('#hard').on('click', function() {
      chosenDifficulty = 'hard';
      $('.notification').addClass('fade-out');
      setTimeout(resetGame, 750);
    });
  };

  var resetGame = function() {
    // set board
    $('#board-wrapper').removeClass("you-won");
    $('#difficulty button').off('click');
    $('.notification').removeClass('fade-out');
    $('.notification').html("");
    setTimeout(function() {
      $('.notification').addClass('fade-in');
      $('.notification').html("MATCH THE COLORS!");
    }, 250);

    // set variables
    if (chosenDifficulty == 'easy') {
      lives = 7;
    } else if (chosenDifficulty == 'medium') {
      lives = 5;
    } else if (chosenDifficulty == 'hard') {
      lives = 3;
    }
    matched = 0;
    countdownNum = 3;
    clicks = 0;
    match1 = undefined;
    match2 = undefined;
    matchElement1 = null;
    matchElement2 = null;
    matchElementColor = null;
    wrong = null;
    deck = ["color1", "color1", "color2", "color2", "color3", "color3", "color4", "color4", "color5", "color5", "color6", "color6", "color7", "color7", "color8", "color8"];
    shuffled = [];
    $('.hide').off('click');
    $("#tile-wrapper").children().each(function(index, element) {
        $(element).removeAttr('class');
        $(element).addClass('hide');
    });
    // Reset animation for matched icons -- START
    for (var i = 8; i > 0; i--) {
      $("#match-icon-"+i).addClass('icon-matched-reset');
    }
    setTimeout(function() {
      for (var i = 8; i > 0; i--) {
        $("#match-icon-"+i).css('background-color', 'white');
      }
    }, 700);
    setTimeout(function() {
      for (var i = 8; i > 0; i--) {
        $("#match-icon-"+matched).removeClass('icon-matched');
        $("#match-icon-"+i).removeClass('icon-matched-reset');
      }
    }, 1000);
    // Reset animation for matched icons -- END
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
    setTimeout(countdownClear, 750);
  };

  // Countdown until show board and startgame are called
  var countdownClear = function() {
    $('.notification').removeClass('fade-in');
    console.log("countdownClear called");

    // set up board
    $('#lives').text(lives);

    // fade in UI
    $("#quote-wrapper").css('opacity', '1');
    $("#lives").css('opacity', '1');
    $("#lives-left").css('opacity', '1');
    $("#lives-left").css('opacity', '1');
    $(".logo").css('opacity', '1');
    $('.notification').css("opacity", "1");

    // run countdown to game start
    $('.notification').removeClass("countdown-animation");
    intCountdownRun = setInterval(countdownRun, 1000);
  };

  var countdownRun = function() {
    console.log("countdownRun called");
    if (countdownNum > 0) {
      $('.notification').text(countdownNum);
      countdownNum -= 1;
      $('.notification').addClass("countdown-animation");
      setTimeout(function() {
        $('.notification').text(countdownNum);
        $('.notification').removeClass("countdown-animation");
        $('.notification').text("");
      }, 950);
    } else {
      clearInterval(intCountdownRun);
      $('.notification').removeClass("countdown-animation");
      begin();
    }
  };

  // reveals board then starts game
  var begin = function() {
    console.log("Match1: " + match1);
    console.log("Match2: " + match2);
    console.log("clicks: " + clicks);
    $('.notification').text("CONCENTRATE!");
    showBoard();
    setTimeout(startGame, 3000);
  };

  // shows all the colors briefly at the start of the game
  var showBoard = function () {
    $('.notification').text('CONCENTRATE!');
    $('.hide').toggleClass('hide');
  };

  // starts the game
  var startGame = function() {
    $('.notification').text('FIND A MATCH!');
    $('#tile-wrapper div').toggleClass('hide');
    $('.hide').on('click', clickTile);
  };

  // Handles tile clicks
  var clickTile = function() {
    if ((lives > 0) && (matched < 8)) {

      // If you clicked the first tile this turn
      if (clicks === 0) {
        clicks = 1;
        $(this).removeClass('hide');
        matchElement1 = $(this);
        match1 = $(this).attr('class');
        console.log("match1: " + match1);
      }

      // If you clicked the second tile this turn
      else if (clicks === 1) {
        clicks = 2;
        $('.hide').off('click');
        $(this).removeClass('hide');
        matchElement2 = $(this);
        match2 = $(this).attr('class');
        console.log("match2: " + match2);

        // If it's a match or not
        if (match1 === match2) {
          correctMatch();
        } else if (match1 !== match2) {
          wrongMatch();
        }
      }

      // If you are clicking tiles after your second click that turn
      else if (clicks > 1) {
        $('.hide').off('click');
        console.log("Not allowing click");
      }
    }
  };

  // runs when a correct match is made
  var correctMatch = function () {
    matched += 1;
    if (matched < 8) {
      clicks = 0;
      $('.notification').text('IT\'S A MATCH!');
      matchElementColor = matchElement1.css('background-color');
      $("#match-icon-"+matched).css('background-color', matchElementColor);
      $("#match-icon-"+matched).addClass('icon-matched');

      // Keep fast click bug from happening
      setTimeout(function() {
        $('.hide').on('click', clickTile);
        $('.notification').text('FIND ANOTHER!');
      }, 700);
    }
    else {
      $('.notification').text('YOU WON!');
      $('#board-wrapper').addClass("you-won");
    }
  };

  // runs when an incorrect match is made
  var wrongMatch = function () {
    wrongMatchElement1 = matchElement1;
    wrongMatchElement2 = matchElement2;
    clicks = 0;
    lives -= 1;
    $('#lives').text(lives);
    console.log("Lives left: " + lives);
    setTimeout(function() {
      $(wrongMatchElement1).addClass('hide');
      $(wrongMatchElement2).addClass('hide');
    }, 700);

    // Matched wrong but still have lives yet
    if (lives > 0) {
      $('.notification').text('NOT A MATCH!');
      setTimeout(function() {
        $('.notification').text('FIND ANOTHER!');
        $('.hide').on('click', clickTile);
      }, 700);
    }

    // Matched wrong and no lives left
    else if (lives <= 0) {
      // Create Restart Button
      $('.notification').html("<button id='restart-game'>RESTART</button>");
      $('.notification').addClass('start');
      $('.notification').on("click", function() {
        $('.notification').addClass('fade-out');
        $('.notification').removeClass('start');
        $(this).off('click');
        setTimeout(resetGame, 700);
      });
    }
  };

});
