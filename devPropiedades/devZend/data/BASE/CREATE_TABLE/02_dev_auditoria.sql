DROP TABLE IF EXISTS `dev_auditoria`;

CREATE TABLE `dev_auditoria` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo Clave Foranea',
  `nom_accion` varchar(150) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'Campo Nombre accion',
  `fecha_update` datetime DEFAULT NULL COMMENT 'Campo fecha update',
  `co_user` int(11) DEFAULT NULL COMMENT 'campo foraneo',
  `valores` varchar(250) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'Campo registrados',
  `ip` varchar(50) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'Ip de la maquina',
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci COMMENT='permite registrar los cambios en el sistema ';
