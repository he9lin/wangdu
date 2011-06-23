# coding: utf-8
module TravelSky
  module FlightsHelper
    
    def flight_info_dto(flights, type = 'depart')
      content_tag :div, :id => "dto_header" do
        content_tag :h3 do
          flights.send "#{type}_title"
        end
      end
    end

    def flight_dates(flights, type = 'depart')
      content_tag :div, :class => "flight_dates" do
        dates = []
        flights.send("#{type}_dates").each do |d|
          klass = flights.send("#{type}_title").include?(d.mmAndDD.content) ? "current" : "" 
          dates << flight_date(d, klass)
        end
        dates.join.html_safe
      end
    end

    def flight_date(d, klass = "")
      content_tag :div, :class => "flight_date #{klass}" do
        [ content_tag(:p, d.year.content, :class => 'year'),
          content_tag(:p, d.mmAndDD.content, :class => 'date'),
          content_tag(:p, d.weekDay.content),
          content_tag(:p, d.lowestPrice.content, :class => 'lowest_price'),
          content_tag(:div, "", :class => ( d.discountExisted.content == 'true' ? "discount_existed" : "") )
        ].join.html_safe
      end
    end

    # http://www.travelsky.com/newsky/images/airline/3U.gif
    def row_flight(flight)
      flight_no = flight.flightNo.content
      row = content_tag :tr, :class => "#{cycle('odd', 'even')}" do
        [ content_tag(:td, image_tag("http://www.travelsky.com/newsky/images/airline/#{flight.airlineCode.content}.gif")),
          content_tag(:td, "#{flight.airlineChineseName.content} <br> #{flight.planeType.content}".html_safe, :class => "airline"),
          content_tag(:td, flight_no),
          content_tag(:td, "#{flight.depTime.content} <br> #{flight.arrTime.content}".html_safe),
          content_tag(:td, "#{flight.org.content}  <br> #{flight.dest.content}".html_safe, :class => "airport"),
          content_tag(:td, flight.stopNumbers.content),
          content_tag(:td, "#{flight.lowestCabinInfo.content} / #{flight.lowestCabinCode.content}"),
          content_tag(:td, [content_tag(:span, flight.lowestprice.content, :class => "price"), content_tag(:span, " (#{flight.lowestDiscount.content})", :class => "discount")].join.html_safe), 
          content_tag(:td, link_to("详情", "#!", :id => "btn_#{flight_no}_toggle", :rel => "#{flight_no}", :class => "btn_flight_toggle")),
        ].join.html_safe
      end

      hide = content_tag :tr, :id => "detail_#{flight.flightNo.content}", :class => "detail_flight"  do
        content_tag :td, :colspan => 9 do
          content_tag :ul do
            [ content_tag(:li, "飞行 #{flight.flightMinuteHH.content}小时#{flight.flightMinuteSS.content}分钟"),
              content_tag(:li, "燃油税: #{flight.yqTax.content}"),
              content_tag(:li, "机场建设费: #{flight.cnTax.content}"),
              content_tag(:li, flight.meal.content),
              content_tag(:li, "#{flight.stopNumbers.content}经停") 
            ].join.html_safe
          end
        end
      end
      row.concat(hide)
    end
    
  end
end