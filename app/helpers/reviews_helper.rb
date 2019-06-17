module ReviewsHelper
  def display_header(review)
    if params[:beer_id]
        content_tag(:h1, "Add a Review for #{review.beer.name} -  #{review.beer.brewery.name}")
    else
      content_tag(:h1, "Create a review")
    end
  end
end
