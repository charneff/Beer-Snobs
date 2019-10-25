class Beer < ApplicationRecord
  belongs_to :brewery
  belongs_to :user #creator
  has_many :reviews
  has_many :users, through: :reviews #user who reviewed
  validates :name, presence: true
  validates :style, presence: true
  validates :abv, presence: true
  validates :flavor_profile, presence: true
  validates :brewery, presence: true
  validate :not_a_duplicate

  scope :order_by_rating, -> {left_joins(:reviews).group(:id).order('avg(stars) desc')}

  def self.alpha
    order(:name)
  end

  def brewery_attributes=(attributes)
    self.brewery = Brewery.find_or_create_by(attributes) if !attributes['name'].empty?
    self.brewery
  end

  def not_a_duplicate
    if Beer.find_by(name: name, brewery_id: brewery_id)
      errors.add(:name, 'has already been added for that brewery')
    end
  end

  def name_and_brewery
    "#{name} - #{brewery.name}"
  end
end
