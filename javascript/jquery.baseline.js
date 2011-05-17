(function($) {
  $.fn.baseline = function(options) {
    var defaults = {
      baselineHeight: "12px"
    };
    var options = $.extend(defaults, options);
    
    return this.each(function() {
      var elem = $(this);
      
      if (options.background) {
        elem.css("background-image", "url(" + options.background + ")");
      } else {
        if (options.baselineHeight) {
          elem
            .css("background-image", "-webkit-gradient(linear, 50% 100%, 50% 0%, color-stop(5%, rgba(0, 0, 0, 0.15)), color-stop(5%, rgba(0, 0, 0, 0)))")
            .css("background-image", "-moz-linear-gradient(bottom, rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0) 5%)")
            .css("background-size", "100% " + options.baselineHeight + ", auto");
        }
      }
    });
  }
})(jQuery);
