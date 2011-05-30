var gridToolbar = window.gridToolbar || {};

(function() {
  var that = this,
      gridStorage = {};
  
  // Have this set in the gridToolbar namespace.
  // var defaults = this.gridDefaults;
  
  this.init = function() {
    var gridForm = ich.gridForm();
    
    $("body").append(gridForm);
    $("#grid_toolbar form").bind("submit", this.addOrUpdateSelector);
    
    // setup any pre-defined grids
    if (window.grids) {
      $.each(window.grids, function(selector, options) {
        if (selector != "defaults") {
          $(selector).grid(options);
          
          var options = {
            "columns": window.grids[selector]["columns"],
            "gridColGutter": window.grids[selector]["gridColGutter"]
          }
          that.updateSelectorList(selector, options);
        }
      });
    }
  };
  
  
  this.addOrUpdateSelector = function() {
    var data = $(this).serializeArray(),
        options = {};
    
    $.each(data, function(i, val) {
      options[data[i].name] = val.value;
    });
    
    var selector = $(options["selector"]);
    selector.grid(options);
    
    if (!gridStorage["selector"]) {
      that.updateSelectorList(selector, options);
    }
    
    return false;
  }
  
  
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
    
    form.find("form").bind("submit", this.addOrUpdateSelector);
    form.find("a").bind("click", this.removeSelector);
    form.find(":checkbox").bind("click", this.toggleGrid);
  };
  
  
  this.toggleGrid = function(event) {
    var elem = $(event.target),
        parent = elem.parent(),
        selector = parent.find("code").text(),
        overlay = $(selector).find("> .overlay"),
        options = {
          "columns": parent.find('input[name="columns"]').val(),
          "gridColGutter": parent.find('input[name="gridColGutter"]').val()
        };
    
    if (!gridStorage[selector]) {
      gridStorage[selector] = true;
      overlay.remove();
      $(elem[0]).attr("checked", "")
    } else {
      $(selector).grid(options);
      // $(selector).append(gridStorage[selector]);
      delete gridStorage[selector];
      $(elem[0]).attr("checked", "checked");
    }
    
    return false;
  };
}).apply(gridToolbar);

$(document).ready(function() {
  gridToolbar.init();
});
