DROP TABLE IF EXISTS `dev_galeria`;

CREATE TABLE `dev_galeria` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave Primaria Pk',
  `co_const` int(11) DEFAULT NULL COMMENT 'Clave foranea',
  `url_gale` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'Campo url foto',
  `nom_gale` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'campo nombre foto',
  `desc_gale` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL COMMENT 'campo descripcion foto',
  PRIMARY KEY (`codigo`),
  KEY `fks_dev_galeria` (`co_const`),
  CONSTRAINT `fks_dev_galeria` FOREIGN KEY (`co_const`) REFERENCES `dev_construccion` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Permite administrar la galeria de la construcciones';
