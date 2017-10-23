/*jslint browser: true*/ /*global  $*/
//Slider to Arctouch
//Script made by Liniquer Fractucello
var refreshId;

$(document).ready(function() {
  'use strict';

  //Options
  var phraseId = '.comments__carrousel--phrase';
  var authorId = '.comments__carrousel--author';
  var navItem = '.md-carrousel--nav ul li';
  var timer = 4000;

  //vars
  var count = 1;

  //Load Json for testimonials
  $.getJSON('assets/data/testimonials.json', function(data) {

    //total of items
    var total = data.testimonials.length;

    //function to change all informations of slide
    function changeSlide(pos) {
      $('.md-carrousel--slide').fadeOut( 400, function() {
        $(phraseId).html(data.testimonials[pos].msg);
        $(authorId).html(data.testimonials[pos].name);
        $(this).fadeIn(400);

        $('.md-carrousel--nav ul li').removeClass('active');
        $('.md-carrousel--nav ul li:eq('+pos+')').addClass('active');
      });
    }

    //Input the first json values
    $(phraseId).html(data.testimonials[0].msg);
    $(authorId).html(data.testimonials[0].name);

    //add the li to nav
    for(var i=0; i < total; i++) {
      if(i === 0) {
        $('.md-carrousel--nav ul').append('<li class="active" pos="'+ i +'"></li>');
      } else {
        $('.md-carrousel--nav ul').append('<li pos="'+ i +'"></li>');
      }
    }

    //timer function to change slides
    function checkPos() {
      if(count < total) {
        changeSlide(count);
        count++;
      }  else {
        changeSlide(0);
        count = 1;
      }
    }
    
    //job detail click
    $(navItem).click(function() {
      var navPos = $(this).attr('pos');

      if($(this).hasClass('active')) {
        return;
      } else {
        $(navItem).removeClass('active');
        $(this).addClass('active');
        changeSlide(navPos);

        //transform the value in int to uptade the count
        var a = parseInt(navPos);
        count = a + 1;
      }
    });

    //hover nav to stop the slider
    $('.comments .content').hover(function() {
        clearInterval(refreshId);
      }, function() {
        refreshId = setInterval(checkPos, timer);
      }
    );

    //call the first timeout to activate the timer
    refreshId = setInterval(checkPos, timer);

  })
  .done(function() {
  })
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ', ' + error;
    console.log( 'Request Failed: ' + err );
  });
  
  
});