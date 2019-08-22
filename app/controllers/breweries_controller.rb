class BreweriesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @breweries = Brewery.all
    render json: @breweries
  end

  def create
    Brewery.create(brewery_params)
  end

  private

  def brewery_params
    params.require(:brewery).permit(:brewery_name, beer_ids: [])
  end

end
