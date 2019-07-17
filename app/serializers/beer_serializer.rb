class BeerSerializer < ActiveModel::Serializer
  attributes :id, :name, :style, :abv, :flavor_profile, :brewery_id, :user_id
end
