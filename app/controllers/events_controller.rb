class EventsController < ApplicationController
  def new
    @event = Event.new()
  end

  def create
    @events = Event.all
    @event = Event.new(events_params)
    @event.save
    redirect_to events_path
  end

  def show
   @event = Event.find(params[:id])
  end

  def index
    @events = Event.all
  end

  def report
    if params[:date1] && params[:date2]
      @events = Event.where("start_date>=:start_date AND end_date<= :end_date",
                             {start_date: params[:date1]+" 0:0:0", end_date: params[:date2]+ " 23:59:59" })
    else
      @events = Event.all
    end

    @report_data = Hash.new(0)
    @events.each do |event|
      @report_data[event.name] += event.end_date - event.start_date
    end
    @report_data.each do |k, v|
      @report_data[k] = time_format(v)
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    redirect_to events_path
  end

  private

  def events_params
    params.require(:event).permit(:name, :start_date, :end_date)
  end

  def time_format(time)
    time= time.round
    sec = time % 60

    time /= 60
    mins = time % 60

    time /= 60
    hrs = time % 24

    time /= 24
    days = time
    days.to_s + ":" + hrs.to_s + ":" + mins.to_s+ ":" +sec.to_s
  end
end


