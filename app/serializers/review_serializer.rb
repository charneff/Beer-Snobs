class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :stars, :title, :content, :user_id, :beer_id
  belongs_to :user
  belongs_to :beer
end
