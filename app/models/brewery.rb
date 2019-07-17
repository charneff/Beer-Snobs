class Brewery < ApplicationRecord
  has_many :beers

  def beer_ids=(ids)
    ids.each do |id|
      beer = Beer.find(id)
      self.beers << beer
    end
  end

end
