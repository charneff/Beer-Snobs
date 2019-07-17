class UserSerializer < ActiveModel::Serializer
  attributes :id, :password_digest
end
