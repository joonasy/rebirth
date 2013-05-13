# Markdown
set :markdown_engine

#L ivereload
activate :livereload

###
# Compass
###

# Susy grids in Compass
# First: gem install compass-susy-plugin
# require 'susy'

# Change Compass configuration
compass_config do |config|
  config.output_style = :extended
  config.line_comments = false
end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Local site url
helpers do
  def siteUrl
    siteUrl = "http://localhost:4567/"
  end
end

set :css_dir, 'assets/css'
set :sass_dir, 'assets/css'
set :js_dir, 'assets/js'
set :images_dir, 'assets/img'
set :fonts_dir, 'assets/fonts'
#set :build_dir, 'build'

# Build-specific configuration
configure :build do

  # Site url for the live server
  helpers do
    def siteUrl
      siteUrl = "http://mywebsite.com/"
    end
  end

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Create favicon/touch icon set from source/favicon_base.png
  #set :favicon_maker_input_dir, "source/assets/img/touch/"
  #set :favicon_maker_output_dir, "favicons"
  #activate :favicon_maker

  # Enable cache buster
  # activate :cache_buster

  # Use relative URLs
  #activate :relative_assets

  # Asset hash
  activate :asset_hash, :ignore => %r{^assets/js/vendor/.*}

  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher

  # Or use a different image path
  # set :http_path, "/Content/images/"
end