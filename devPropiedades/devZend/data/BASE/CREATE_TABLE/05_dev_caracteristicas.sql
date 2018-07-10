/*Table structure for table `dev_caracteristicas` */

DROP TABLE IF EXISTS `dev_caracteristicas`;

CREATE TABLE `dev_caracteristicas` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave Primaria pk',
  `co_const` int(11) DEFAULT NULL COMMENT 'Campo Clave Foranea',
  `delegacion` varchar(150) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'Campo Delegacion',
  `colonia` varchar(150) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'campo colonia',
  `calle` varchar(150) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'campo calle',
  `postal` varchar(20) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'campo codigo postal',
  `fecha_update` datetime DEFAULT NULL COMMENT 'campo fecha ultima update',
  `co_user` int(11) DEFAULT NULL COMMENT 'Campo Clave Foranea',
  PRIMARY KEY (`codigo`),
  KEY `fks_dev_carac` (`co_const`),
  CONSTRAINT `fks_dev_carac` FOREIGN KEY (`co_const`) REFERENCES `dev_caracteristicas` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci COMMENT='Permite administrar las caracteristicas de la construcciones';
