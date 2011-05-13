// What this script should do:
// 1) Apply a column grid over the layout.
// 2) Dynamically resize the grid.
// 3) Provide a way of turning the grid on and off because it must lay on top of
//    a design.

(function($) {
  $.fn.fluidOverlay = function(options) {
    var defaults = {
      background: null,
      baseline_height: null,
      columns: 12,
      grid_col_gutter: "0px"
    };
    
    var options = $.extend(defaults, options);
    
    
    function calculateSize(elem) {
      var container = $(elem).find(".overlay").parent(),
          width = $(container).width(),
          height = $(container).height();
          
      // Adjust the size of the container element of the grid.
      $(elem).find(".overlay")
        .css("width", width + "px")
        .css("height", height + "px");
    }
    
    
    function columnWidth(n, context) {
      var width = n * (100 / context);
      return width + "%";
    }
    
    
    // Add the baseline background image to the body element.
    if (options.background) {
      $("body").css("background-image", "url(" + options.background + ")");
    } else {
      if (options.baseline_height) {
        $("body")
          .css("background-image", "-webkit-gradient(linear, 50% 100%, 50% 0%, color-stop(5%, rgba(0, 0, 0, 0.15)), color-stop(5%, rgba(0, 0, 0, 0)))")
          .css("background-image", "-moz-linear-gradient(bottom, rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0) 5%)")
          .css("background-size", "100% " + options.baseline_height + ", auto");
      }
    }
    
    return this.each(function() {
      // `obj` is the root +grid_container mixin element or a +row mixin element.
      var obj = $(this),
          overlay = $('<div class="overlay"></div>');
      
      
      // Build the grid.
      for (i=0; i<options.columns; i++) {
        $('<span class="unit"><div class="gutter"></div></span>')
          .prependTo(overlay);
      }
      
      
      obj.each(function() {
        var row = $(this),
            rowHeight = row.height();
            rowWidth = row.width();
        
        overlay.css("width", rowWidth)
          .css("height", rowHeight)
          .css("background-position", "0 10px")
          .clone().appendTo(row);
      });
      
      
      $(obj).find(".overlay").css("position", "absolute")
        .css("top", "0")
        .css("padding", "0")
        .css("z-index", "1000");
      
      
      $(obj).find(".unit")
        .css("float", "left")
        .css("height", "100%")
        .css("width", columnWidth(1, options.columns))
        .css("border-left", "solid " + options.grid_col_gutter + " rgba(255,255,255,0.15)")
        .css("border-right", "solid " + options.grid_col_gutter + " rgba(255,255,255,0.15)")
        .css("-webkit-box-sizing", "border-box")
        .css("-moz-box-sizing", "border-box")
        .css("box-sizing", "border-box");
        
      
      $(obj).find(".unit .gutter")
        .css("height", "100%")
        .css("background-color", "rgba(255,0,0,0.10)");
      
      
      // Recalculate grid overlay widths as the window resizes.
      $(window).resize(function() {
        calculateSize($(obj));
      });
    });
  };
})(jQuery);
