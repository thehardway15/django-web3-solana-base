from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import WalletAuthSerializer, UserSerializer
from .models import CustomUser
from nacl.signing import VerifyKey
from nacl.exceptions import BadSignatureError
import base58

# Create your views here.

@api_view(['POST'])
def wallet_auth(request):
    serializer = WalletAuthSerializer(data=request.data)
    if serializer.is_valid():
        wallet_address = serializer.validated_data['wallet_address']
        signature = serializer.validated_data['signature']
        message = serializer.validated_data.get('message', 'Login to the application')

        try:
            # Convert wallet address from base58
            public_key_bytes = base58.b58decode(wallet_address)
            
            # Create verify key
            verify_key = VerifyKey(public_key_bytes)
            
            # Verify signature
            try:
                verify_key.verify(message.encode(), base58.b58decode(signature))
            except BadSignatureError:
                return Response({'error': 'Invalid signature'}, status=status.HTTP_400_BAD_REQUEST)

            # Get or create user
            user, created = CustomUser.objects.get_or_create(wallet_address=wallet_address)
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'wallet_address': wallet_address
            })

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_wallet_info(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
