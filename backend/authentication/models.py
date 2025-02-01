from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, wallet_address, **extra_fields):
        if not wallet_address:
            raise ValueError('The Wallet Address must be set')
        user = self.model(wallet_address=wallet_address, **extra_fields)
        user.save()
        return user

    def create_superuser(self, wallet_address, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(wallet_address, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    wallet_address = models.CharField(max_length=44, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'wallet_address'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.wallet_address
