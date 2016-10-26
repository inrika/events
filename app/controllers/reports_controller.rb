class ReportsController < ApplicationController
  def index
    @event = Event.all
  end
end
