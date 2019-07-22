class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest
  has_many :reviews
  has_many :reviewed_beers, through: :reviews, source: :beer
  has_many :beers
end
