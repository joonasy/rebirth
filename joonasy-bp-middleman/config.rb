
##  ===================
##  Basics
##  ===================

    # Markdown
    set :markdown_engine

    # Livereload
    activate :livereload

    # Compass
    compass_config do |config|
      config.output_style = :extended
      config.line_comments = false
    end

    # Locations
    set :css_dir, 'assets/css'
    set :sass_dir, 'assets/css'
    set :js_dir, 'assets/js'
    set :images_dir, 'assets/img'
    set :fonts_dir, 'assets/fonts'
    #set :build_dir, 'build'



##  ======================
##  Page options & layouts
##  ======================

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



##  ===================
##  Helpers
##  ===================

    helpers do

      # Local siteurl
      def siteUrl
        siteUrl = "http://localhost:4567/"
      end

      # Page title
      def page_title
        title = "Site title here"
        if data.page.title
          title << " | " + data.page.title
        end
        title
      end

      # Page description
      def page_description
        if data.page.description
          description = data.page.description
        else
          description = "Description here"
        end
        description
      end

    end



##  ===================
##  Build-specific configuration
##  ===================

    configure :build do

      # Site url for the live server
      helpers do
        def siteUrl
          siteUrl = "http://mywebsite.com/"
        end
      end

      # Minify on build
      activate :minify_css
      activate :minify_javascript
      # activate :minify_html

      # Ignores
      # ignore 'assets/js/lib/^(?!files\/).*(?<!\.js)$'
      # ignore '/^assets\/.*/'

      # Create favicon/touch icon set from source/favicon_base.png
      # set :favicon_maker_input_dir, "source/assets/img/touch/"
      # set :favicon_maker_output_dir, "favicons"
      # activate :favicon_maker

      # Enable cache buster
      # activate :cache_buster

      # Use relative URLs
      # activate :relative_assets

      # Asset hash
      # activate :asset_hash, :ignore => %r{^assets/js/vendor/.*}

      # Compress PNGs after build
      # First: gem install middleman-smusher
      # require "middleman-smusher"
      # activate :smusher

      # Or use a different image path
      # set :http_path, "/Content/images/"
    end