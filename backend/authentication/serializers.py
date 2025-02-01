from rest_framework import serializers
from .models import CustomUser


class WalletAuthSerializer(serializers.Serializer):
    wallet_address = serializers.CharField(max_length=44)
    signature = serializers.CharField()
    message = serializers.CharField(required=False)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('wallet_address', 'created_at') 