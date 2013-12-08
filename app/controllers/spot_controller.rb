class SpotController < ApplicationController
  def index
  	client = Foursquare2::Client.new(:client_id => '32KYUGGKRINVMAXF2HGA2XLWNIF5R3JDSWBTRPUGUX2S35YX', :client_secret => 'CA41PYYT2R035YOB2HYVO5F0LEPGINUIITL3FW10JDP044TF')
  	search_tab = []
  	search_tab << "bar"
  	search_tab << "Coworking"
  	search_tab << "coffee"
  	 search_tab.each do  |elem|
	   	spots = client.search_venues(:ll => '48.858743,2.42598', :query => elem, :radius => "4000").to_hash
	  	#spots = client.search_venues(:ll => '48.872548,2.344505', :query => elem).to_hash
	  	spots["groups"].first["items"].each do | spot|
	  	  	details = client.venue(spot["id"]).to_hash
		  	details["attributes"]["groups"].each  do | item| 
		  		if item.has_value?("wifi")
		  			spot = Spot.new
		  			spot.name = details["name"]
		  			spot.category = elem
		  			spot.lat = details['location']['lat']
		  			spot.lng = details['location']['lng']
		  			spot.address = details['location']['address'].to_s + ", " + details['location']['postalCode'].to_s + ", " + details['location']['city'].to_s + ", " + details['location']['country'].to_s
		  			spot.wifi_quality = "none"
		  			spot.noise = "none"
		  			spot.save
		  			food_beverage = "none"
		  		end
		  	end
	  	end
	end

	@spots = Spot.all
	@hash = Gmaps4rails.build_markers(@spots) do |spot, marker|
		puts "-----"
		puts spot.lat
		puts spot.lng
		puts "-----"
  		marker.lat spot.lat
  		marker.lng spot.lng
  		marker.infowindow spot.name
	end

	p @hash

  end
end
