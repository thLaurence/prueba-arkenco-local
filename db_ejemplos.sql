-- Tabla Prospectos

INSERT INTO `crm_api_prospecto` (`id`, `nombre`, `email`, `telefono`, `fecha_ingreso`, `sexo`, `cliente_id_id`, `estado_id_id`, `etapa_id_id`) VALUES
(1, 'Prospecto1', 'prospecto1@gmail.com', '11111111', '2023-06-07', 'Masculino', 1, 1, 2),
(2, 'Prospecto2', 'prospecto2@gmail.com', '2222222', '2023-06-13', 'Femenino', 2, 2, 2);


-- Tabla Etapa

INSERT INTO `crm_api_etapa` (`id`, `etapa`) VALUES
(1, 'En conversación'),
(2, 'Conseguido'),
(3, 'Perdido');

-- Tabla Estado

INSERT INTO `crm_api_estado` (`id`, `estado`) VALUES
(1, 'Abierto'),
(2, 'Perdido'),
(3, 'Ganado');

-- Tabla Clientes

INSERT INTO `crm_api_cliente` (`id`, `nombre_empresa`, `rut`, `direccion`, `telefono`) VALUES
(1, 'Arkenco', '100000000', 'Santiago', '963994652'),
(2, 'Cliente1', '200000000', 'Las Condes', '99999999');