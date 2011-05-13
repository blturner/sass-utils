# Sass utils
This is collection of tools I'm using to work with [Sass](http://sass-lang.com/). I started this project during "hack day" at [Mediaphormedia](http://ellingtoncms.com).

## Getting started
You definitely need [Sass](http://sass-lang.com/), so you'll want to install that. If you haven't used Sass before, check out the [tutorial](http://sass-lang.com/tutorial.html) and then refer to the [documentation](http://sass-lang.com/docs.html).

    gem install sass
    sass --watch sass:stylesheets

### Using the "_grid" partial
Setup the default grid values:

    $min_grid_width: 60em;
    $max_grid_width: 80em;
    $grid_columns: 16;
    $grid_col_gutter: 10px;
    $baseline_height: 22px;

Include the grid partial in `style.scss` (or whatever the name of your file is):

    @include grid;

Use the `grid_container` mixin on your root grid element:

    #page {
      @include grid_container;
    }

You can define a grid row using the `row` mixin:

    #content_wrapper {
      @include row;
    }

Next define the columns within the row of your grid:

    #content_wrapper #content {
      @include col(10);
    }
    
    #content_wrapper #sidebar {
      @include col(6);
    }

## Helper bits
If you want elements inside of a column to line up with the gutter of the grid, you can use the `box_padding` mixin to align them:

    @mixin box_padding($top_bottom: 0, $left_right: 0) {
      padding: $top_bottom $left_right;
    }

Use the `$grid_col_gutter` variable you defined in the defaults so you only have to change it once:

    h1 {
      @include box_padding(0, $grid_col_gutter);
    }

