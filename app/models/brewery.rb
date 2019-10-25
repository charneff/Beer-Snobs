class Brewery < ApplicationRecord
  has_many :beers
  validates :name, presence: true, uniqueness: true

  scope :alpha, -> {order(:name)}

  def name_and_location
    "#{name} - #{location}"
  end

end
