<?php

class Controlactivos_Model_Perfiles
{

    public function getPerfilUsuario( $idempleado )
    {
        $query = "SELECT DISTINCT M.ID_MENU, M.NIVEL,M.ID_MENU_PADRE,M.ORDEN, NOMBRE, MODULO, CONTROLADOR, ACCION, M.ISHOME HOME
      FROM PENDUPM.CACT_PERFIL_USUARIO PU
 INNER JOIN PENDUPM.CACT_PERFILES P 
         ON PU.ID_PERFIL = P.ID_PERFIL
 INNER JOIN PENDUPM.CACT_PERFIL_ACCESO PA
         ON PA.ID_PERFIL_ACCESO = P.ID_PERFIL
 INNER JOIN PENDUPM.CACT_MENU M 
         ON PA.ID_MENU = M.ID_MENU
      WHERE SISTEMA = 'ACTIVOS' AND
            ( ISDEFAULT = 'S' OR PU.ID_EMPLEADO = 2665 )
   ORDER BY M.NIVEL,M.ID_MENU_PADRE,M.ORDEN";
        
        $Oracle = Pendum_Db_DbFactory::factory('oracle');
        $result = $Oracle->query($query);
        return $result;
    }

}