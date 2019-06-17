class Beer < ApplicationRecord
  belongs_to :brewery
  belongs_to :user #creator
  has_many :reviews
  has_many :users, through: :reviews #user who reviewed
  validates :name, presence: true
  accepts_nested_attributes_for :brewery
  validate :not_a_duplicate

  scope :order_by_rating, -> {left_joins(:reviews).group(:id).order('avg(stars) desc')}

  def self.alpha
    order(:name)
  end

#   def breweries_attributes=(brewery_attributes)
#     brewery_attributes.values.each do |v|
#       brewery = Brewery.find_or_create_by(v)
#       self.breweries << brewery
#     end
#
#     binding.pry
# #need to tell beer it belongs to brewery... thought it should be taken care of in new beer action and models?
#   end

  # def brewery_name=(name)
  #   self.brewery = Brewery.find_or_create_by(name: name)
  # end
  #
  # def brewery_name
  #    self.brewery ? self.brewery.name : nil
  # end

  # def brewery_location=(location)
  #   self.brewery = Brewery.find_or_create_by(location: location)
  # end
  #
  # def brewery_location
  #    self.brewery ? self.brewery.location : nil
  # end

  def not_a_duplicate
    if Beer.find_by(name: name, brewery_id: brewery_id)
      errors.add(:name, 'has already been added for that brewery')
    end
  end

  def name_and_brewery
    "#{name} - #{brewery.name}"
  end
end
