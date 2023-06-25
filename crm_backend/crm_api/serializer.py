from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = estado
        fields = '__all__'

class EtapaSerializer(serializers.ModelSerializer):
    class Meta:
        model = etapa
        fields = '__all__'

class ProspectoSerializer(serializers.ModelSerializer):
    estado = serializers.SerializerMethodField()
    etapa = serializers.SerializerMethodField()
    nombre_empresa = serializers.SerializerMethodField()

    class Meta:
        model = Prospecto
        fields = ['id', 'nombre', 'email', 'telefono', 'fecha_ingreso', 'sexo', 'cliente_id', 'estado_id', 'etapa_id', 'estado', 'etapa', 'nombre_empresa']

    def get_estado(self, obj):
        return obj.estado_id.estado

    def get_etapa(self, obj):
        return obj.etapa_id.etapa
    
    def get_nombre_empresa(self, obj):
        return obj.cliente_id.nombre_empresa