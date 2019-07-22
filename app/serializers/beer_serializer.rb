class BeerSerializer < ActiveModel::Serializer
  attributes :id, :name, :style, :abv, :flavor_profile, :brewery_id, :user_id
  belongs_to :brewery
  belongs_to :user
  has_many :reviews
  has_many :users, through: :reviews
end
