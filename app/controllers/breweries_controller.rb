class BreweriesController < ApplicationController

  def index
    @breweries = Brewery.all
  end

  def create
    Brewery.create(brewery_params)
  end

  private

  def brewery_params
    params.require(:brewery).permit(:brewery_name, beer_ids: [])
  end

end
