class Api::MessagesController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    last_message_id = params[:id].to_i
    @message = group.messaes.includes(:user).where("id > ?", last_message_id)
  end
end