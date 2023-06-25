from django.urls import path, include
from rest_framework import routers
from crm_api import views
from .views import ProspectosPorClientes


router = routers.DefaultRouter()
router.register(r'usuarios', views.UsuarioView, 'usuarios')
router.register(r'clientes', views.ClienteView, 'clientes')
router.register(r'estados', views.EstadoView, 'estados')
router.register(r'etapas', views.EtapaView, 'etapas')
router.register(r'prospectos', views.ProspectoView, 'prospectos')

urlpatterns = [
    path('', include(router.urls)),
    path('clientes/<int:cliente_id>/prospectos/', ProspectosPorClientes.as_view(), name='prospectos_cliente'),
]