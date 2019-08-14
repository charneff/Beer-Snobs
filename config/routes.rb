Rails.application.routes.draw do
  get '/' => 'sessions#login'
  get '/home' => 'sessions#home'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/signup' => 'users#new'
  post '/signup' => 'users#create'
  delete '/logout' => 'sessions#destroy'
  get '/auth/:provider/callback' => 'sessions#create'
  resources :reviews
  resources :beers do
    resources :reviews, only: [:new, :index, :show]
  end
  resources :breweries, only: [:index, :show]
  resources :users, only: [:new, :create, :show]
  patch 'reviews/:id', to: 'reviews#update'
  delete '/beers/:id', to: 'beer#destroy', as:'delete_beer'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
