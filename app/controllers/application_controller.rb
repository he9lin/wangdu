class ApplicationController < ActionController::Base
  protect_from_forgery
  
  def render_403(message)
    render :text => message, :status => 403
  end
  
end
