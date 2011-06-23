module TravelSky
  class Base
    def self.url(params = {})
      
      options = {
        :search_scope=> 'domestic',
        :airline_code=> 'all',
        :page_no     => '1',
        :direct_flag => 'false',
        :flight_type => 'depart',
        :sort_code   => 'price',
        :sort_code1  => 'price',
        :ws          => 'IDSWebService',
        :method      => 'searchFlightInfo',
        :eval_mode   => 'false',
        :xhr         => 'true'
      }.merge(params)
      
      
      str = []
      options.stringify_keys.each do |k, v|
        str << "#{k.camelize(:lower)}=#{v}" unless v.blank?
      end
      r = str.join("&")
      
      Rails.logger.info("GET travelsky params: #{r}")
      "http://www.travelsky.com/newsky/Dispatch/invoke?#{r}"
      
    end
    
    def self.search(params = {})
      Nokogiri::Slop(response_body(params))
    end
    
    private 
    
    def self.response_body(params)
      HTTParty.get(url(params)).body
    end
    
  end
end