# coding: utf-8
class HomeController < ApplicationController
  
  respond_to :html, :js

  def search
    options = {
      :airline_code=> params["airline"]["airline_id"].blank? ? 'all' : params["airline"]["airline_id"],
      :direct_flag => params["direct_flag"] == "all" ? 'false' : 'true',
      :flight_type => params["flight_type"],
      :org_city    => TravelSky::Cities.get_code(params['depart_city']),
      :dest_city   => TravelSky::Cities.get_code(params['arrival_city']),
      :org_time    => params['datepicker_depart'],
      :return_time => params['datepicker_return'],
    }
    
    result   = TravelSky::Base.search(options)
    @error   = result.xpath("//messageText").text() || result.xpath("//error").text()
    @flights = @error.blank? ? TravelSky::Flights.new(result) : nil
    @flight_type = params["flight_type"]
  end
  
end
