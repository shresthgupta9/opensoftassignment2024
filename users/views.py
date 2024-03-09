from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserNewSerializer

# Create your views here.


@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializer = UserNewSerializer(users, many=True)
    return Response(serializer.data)
