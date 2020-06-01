FactoryBot.define do
  factory :messages do
    text    {Faker::Lorem.sentence}
    image   {Faker.open("#{Rails.root}/public/images/test_image.jpeg")}
    user
    group
  end
end