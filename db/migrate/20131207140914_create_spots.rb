class CreateSpots < ActiveRecord::Migration
  def change
    create_table :spots do |t|
      t.string :category
      t.string :wifi_quality
      t.integer :price
      t.string :noise
      t.string :food_beverage

      t.timestamps
    end
  end
end
