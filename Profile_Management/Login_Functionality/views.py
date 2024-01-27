from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import *
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .utils import token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse 
from django.conf import settings

@api_view(['POST'])
def login(request):
    try:
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            if user.is_active==False:
                return Response({"error": "Email not verified"}, status=401)
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {
                    'token': token.key,
                    'username': user.username,
                    'email': user.email                    
                }
            )
        else:
            return Response({'error': 'Invalid credentials'}, status=401)
    except Exception as e:
            return Response({"error":{"general" : str(e)}}, status=500)
        
@api_view(['POST'])
def register(request):
    try:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data["username"])
            user.set_password(request.data["password"])
            user.is_active = False
            user.save()
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            domain = get_current_site(request).domain
            link = reverse('activate', kwargs={'uidb64':uidb64, 'token':token_generator.make_token(user)})
            activate_url = 'http://' + domain + link
            email_subject = 'Activate your account'
            email_body = 'Hi! ' + user.username + '\n\nPlease use this link to verify your account\n\n'+ activate_url
            #EmailMessage is a class responsible for creating the email message itself. 
            email = EmailMessage(
                email_subject, #email subject
                email_body, #email body
                settings.EMAIL_HOST_USER, #email id from which we want to send mails
                [user.email] #email id to whom we want to send the email
            )
            email.send(fail_silently=False)
            return Response({"message":"User registration successful. Please check email for verification of profile"}, status=201)
        else:
            return Response({'error': serializer.errors}, status=400)
    except Exception as e:
        return Response({"error":{"general" : str(e)}}, status=500)
          
@api_view(['GET'])
def activate(request, uidb64, token):
    uid = force_str(urlsafe_base64_decode(uidb64))
    user = User.objects.get(pk=uid)
    
    # user is activated if token from link is correct
    if user is not None and token_generator.check_token(user, token):
        user.is_active=True
        user.save()
        return Response({"message": "Email Veirfication Successful"}, status=200)
    else:
        return Response({"error": {"general":"Email Verification Unsuccessful"}}, status=401)
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def update(request):
    try:
        user = User.objects.get(username=request.user)
        if "username" in request.data:
            user.username = request.data["username"]
        if "email" in request.data:
            user.email = request.data["email"]
        user.save()
        return Response({"message":"Updated Profile Details Successfully!"}, status=201)
    except Exception as e:
        return Response({"error":{"general" : str(e)}}, status=500)
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def search(request):
    try:
        users = User.objects.filter(is_superuser=False)
        if "startswith" in request.GET:
            users = users.filter(username__startswith=request.GET.get('startswith'))
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=201)
    except Exception as e:
        return Response({"error":{"general" : str(e)}}, status=500)
    
@api_view(['POST'])
def request_reset(request):
    try:
        user = User.objects.get(email=request.data['email'])
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        domain = "localhost:3000/reset_password/"
        activate_url = 'http://' + domain + uidb64 + "/" + token_generator.make_token(user)
        email_subject = 'Rest your password'
        email_body = 'Hi! ' + user.username + '\n\nPlease use this link to reset your password\n\n'+ activate_url
        #EmailMessage is a class responsible for creating the email message itself. 
        email = EmailMessage(
            email_subject, #email subject
            email_body, #email body
            settings.EMAIL_HOST_USER, #email id from which we want to send mails
            [user.email] #email id to whom we want to send the email
        )
        email.send(fail_silently=False)
        return Response({"message":"Please check email for reset password link."}, status=201)
    except Exception as e:
        return Response({"error":{"general" : str(e)}}, status=500)
    
@api_view(['POST'])
def reset_password(request):
    try:
        token = request.data['token']
        uidb64 = request.data['uidb64']
        password = request.data['password']
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
        # user is activated if token from link is correct
        if user is not None and token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response({"message": "Password Reset Successful"}, status=200)
        else:
            return Response({"error": {"general":"Password Reset Unsuccessful"}}, status=401)
    except Exception as e:
        return Response({"error":{"general" : str(e)}}, status=500)

    
