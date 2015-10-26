$(document).ready(function () {

  var chances;
  // var matched = [];

  // created tiles
  var createTiles = function () {
    for (var i = 0; i < 16; i ++) {
      $('#tile-wrapper').append("<div class='tile' id=\""+i+"tile\"></div>");
    }
    $('.tile').append("<p id='tileBack'>C</p>")
  }
  //
  // $('.tile').on('click', function () {
  //   $(this).
  // });

  createTiles();



});
