# coding: utf-8
module HomeHelper
  include TravelSky::FlightsHelper
  include TravelSky::CitiesHelper
  
  def simple_table(*args, &block)
    opts = args.extract_options!
    names = (args.first || '').split(',')
    opts[:class] = "simple_table #{opts[:class]} col#{names.length}"
    content_tag(:table, opts) do
      thead = content_tag(:thead) do
        content_tag(:tr, :class=>"ui-widget-header ") do
          names.collect { |name| content_tag(:td, name) }.join('').html_safe
        end
      end
      tbody = content_tag(:tbody, capture(&block))
      thead.concat tbody
    end
  end
  
end
