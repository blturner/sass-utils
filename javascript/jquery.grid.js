(function($) {
  $.fn.grid = function(options) {
    var defaults = {
      background: null,
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
      
      
      $(obj).find(".unit")
        .css("width", columnWidth(1, options.columns))
        .css("border-left", "solid " + options.grid_col_gutter + " rgba(255,255,255,0.15)")
        .css("border-right", "solid " + options.grid_col_gutter + " rgba(255,255,255,0.15)");
      
      
      // Recalculate grid overlay widths as the window resizes.
      $(window).resize(function() {
        calculateSize($(obj));
      });
    });
  };
})(jQuery);
