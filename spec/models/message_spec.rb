require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do

    context 'message を保存できる場合' do
      it 'text があれば保存できること' do
        message = build(:message)
        expect(build(:message, image: nil)).to be_valid
      end

      it 'image があれば保存できること' do
        expect(build(:message, text: nil)).to be_valid
      end

      it 'text と image があれば保存できること' do
        expect(build(:message)).to be_valid
      end
    end

    context 'messae を保存できない場合' do
      it 'text と image が共にからである時、保存できないこと' do
        message = build(:message, text: nil, image: nil)
        message.valid?
        expect(message.errors[:text]).to include("を入力してください")
      end

      it 'group_id がないと保存できないこと' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it 'user_id がないと保存できないこと' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end

  end
end