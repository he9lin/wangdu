class HelpController < ApplicationController
  
  CATEGORIES = ['general', 'ticket', 'service', 'intro']
  
  respond_to :html, :js
  
end
