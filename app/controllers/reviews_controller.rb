class ReviewsController < ApplicationController

  def new
    if @beer = Beer.find_by_id(params[:beer_id])
      @review = @beer.reviews.build
    else
      @review = Review.new
    end
  end

  def create
    @review = current_user.reviews.build(review_params)
    if @review.save
      redirect_to review_path(@review)
    else
      render :new
    end
  end

  def show
    @review = Review.find_by_id(params[:id])
  end

  def index
    if @beer = Beer.find_by_id(params[:beer_id])
      @reviews = @beer.reviews
    else
      @reviews = Review.all
    end
  end

  private

  def review_params
    params.require(:review).permit(:beer_id, :stars, :title, :content)
  end


end
