
# Prueba Arkenco

En el siguiente documento explicaré cómo funciona el proyecto realizado y 
pequeñas consideraciones que se deben tener en cuenta a la hora de ejecutarlo.

## Introducción

Pequeña aplicación web CRUD para Prospectos segun Cliente.

El proyecto se divide en:

  - Backend: Django, Rest Framework, Cors Headers
  - Frontend: React 
  - Base de datos: MySQL

Esta es la estructura del proyecto:

```bash
db_ejemplos.sql
crm_backend/
├── crm_api/
├── crm_env/
├── crm_proyecto/
│   └── requirements.txt
└── manage.py

crm_frontend/
└── crm_cliente/
    ├── public/
    ├── src/
    ├── package.json
    ├── package-lock.json
    └── tailwind.confing.js
```

Se trata de una API creada en Django la cual se consultada a través del frontend realizado en React.

Para iniciar el proyecto es necesario tener una base de datos MySQL con el nombre **crmdb**. Django está configurado con la base de datos MySQL de Xampp. Si posee otra base de datos por favor configurarla en **settings.py** de Django.

## Ejecutar
 
Primero debemos entrar en:

```bash
  crm_frontend/
  └── crm_cliente
```

Donde instalaremos las dependencias requeridas para ejecutar el frontend.

```bash
  npm install
```

Una vez instalado podemos ejecutarlo.

```bash
  npm run start
```

Ahora ejecutaremos el backend.

```bash
  crm_backend/
  ├── crm_api/
  ├── crm_env/
  ├── crm_proyecto/
  └── manage.py
```

Una vez en el directorio crm_backend ejecutaremos el entorno virtual:

```bash
  crm_env/Scripts/activate.bat
```

Una vez estemos en el entorno virtual ejecutaremos las migraciones para llenar la base de datos con las tablas necesarias para el proyecto.

```bash
  py manage.py makemigrations
  py manage.py migrate
```

Ya con esto finalizado podemos llenar las tablas con unos ejemplos importando el archivo
**db_ejemplos.sql** en nuestra base de datos.

Ahora iniciamos el backend:

```bash
  py manage.py runserver
```

Con esto realizado ya estaría funcionando el proyecto.

El frontend se encuentra alojado en:

 - [localhost:3000](http://localhost:3000/)

Mientras que el backend:

 - [localhost:8000](http://localhost:3000/)

Y ya está.

![Prospectos](https://i.imgur.com/aGWoRbx.png)

## Para finalizar

He desplegado la misma aplicación con Docker en otro repositorio:

[Github Prospecto-API Docker](https://github.com/thLaurence/prueba-arkenco-docker)