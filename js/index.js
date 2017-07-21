jQuery(document).ready(function($) {

  var popup = (function() {
    var wrap = $('#pop-up');
  })(); /* End Pop Up */

  var feed = (function() {

    var props = {
      scrollSpeed: 1,
      stopScrolling: false,
    }
    var setInt;

    var autoScroll = function(column) {
      if (!props.stopScrolling && windowControl.columns() != 1) {
        var prevScroll = column.scrollTop();
        column.scrollTop(props.scrollSpeed + prevScroll);
      }
    }

    var watchScroll = function(column) {
      var setInt = setInterval(function() {
        autoScroll(column);
      }, 10);
    }

    /* Image Tags */
    var tags = [
      '/assets/img/meditate_face_01.png',
      '/assets/img/meditate_face_02.png',
      '/assets/img/meditate_face_03.png',
      '/assets/img/meditate_face_04.png',
      '/assets/img/meditate_face_05.png',
      '/assets/img/meditate_face_06.png',
      '/assets/img/meditate_face_07.png',
      '/assets/img/meditate_face_08.png',
      '/assets/img/meditate_face_09.png',
      '/assets/img/meditate_face_010.png',
      '/assets/img/meditate_face_01.png',
      '/assets/img/meditate_face_02.png',
      '/assets/img/meditate_face_03.png',
      '/assets/img/meditate_face_04.png',
      '/assets/img/meditate_face_05.png',
      '/assets/img/meditate_face_06.png',
      '/assets/img/meditate_face_07.png',
      '/assets/img/meditate_face_08.png',
      '/assets/img/meditate_face_09.png',
      '/assets/img/meditate_face_010.png',
    ]

    /* The Feed */
    var feedImages = [];

    var containers;

    var createImage = function(path) {
      return $('<img class="feed-image" src="' + path + '">');
    }

    var createImages = function(tags) {
      for (i = 0; i < tags.length; i++) {
        feedImages.push(createImage(tags[i])[0]);
      }
    }

    var createColumn = function(number) {
      return $('<div class="column column-' + number + '"></div>');
    }

    var createColumns = function(count) {
      var columns = [];
      for (i = 0; i < count; i++) {
        columns.push(createColumn(i)[0]);
      }
      return columns;
    }

    var seedColumns = function(count) {
      var columns = createColumns(count);
      var currentColumns = $('.columns');
      var columnMerge = $.merge(currentColumns, columns);
      var cols = $.makeArray(columns);

      /* Update DOM */
      columnMerge.each(function() {
        $('#container').append($(this));
      });

    }

    var perColumn = function() {
      return Math.floor(tags.length / windowControl.columns());
    }

    var addImage = function(image, column) {
      $('.column-' + column).append(image);
    }

    var seedImages = function(images, chunkSize) {
      var i,j,temp,chunk = chunkSize;
      var counter = 0;
      for (i=0, j=images.length; i<j; i+=chunk) {
        var temp = images.slice(i,i + chunk);
        $.each(temp, function() {
          addImage($(this), counter)
        });
        counter = counter + 1;
      }
    }

    /* Not the best way, some sort of shadow dom play could be better, but maybe overkill */
    var resetImages = function() {
      $('#container').html('');
    }

    var updateColumns = function() {
      resetImages();
      seedColumns(windowControl.columns())
      seedImages(feedImages, perColumn())

      $('.column').each(function() {
        watchScroll($(this));
        watchFeed($(this));
      })
    }

    var watchFeed = function(column) {
      column.on('scroll', function() {
        if (column.scrollTop() > $('#container').height() - 200) {
          var images = column.find('img');
          column.append(images.first());
        }
      })
    }

    var init = function() {
      createImages(tags);
    }

    return {
      init,
      updateColumns
    }
  })(); /* End Feed */

  var windowControl = (function() {
    var breakpoints = {
      a: 1360,
      b: 900,
      c: 600
    }
    var currentBreakPoint;

    var width = function() {
      return $(window).innerWidth();
    }

    var columns = function() {
      var w = width();
      if (w > breakpoints.a ) {
        columns = 4;
      } else if (w > breakpoints.b) {
        columns = 3;
      } else if (w > breakpoints.c) {
        columns = 2;
      } else {
        columns = 1;
      };
      return columns;
    }

    var updateBreakPoint = function() {
      var w = width();
      var newPoint;
      if (w > breakpoints.a ) {
        newPoint = 'a';
      } else if (w > breakpoints.b) {
        newPoint = 'b';
      } else if (w > breakpoints.c) {
        newPoint = 'c';
      } else {
        newPoint = '';
      };
      if (currentBreakPoint === newPoint) {
        return;
      }
      currentBreakPoint = newPoint;
      feed.updateColumns();
    }

    var setListeners = function() {
      $(window).on('resize', updateBreakPoint)
    }

    var init = function() {
      setListeners();
      updateBreakPoint();
    }

    return {
      columns,
      currentBreakPoint,
      init
    }

  })(); /* End window Control */

  var animation = (function() {
    var fadeInSection = function(section) {
      $(section).css('opacity', 1);
    }

    var fadeInPopUp = function(popUp) {
      setTimeout(function() {
        $(popUp).css('opacity', 1);
      }, 1000);
    }

    return {
      fadeInSection,
      fadeInPopUp
    }
  })(); /* End Animation */

  var init = (function() {
    console.log("We have lifted off");

    /* Call the crew */
    feed.init();
    windowControl.init();
    animation.fadeInSection($('#container'));
    animation.fadeInPopUp($('#pop-up'));
  });

  /* Let's DO IT */
  init();
});
