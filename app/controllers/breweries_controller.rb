class BreweriesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @breweries = Brewery.all
    render json: @breweries
  end

  def show
    @brewery = Brewery.find(params[:id])
  end

end
