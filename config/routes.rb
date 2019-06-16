Rails.application.routes.draw do
  get '/' => 'sessions#welcome'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/signup' => 'users#new'
  post '/signup' => 'users#create'
  delete '/logout' => 'sessions#destroy'
  get '/auth/:provider/callback' => 'sessions#create'
  resources :reviews
  resources :beers do
    resources :reviews, only: [:new, :index]
  end
  resources :breweries
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
