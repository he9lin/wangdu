# coding: utf-8
class StaticController < ApplicationController
  layout nil
  
  respond_to :html, :js
  
  def index
    unless params["cat"].blank?
      render params["cat"]
    else
      render :companies
    end
  end
  
end