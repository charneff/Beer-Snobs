class ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token

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
      render json: @review, status: 201
    else
      flash[:error] = "Review not created."
    end
  end

  def show
    @review = Review.find_by_id(params[:id])
    respond_to do |f|
      f.html {render :show}
      f.json {render json: @review, status: 200}
    end
  end

  def index
    if @beer = Beer.find_by_id(params[:beer_id])
      @reviews = @beer.reviews
      respond_to do |f|
        f.html {render :index}
        f.json {render json: @reviews}
      end
    else
      @reviews = Review.all
      respond_to do |f|
        f.html {render :index}
        f.json {render json: @reviews}
      end
    end
  end

  def edit
    @review = Review.find_by_id(params[:id])
  end

  def update
    @review = Review.find(params[:id])
    @review.update(review_params)
    if @review.save
      respond_to do |f|
        f.html {redirect_to review_path(@review)}
        f.json {render json: @review}
      end
    else
      render :edit
    end
  end

  def review_data
    review = Review.find(params[:id])
    render json: review.to_json
  end

  private

  def review_params
    params.require(:review).permit(:beer_id, :stars, :title, :content)
  end

end
