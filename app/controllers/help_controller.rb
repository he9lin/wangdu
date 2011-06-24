class HelpController < ApplicationController
  
  CATEGORIES = ['general', 'ticket', 'service']
  
  respond_to :html, :js
  
end
