class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      render :new
    end
  end

  def show
    @user = User.find_by_id(params[:id])
    if !@user
      redirect_to '/'
    else
      redirect_to '/home'
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
