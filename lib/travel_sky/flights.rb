# coding: utf-8
module TravelSky
  class Flights
    
    attr_reader :depart, :return, :data, :depart_dates, :return_dates, :depart_title, :return_title 
    
    def initialize(data)
      @data         = data
      @depart       = data.xpath("//webFlightInfoList//webFlightInfo")
      @return       = data.xpath("//webFlightInfoList1//WebFlightInfo")
      @depart_dates = data.xpath("//webDateShowList//WebDateShow")
      @return_dates = data.xpath("//webDateShowList1//WebDateShow")
      request = data.xpath("//searchFlightInfoDTO").first
      @depart_title = "#{request.orgTime.content} #{request.orgCityName.content} - #{request.destCityName.content}"
      @return_title = "#{request.returnTime.content} #{request.destCityName.content} - #{request.orgCityName.content}"
    end
    
  end
end