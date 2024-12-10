from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from api.models import UserAccount
from django.core import exceptions

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'

    def validate(self, data):
        user=UserAccount(**data)
        password=data.get('password')

        try:
            validate_password(password, user)
        except exceptions.ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
            raise exceptions.ValidationError({'password': serializer_errors['non_field_errors']})
        return data


    def create(self, validated_data):
        user = UserAccount.objects.create_user(
        first_name=validated_data['first_name'],
        last_name=validated_data['last_name'],
        email=validated_data['email'],
        password=validated_data['password'],
        )

        return user
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('first_name', 'last_name', 'email', 'title', 'description', 'is_active', 'is_superuser')
