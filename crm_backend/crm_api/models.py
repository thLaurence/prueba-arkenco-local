from django.db import models

# Create your models here.
class Usuario(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    cliente = models.ForeignKey('Cliente', on_delete=models.CASCADE, related_name='usuarios', default='')
    def __str__(self):
        return self.username

class Cliente(models.Model):
    #usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='cliente')
    nombre_empresa = models.CharField(max_length=100)
    rut = models.CharField(max_length=10)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=12)
        
    def __str__(self):
        return self.nombre_empresa

class estado(models.Model):
    ESTADO_CHOICES = (
        ('Abierto', 'Abierto'),
        ('Perdido', 'Perdido'),
        ('Ganado', 'Ganado'),
    )
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES)
    def __str__(self):
        return self.estado

class etapa(models.Model):
    ETAPA_CHOICES = (
        ('En conversación', 'En conversación'),
        ('Conseguido', 'Conseguido'),
        ('Perdido', 'Perdido'),
    )
    etapa = models.CharField(max_length=20, choices=ETAPA_CHOICES)
    def __str__(self):
        return self.etapa

class Prospecto(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    fecha_ingreso = models.DateField()
    sexo = models.CharField(max_length=10)
    cliente_id = models.ForeignKey('Cliente', on_delete=models.CASCADE)
    estado_id = models.ForeignKey(estado, on_delete=models.CASCADE)
    etapa_id = models.ForeignKey(etapa, on_delete=models.CASCADE)

    def get_estado(self):
        return self.estado_id.estado

    def get_etapa(self):
        return self.etapa_id.etapa
    
    def get_nombre_empresa(self):
        return self.cliente_id.nombre_empresa
    
    def __str__(self):
        return self.nombre
    