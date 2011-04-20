(function($) {
  $.fn.fluidOverlay = function(options) {
    var defaults = {
      columns: 12
    }
    var options = $.extend(defaults, options);
    
    return this.each(function() {
      var obj = $(this),
          overlay = $('<div class="overlay"></div>');
      
      for (i=0; i<options.columns; i++) {
        $('<span class="span-1"><div class="gutter"></div></span>')
          .prependTo(overlay);
      }
      
      obj.each(function() {
        var row = $(this),
            rowHeight = row.height();
        overlay.css("height", rowHeight);
        overlay.clone().appendTo(row);
      });
    });
  }
})(jQuery);
