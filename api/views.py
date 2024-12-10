from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import UserCreateSerializer, UserSerializer
from api.models import UserAccount

# Create your views here.

class RegisterView(APIView):

    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)


class RetriveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)
    

class FetchUsers(APIView):

    def get(self, request):

        users = UserAccount.objects.all()
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)