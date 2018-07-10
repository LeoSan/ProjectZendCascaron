/*Table structure for table `dev_user` */

DROP TABLE IF EXISTS `dev_user`;

CREATE TABLE `dev_user` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave Foranea Tabla',
  `nom_user` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo Nombre usuario',
  `ape_user` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo Apellido Usuario',
  `pass_user` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo Pass usuario',
  `correo_user` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo Cuenta == Correo',
  `tipo_user` varchar(3) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo Tipo Usuario',
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='permite administrar los usuarios del sistema ';
