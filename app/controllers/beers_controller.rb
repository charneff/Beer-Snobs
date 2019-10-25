class BeersController < ApplicationController
  before_action :set_beer, only:[:show, :edit, :update]
  before_action :redirect_if_not_logged_in

  def new
    @beer = Beer.new
    @beer.build_brewery
  end

  def create
    if !!logged_in?
      @beer = Beer.create(beer_params)
      @beer.user_id = session[:user_id]

      if @beer.save!
        redirect_to home_path
      else
        @beer.build_brewery
        render :new
      end
    else
      redirect_to login_path
    end
  end

  def show
    beer = Beer.find_by_id(params[:id])
    render json: beer
  end

  def index
    beers = Beer.order_by_rating.includes(:brewery)
    render json: beers
  end

  def destroy
    Beer.find(params[:id]).destroy
    redirect_to beers_path
  end

  private

  def beer_params
     params.require(:beer).permit(:name, :style, :abv, :flavor_profile, :brewery_id, brewery_attributes:[:name, :location])
  end

  def set_beer
    @beer = Beer.find_by(params[:id])
    redirect to beers_path if !@beer
  end
end
