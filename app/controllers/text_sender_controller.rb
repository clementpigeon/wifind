class TextSenderController < ApplicationController
  def index
  end
 
  def send_text_message
    number_to_send_to = params[:number_to_send_to]
    p number_to_send_to
    twilio_sid = "ACe6069a721ad705eeb92628e43442e767"
    twilio_token = "b5797f007680925847c92a7e4aebab4b"
    twilio_phone_number = "+1 832-514-4474"
 
    @twilio_client = Twilio::REST::Client.new twilio_sid, twilio_token
 
    @twilio_client.account.sms.messages.create(
      :from => twilio_phone_number,
      :to => number_to_send_to,
      :body => params[:message]
    )
  end
end