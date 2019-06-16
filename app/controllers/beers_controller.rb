class BeersController < ApplicationController

  def new
    @beer = Beer.new
    @beer.build_brewery
  end

  def create
    @beer = Beer.new(beer_params)
    binding.pry
    @beer.user_id = session[:user_id]

    if @beer.save!
      redirect_to beer_path(@beer)
    else
      render :new
    end
  end

  def show
    @beer = Beer.find_by_id(params[:id])
  end

  def index
    @beers = Beer.all
  end

  private

  def beer_params
    params.require(:beer).permit(:name, :style, :abv, :flavor_profile, :brewery_id, brewery_attributes: [:name, :location])
  end
end
