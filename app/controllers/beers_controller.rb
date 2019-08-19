class BeersController < ApplicationController
  

  def new
    @beer = Beer.new
    @beer.build_brewery
  end

  def create
    # @beer = Beer.create(beer_params)
    @brewery = Brewery.find_or_create_by(name: params[:beer][:brewery_name])

    @beer = Beer.create(beer_params)
    @beer.user_id = session[:user_id]

    if @beer.save!
      redirect_to beer_path(@beer)
    else
      @beer.build_brewery
      render :new
    end
  end

  def show
    @beer = Beer.find_by_id(params[:id])
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @beer}
    end
  end

  def index
    @beers = Beer.order_by_rating.includes(:brewery)
    render json: @beers
    # respond_to do |f|
    #   f.html {render :index}
    #   f.json {render json: @beers}
    # end
  end

  def destroy
    Beer.find(params[:id]).destroy
    redirect_to beers_path
  end

  def brewery_name=(name)
    self.brewery = Brewery.find_or_create_by(name: name)
  end

  def brewery_name
     self.brewery ? self.brewery.name : nil
  end

  private

  def beer_params
    params.require(:beer).permit(:name, :style, :abv, :flavor_profile, :brewery_name)
  end
end


# :brewery_id, brewery_attributes: [:name, :location]
