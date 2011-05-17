var gridToolbar = window.gridToolbar || {};

(function() {
  var that = this;
  
  // Have this set in the gridToolbar namespace.
  // var defaults = this.gridDefaults;
  
  this.init = function() {
    var toolbar = document.createElement("div"),
        form    = document.createElement("form"),
        fields  = $('<ol><li><label>Selector</label><input name="selector" type="text"></li><li><input type="submit" value="Apply"></li></ol>');
    
    toolbar.id = "grid_toolbar";
    form.action = "test.html";
    
    $("body").append(toolbar);
    $(toolbar).wrapInner(form);
    $(form).wrapInner(fields);
    
    $(form).after('<ol id="selector_list"></ol>');
    
    $(form).bind("submit", this.addSelector);
  };
  
  this.addSelector = function() {
    var data = $(this).serializeArray();
    
    $.each(data, function(i, field) {
      var selector = field.value;
      
      $(selector).fluidOverlay(window.gridDefaults);
      that.updateSelectorList(selector);
    });
    
    return false;
  };
  
  this.removeSelector = function(event) {
    var elem = event.target,
        item = $(elem).parent(),
        selector = $(item).find("code").text();
        
    $(item).remove();
    $(selector).find(".overlay").remove();
  };
  
  this.updateSelectorList = function(selector) {
    var list = $("#selector_list"),
        item = $("<li><input type=\"checkbox\" checked=\"checked\"><code>" + selector + "</code><a href=\"#\">Remove</a></li>");
    
    $(item).find("a").bind("click", this.removeSelector);
    $(item).find(":checkbox").bind("click", this.toggleGrid);
    
    // $(list).wrapInner(item);
    list.append(item);
  };
  
  this.toggleGrid = function(event) {
    var elem = event.target,
        selector = $(elem).parent().find("code").text();
    
    return false;
  };
}).apply(gridToolbar);

$(document).ready(function() {
  gridToolbar.init();
});
