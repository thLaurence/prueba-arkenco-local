from rest_framework import viewsets
from .serializer import *
from .models import *
from rest_framework.generics import ListAPIView
from django.shortcuts import render
# Create your views here.

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

class ClienteView(viewsets.ModelViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all()

class EstadoView(viewsets.ModelViewSet):
    serializer_class = EstadoSerializer
    queryset = estado.objects.all()

class EtapaView(viewsets.ModelViewSet):
    serializer_class = EtapaSerializer
    queryset = etapa.objects.all()

class ProspectoView(viewsets.ModelViewSet):
    serializer_class = ProspectoSerializer
    queryset = Prospecto.objects.all()

class ProspectosPorClientes(ListAPIView):
    serializer_class = ProspectoSerializer

    def get_queryset(self):
        cliente_id = self.kwargs['cliente_id']
        queryset = Prospecto.objects.filter(cliente_id=cliente_id)
        return queryset
    
def index(request):
    return render(request, 'index.html')