class AddDetailsToSpots < ActiveRecord::Migration
  def change
    add_column :spots, :address, :string
    add_column :spots, :lat, :float
    add_column :spots, :lng, :float
    add_column :spots, :name, :string
  end
end
