module SiteHelpers

  def page_title
    title = "Site title here"
    if data.page.title
      title << " | " + data.page.title
    end
    title
  end

  def page_description
    if data.page.description
      description = data.page.description
    else
      description = "Description here"
    end
    description
  end

end