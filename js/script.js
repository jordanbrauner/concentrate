$(document).ready(function() {

  /////////////////////////////////////////////////////////////////////////////
  // Declare variables
  /////////////////////////////////////////////////////////////////////////////

  var countdownNum = 3;
  clicks = 0;
  matched = 0;
  var match1, match2;
  var matchElement1, matchElement2, matchElementColor;
  var wrong;
  var lives;
  var intCountdownRun;
  var chosenDifficulty;
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


  /////////////////////////////////////////////////////////////////////////////
  // Setup Board
  /////////////////////////////////////////////////////////////////////////////

  // Shuffle Tiles and Fill Board
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

  // Render random quote
  var randomQuote = function(quoteArray) {
    console.log(quoteArray.length);
    var i = Math.floor(Math.random() * quoteArray.length);
    console.log("Random Quote index is: " + i);
    $(".quote").text(quoteArray[i]);
  };

  // Render UI state at page load
  var UIRefresh = function() {
    $("#board-wrapper").addClass('swipe-fade-in');
    $("#board-wrapper").removeClass('invisible');
    $('.notification').css('opacity', '1');
    $("#quote-wrapper").css('opacity', '0');
    $("#lives").css('opacity', '0');
    $("#lives-left").css('opacity', '0');
    $(".logo").css('opacity', '0');
    $('#small-logo-1').hide();
    $('#small-logo-2').hide();
    $('.notification').html("<div id='difficulty'><button id='easy'>EASY</button><button id='medium'>MEDIUM</button><button id='hard'>HARD</button></div>");
  };
  UIRefresh();

  // Start game when user clicks on splash-image
  $('#splash-image').on('click', function() {
    $(this).off('click');
    $('#splash-image').css("opacity", "0");
    $('#small-logo-1').show();
    $('#small-logo-2').show();
    setTimeout(setDifficulty, 750);
  });

  /////////////////////////////////////////////////////////////////////////////
  // Set Game Difficulty
  /////////////////////////////////////////////////////////////////////////////

  var setDifficulty = function() {
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


  /////////////////////////////////////////////////////////////////////////////
  // Reset variables/UI and begin game
  /////////////////////////////////////////////////////////////////////////////

  var resetGame = function() {
    // set board
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


  /////////////////////////////////////////////////////////////////////////////
  // Playing Game
  /////////////////////////////////////////////////////////////////////////////

  // Handles tile clicks
  var clickTile = function(e) {

    if ($(e.target).hasClass('hide') && (lives > 0) && (matched < 8) && (0 <= clicks <= 1)) {

      // If you clicked the first tile this turn
      if (clicks === 0) {
        clicks = 1;
        console.log("you just clicked. Click count is: " + clicks);
        $(e.target).removeClass('hide');
        // $(this).off('click');
        matchElement1 = $(e.target);
        match1 = $(e.target).attr('class');
        console.log("match1: " + match1);
      }

      // If you clicked the second tile this turn
      else if (clicks === 1) {
        clicks = 2;
        console.log("you just clicked. Click count is: " + clicks);
        $(e.target).removeClass('hide');
        matchElement2 = $(e.target);
        match2 = $(e.target).attr('class');
        console.log("match2: " + match2);

        // If it's a match or not
        if (match1 === match2) {
          correctMatch();
        } else if (match1 !== match2) {
          wrongMatch();
        }
        else {
          console.log("Error: Not a correct or wrong match!");
        }
      }

      // If you are clicking tiles after your second click that turn
      else {
        console.log("Not allowing click");
      }
    }
    else {
      console.log("Not allowing click");
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
      match1 = undefined;
      match2 = undefined;
      // Keep fast click bug from happening
      setTimeout(function() {
        $('.notification').text('FIND ANOTHER!');
      }, 700);
    }
    else if (matched === 8) {
      console.log("You have 8 matches!");
      matchElementColor = matchElement1.css('background-color');
      $("#match-icon-"+matched).css('background-color', matchElementColor);
      $("#match-icon-"+matched).addClass('icon-matched');
      $('.hide').off('click');
      $('.notification').text('YOU WON!');
      $('#board-wrapper').removeClass("swipe-fade-in");
      $('#board-wrapper').removeClass("you-won");
      $('#board-wrapper').addClass("you-won");
      setTimeout(renderRestartButton, 2000);
    }
    else {
      console.log("correctMatch function error");
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
      }, 700);
    }

    // Matched wrong and no lives left
    else if (lives <= 0) {
      $('.hide').off('click');
      $('.notification').html("GAME OVER!");
      setTimeout(function(){
        $('.notification').addClass('fade-out');
      }, 2000);
      setTimeout(renderRestartButton, 1700);
    }
  };

  var renderRestartButton = function() {
    $('.hide').off('click');
    $('.notification').html("");
    $('.notification').removeClass('fade-out');
    $('.notification').html("<button id='restart-game'>RESTART</button>");
    $('.notification').addClass('fade-in');

    // On click of restart game button
    $('#restart-game').on("click", function() {
      // Reset animation for matched icons before board swipe -- START
      for (var i = 8; i > 0; i--) {
        $("#match-icon-"+i).addClass('icon-matched-reset');
      }
      setTimeout(function() {
        for (var i = 8; i > 0; i--) {
          $("#match-icon-"+i).css('background-color', 'white');
          $("#match-icon-"+i).removeClass('icon-matched');
          $("#match-icon-"+i).removeClass('icon-matched-reset');
        }
      }, 1000);
      // Reset animation for matched icons before board swipe -- END
      // Board swipe animation -- START
      setTimeout(function() {
        $("#board-wrapper").addClass('swipe-fade-out');
        $("#board-wrapper").addClass('invisible');
      }, 700);
      setTimeout(function() {
        $("#board-wrapper").removeClass('swipe-fade-out');
        $("#board-wrapper").addClass('swipe-fade-in');
        $("#board-wrapper").removeClass('invisible');
      }, 1500);
      // Board swipe animation -- END
      $('.notification').removeClass('fade-in');
      $(this).css('opacity', '0');
      $(this).off('click');
      setTimeout(resetGame, 1400);
    });
  };

});
