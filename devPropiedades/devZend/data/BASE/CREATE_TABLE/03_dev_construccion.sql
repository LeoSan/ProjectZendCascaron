DROP TABLE IF EXISTS `dev_construccion`;

CREATE TABLE `dev_construccion` (
  `codigo` int(11) NOT NULL COMMENT 'Clave Primaria',
  `nom_const` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo nombre construccion',
  `clave_consts` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo clave construcción',
  `des_consts` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo descripción',
  `fecha_update` datetime DEFAULT NULL COMMENT 'Campo Fecha update',
  `co_user` int(11) DEFAULT NULL COMMENT 'Campo Clave foranea',
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Permite administrar las construcciones ';
