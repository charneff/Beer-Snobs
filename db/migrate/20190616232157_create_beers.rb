class CreateBeers < ActiveRecord::Migration[5.2]
  def change
    create_table :beers do |t|
      t.string :name
      t.string :style
      t.float :abv
      t.string :flavor_profile
      t.belongs_to :brewery, foreign_key: true
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
