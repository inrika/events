class EventsController < ApplicationController
  def new
    @event = Event.new()


  end
  def create

    @event = Event.new(events_params)

    @event.save!
    redirect_to @event

  end
  def show
    @event = Event.find(params[:id])
  end
  def index

    @events = Event.all
   #report


    end
  end

def report
#  $new_events = Hash.new(0)
  $new_events = {}

  @events.each do |event|
    $new_events[event.name] += event.end_date - event.start_date
  end
  $new_events.each do |k,v|
    v = time_format(v)
  end

  render 'report'


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
  return  #{days}+":" +#{hrs}+ ":" +#{mins}+ ":" + #{sec}
end


