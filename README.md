# README

## usersテーブル

|Culumn|Type|Options|
|------|----|-------|
|name|string|null: false, add_index|
|email|string|null: false|
|password|string|nill:false|

### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through: :users_groups


## groupsテーブル

|Culumn|Type|Options|
|------|----|-------|
|group|string|null: false, foreign_key: true, add_index|

### Association
- has_many :messages
- has_many :users_groups
- has_many :users, through: :users_groups


## messagesテーブル

|Culumn|Type|Options|
|------|----|-------|
|text|text|null: false, foreign_key: true|
|image|string|foreign_key: true|

### Association
- belongs_to :user
- has_many :groups_messages
- has_many :groups, through: :groups_messages


## users_groupsテーブル

|Culumn|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## groups_messagesテーブル

|Culumn|Type|Options|
|------|----|-------|
|group_message_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true

### Association
- belongs_to :group
- belongs_to :message