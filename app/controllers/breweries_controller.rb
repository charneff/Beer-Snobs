class BreweriesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :redirect_if_not_logged_in

  def index
    @breweries = Brewery.all
    render json: @breweries
  end

  def show
    @brewery = Brewery.find(params[:id])
    render json: @brewery
  end

end
