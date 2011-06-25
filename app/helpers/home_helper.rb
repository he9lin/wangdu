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
  
  def simple_box(title, &block)
    content_tag(:div, :class => 'widget_box') do
      head = content_tag(:div, :class => "widget_head") do
        content_tag(:h3, :class => "ui-widget-header") do
          title
        end
      end
      body = content_tag(:div, :class => "widget_body") do
        yield
      end
      head.concat body
    end
  end
  
  def tab_box(*args, &block)
    opts  = args.extract_options!
    title = args.first
    boxid = "#{opts[:id]}-1"
    opts[:class] = "tab_box #{opts[:class]}"
    content_tag(:div, opts) do
      head = content_tag(:ul) do
        content_tag(:li) do
          link_to title, (opts[:link] || "##{boxid}")
        end
      end
      body = content_tag(:div, :id => boxid, :class => "tab_box_body") do
        yield if block
      end
      head.concat body
    end
  end
  
end
