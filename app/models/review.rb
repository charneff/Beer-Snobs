class Review < ApplicationRecord
  belongs_to :user
  belongs_to :beer

  validates :title, presence: true
  validates :stars, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than: 6 }
  validates :content, presence: true
  validates :beer, uniqueness: { scope: :user, message: "has already been reviewed by you"  }
end
