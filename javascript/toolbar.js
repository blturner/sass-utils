var gridToolbar = window.gridToolbar || {};

(function() {
  var that = this;
  
  // Have this set in the gridToolbar namespace.
  // var defaults = this.gridDefaults;
  
  this.init = function() {
    var gridForm = ich.gridForm();
    
    $("body").append(gridForm);
    $("#grid_toolbar form").bind("submit", this.addSelector);
    
    // setup any pre-defined grids
    if (window.grids) {
      $.each(window.grids, function(selector, options) {
        $(selector).grid(options);
        
        var options = {
          "columns": window.grids[selector]["columns"],
          "gridColGutter": window.grids[selector]["gridColGutter"]
        }
        that.updateSelectorList(selector, options);
      });
    }
  };
  
  this.addSelector = function() {
    var data = $(this).serializeArray();
    
    $.each(data, function(i, field) {
      var selector = field.value;
      
      $(selector).grid(window.gridDefaults);
      that.updateSelectorList(selector, window.gridDefaults);
    });
    
    return false;
  };
  
  this.updateSelector = function() {
    var data = $(this).serializeArray(),
        options = {};
    
    $.each(data, function(i, val) {
      options[data[i].name] = val.value;
    });
    
    var selector = $(options["selector"]);
    
    selector.find(".overlay").remove();
    selector.grid(options);
    
    return false;
  };
  
  this.removeSelector = function(event) {
    var elem = event.target,
        item = $(elem).parent(),
        selector = $(item).find("code").text();
        
    $(item).remove();
    $(selector).find("> .overlay").remove();
  };
  
  this.updateSelectorList = function(selector, options) {
    var panel = {
      selector: selector
    };
    
    $.each(options, function(key, val) {
      panel[key] = val;
    });
    
    var list = $("#selector_list"),
        form = ich.updateForm(panel);
        
    list.append(form);
    
    form.find("form").bind("submit", this.updateSelector);
    form.find("a").bind("click", this.removeSelector);
    form.find(":checkbox").bind("click", this.toggleGrid);
  };
  
  this.toggleGrid = function(event) {
    var elem = event.target,
        selector = $(elem).parent().find("code").text()
        overlay = $(selector).find("> .overlay"),
        overlayCopy = $(overlay).clone(),
        overlayParent = $(overlay).parent();
        
    return false;
  };
}).apply(gridToolbar);

$(document).ready(function() {
  gridToolbar.init();
});
