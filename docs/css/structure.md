## CSS/Sass folder structure

One of the most useful features of Sass is being able to separate our stylesheets into separate files and use the @import directive to include the source of our individual files into one master stylesheet.

Here are listed our default partial structure we use across our projects:

    stylesheets/
    |
    |── components/            # Common project modules [1.]
    |   |── _Component.sass    # Component placeholder
    |   |── _Heading.sass      # Default heading component
    |   |── _Icon.scss         # Icon component placeholder
    |   |── _Ieframe.scss      # IE warning comonent
    |   |── _Text.scss         # Default text component
    |   ...
    |
    |── generic/               # Generic settings [2.]
    |   |── _base.sass         # Default settings
    |   |── _fonts.scss        # Font imports
    |   |── _placeholder.scss  # Global uncategorized placeholders
    |   |── _typography.scss   # Default typography settings
    |   ...
    |
    |── helper/                # Helpers [3.]
    |   |── _helper.scss       # Global uncategorized helpers
    |   ...
    |   
    |── layout/                # Layout components [4.]
    |   |── _Container.scss    # Default container component
    |   |── _Footer.scss       # Footer placeholder
    |   |── _Grid.scss         # Default grid component
    |   |── _Header.scss       # Header placeholder
    |   |── _Width.scss        # Default width component
    |   |── _Wrap.scss         # Default wrap component
    |   ...
    |   
    |── mixins/                # Layout components [5.]
    |   |── _breakpoint.scss   # Breakpoint mixin
    |   |── _fontSize.scss     # Font sizing with rems
    |   ...
    | 
    |── vendor/                # CSS or Sass from other projects [6.]
    |   |── _datepicker.scss
    |   |── _slick.scss
    |   ...
    |
    `── _config.scss           # Global project variables [6.]
    `── app.scss               # Primary Sass file [7.]