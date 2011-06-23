require 'spec_helper'

describe HomeController do
  
  let(:success_result) { File.read("#{Rails.root}/spec/fixtures/travelsky.xml") }
  let(:fail_result)    { File.read("#{Rails.root}/spec/fixtures/error.xml") }
  let(:search_params)  { {"flight_type"=>"return", "depart_city"=>"chengdu", "arrival_city"=>"beijing", "datepicker_depart"=>"2011-06-23", "datepicker_return"=>"2011-06-30", "direct_flag"=>"all", "airline"=>{"airline_id"=>""}, "controller"=>"home", "action"=>"search"}  }
  
  describe "Search flights" do
    
    context "on success" do
      before(:each) do
        TravelSky::Base.stub(:response_body).and_return(success_result)
      end    
    
      it "should get correct flights and save the request params to session" do
        TravelSky::Flights.should_receive(:new)
        xhr :post, :search, "flight_type"=>"return", "depart_city"=>"chengdu", "arrival_city"=>"beijing", "datepicker_depart"=>"2011-06-23", "datepicker_return"=>"2011-06-30", "direct_flag"=>"all", "airline"=>{"airline_id"=>""}
      end
      
    end
    
    context "on fail" do
      before(:each) do
        TravelSky::Base.stub(:response_body).and_return(fail_result)
      end    
    
      it "should get nil and save the request params to session" do
        TravelSky::Flights.should_not_receive(:new)
        xhr :post, :search, "flight_type"=>"return", "depart_city"=>"chengdu", "arrival_city"=>"beijing", "datepicker_depart"=>"2011-06-23", "datepicker_return"=>"2011-06-30", "direct_flag"=>"all", "airline"=>{"airline_id"=>""}
      end
    end
    
  end
  
end
