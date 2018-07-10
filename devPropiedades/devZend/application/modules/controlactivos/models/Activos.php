<?php

class Controlactivos_Model_Activos
{

//Get  ***** Métodos de Obtener

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite obtener todos los usuarios activos
     * @access public
     *
     */
    public function getAllUsuarios($typeResponses, $datos)
    {
        $query = "BEGIN PENDUPM.PCKACTIVOS.getUSUARIOS('%" . strtoupper($datos['term']) . "%', :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result = $dbmysqlFactory->getAll($query);
        if($typeResponses==1){
            return $result;
        }else{
            return json_encode($result);
        }
        return $result;
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite obtener el Json o Arreglo de los datos del catalogo del proveedor
     * @access public
     *
     */
    public function parseoJsonProveedor($type = 0){
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerProveedor(:RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result['data'] = $dbmysqlFactory->getAll($query);

        if ($type == 0){
            foreach ($result['data'] as $key => $filas){
                $generaData = " data-NOM_PROVEEDOR = '".$filas['NOM_PROVEEDOR']."'";
                $generaData .= "  data-DES_PROVEEDOR = '".$filas['DES_PROVEEDOR']."'";
                $generaData .= "  data-ESTATUS = '".$filas['ESTATUS']."'";
                $generaData .= "  data-NUM_CREDITO = '".$filas['NUM_CREDITO']."'";
                $result['data'][$key]['ACCION']  = ($this->metodoGeneraBoton($filas['ID_PROVEEDOR'], $generaData, $filas['ESTATUS']));
            }
            return json_encode($result);
        }else{
            return $result;
        }

    }
    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite obetner el arreglo de los datos de catalogo de sucursal
     * @access public
     *
     */
    public function parseoJsonSucursal($param){
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerSucursal(".$param['idempleado'].", :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result['data'] = $dbmysqlFactory->getAll($query);
        return $result;

    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite obtener el Json o Arreglo de los datos de las categorias
     * @access public
     *
     */
    public function parseoJsonCatalogo($param, $type = 0)
    {
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerCategoria('".$param['tipoCatalogo']."', :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result['data'] = $dbmysqlFactory->getAll($query);

        foreach ($result['data'] as $key => $filas){
            $generaData = " data-NOM_CATEGORIA = '".$filas['NOM_CATEGORIA']."'";
            $generaData .= "  data-DESC_CATEGORIA = '".$filas['DESC_CATEGORIA']."'";
            $generaData .= "  data-ESTATUS = '".$filas['ESTATUS']."'";
            $result['data'][$key]['ACCION']  = ($this->metodoGeneraBoton($filas['ID_CACT_CATEGORIA'], $generaData, $filas['ESTATUS']));
        }
        if ($type == 0 ){
            return json_encode($result);
        }else{
            return $result['data'];
        }

    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V Permite obtener el Json o Arreglo de las asignaciones de las categorias de los usuarios
     * @description Permite obtener el Json o Arreglo del perfil de acceso a las categorias
     * @access public
     *
     */
    public function parseoJsonCategoriaPerfil($param, $type = 0)
    {
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerCatPerfil('".$param['tipoCatalogo']."', ".$param['idSolicitante'].", :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result['data'] = $dbmysqlFactory->getAll($query);

        foreach ($result['data'] as $key => $filas){
            $generaData = " data-NOM_CATEGORIA = '".$filas['NOM_CATEGORIA']."'";
            $generaData .= "  data-DESC_CATEGORIA = '".$filas['DESC_CATEGORIA']."'";
            $generaData .= "  data-ESTATUS = '".$filas['ESTATUS']."'";
            $result['data'][$key]['ACCION']  = ($this->metodoGeneraBoton($filas['ID_CACT_CATEGORIA'], $generaData, $filas['ESTATUS']));
        }
        if ($type == 0 ){
            return json_encode($result);
        }else{
            return $result['data'];
        }

    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description  Permite obtener el Json de los activos para mostrarlo en los select
     * @access public
     *
     */
    public function obtenerListaActivo($params){
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerListaActivo( '".$params['ID_CATEGORIA']."', '".$params['REFERENCIA']."', :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result = $dbmysqlFactory->getAll($query);
        $arrays = array();
        $arrays[0] = array("ID_CACT_CATEGORIA"=> 0,"NOM_CATEGORIA"=> "[Seleccione ]");
        foreach ($result as $key=>$filas){
            $arrays[$key+1] = array("ID_CACT_CATEGORIA"=> $filas['ID_CACT_CATEGORIA'],"NOM_CATEGORIA"=> $filas['NOM_CATEGORIA']);
        }
        return json_encode($arrays);
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite obtener los activos y los en lista para mostrarlos en el data table
     * @access public
     *
     */
    public function parseoJsonAdminActivo($params){
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerActivo(".$params['inpTipoActivo'].", ".$params['inpIdUsuario'].", :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result['data'] = $dbmysqlFactory->getAll($query);

        foreach ($result['data'] as $key => $filas){
            $generaData = " data-ID_ACTIVO = '".$filas['ID_ACTIVO']."'";
            $generaData .= "  data-ID_ESTADO_FISICO = '".$filas['ID_ESTADO_FISICO']."'";
            $generaData .= "  data-ID_TIPO_ACTIVO = '".$filas['ID_TIPO_ACTIVO']."'";
            $generaData .= "  data-ID_TIPO_ASIGNACION = '".$filas['ID_TIPO_ASIGNACION']."'";
            $generaData .= "  data-ID_PROVEEDOR = '".$filas['ID_PROVEEDOR']."'";
            $generaData .= "  data-ID_SUCURSAL = '".$filas['ID_SUCURSAL']."'";
            $generaData .= "  data-ID_TIPO_UBICACION = '".$filas['ID_TIPO_UBICACION']."'";
            $generaData .= "  data-MARCA = '".$filas['MARCA']."'";
            $generaData .= "  data-MODELO = '".$filas['MODELO']."'";
            $generaData .= "  data-COD_BARRA = '".$filas['COD_BARRA']."'";
            $generaData .= "  data-NUM_SERIE = '".$filas['NUM_SERIE']."'";
            $generaData .= "  data-FECHA_COMPRA = '".$filas['FECHA_COMPRA']."'";
            $generaData .= "  data-FECHA_COMPRA_ORI = '".$filas['FECHA_COMPRA_ORI']."'";
            $generaData .= "  data-NUM_FACTURA = '".$filas['NUM_FACTURA']."'";
            $generaData .= "  data-DESC_ACTIVO = '".$filas['DESC_ACTIVO']."'";
            $generaData .= "  data-ESTATUS = '".$filas['ESTATUS']."'";
            $generaData .= "  data-TIPO_ACTIVO = '".$filas['TIPO_ACTIVO']."'";
            $generaData .= "  data-TIPO_ASIGNACION = '".$filas['TIPO_ASIGNACION']."'";
            $generaData .= "  data-ESTADO_FISICO = '".$filas['ESTADO_FISICO']."'";
            $generaData .= "  data-PROVEEDOR = '".$filas['PROVEEDOR']."'";
            $generaData .= "  data-SUCURSAL = '".$filas['SUCURSAL']."'";
            $generaData .= "  data-TIPO_UBICACION = '".$filas['TIPO_UBICACION']."'";
            $generaData .= "  data-PISO = '".$filas['PISO']."'";
            $generaData .= "  data-NOM_UBICACION = '".$filas['NOM_UBICACION']."'";
            $generaData .= "  data-FECHA_COMPRA = '".$filas['FECHA_COMPRA']."'";
            $generaData .= "  data-CATEGORIA = '".$filas['ID_CATEGORIA']."'";
            $result['data'][$key]['ACCION']  = ($this->metodoGeneraBoton($filas['ID_ACTIVO'], $generaData, $filas['ESTATUS']));
        }
        return json_encode($result);
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite obtener listado de los activos para mostrarlos en un select
     * @access public
     *
     */
    public function obtenerActivo($params){
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerActivo(".$params['inpTipoActivo'].", ".$params['inpIdUsuario'].", :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result = $dbmysqlFactory->getAll($query);

        $arrays = array();
        $arrays[0] = array("ID_ACTIVO"=> 0,"NOMBRE"=> "[Seleccione ]");
        foreach ($result as $key=>$filas){
            $arrays[$key+1] = array("ID_ACTIVO"=> $filas['ID_ACTIVO'],"NOMBRE"=> $filas['MARCA']." - ".$filas['MODELO']." - ".$filas['COD_BARRA']);
        }
        return json_encode($arrays);
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite obtener el Json de las solicitides del usuario final
     * @access public
     *
     */
    public function parseoJsonSolicitud($params)
    {
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerSolicitud('".$params['idSolicitud']."', '".$params['idEstatus']."',  :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result['data'] = $dbmysqlFactory->getAll($query);

        foreach ($result['data'] as $key => $filas){
            $generaData = " data-ID_TRACKING = '".$filas['ID_TRACKING']."'";
            $generaData .= "  data-ID_ACTIVO = '".$filas['ID_ACTIVO']."'";
            $generaData .= "  data-ID_SOLICITANTE = '".$filas['ID_SOLICITANTE']."'";
            $generaData .= "  data-ID_ESTATUS = '".$filas['ID_ESTATUS']."'";
            $generaData .= "  data-ID_MOTIVO = '".$filas['ID_MOTIVO']."'";
            $generaData .= "  data-CANTIDAD = '".$filas['CANTIDAD']."'";
            $generaData .= "  data-FECHA_SOLICITUD = '".$filas['FECHA_SOLICITUD_FORMATO']."'";
            $generaData .= "  data-MOTIVO_SOLICITUD = '".$filas['MOTIVO_SOLICITUD']."'";
            $generaData .= "  data-TIPO_ACTIVO = '".$filas['TIPO_ACTIVO']."'";
            $generaData .= "  data-NOM_ESTATUS = '".$filas['NOM_ESTATUS']."'";
            $generaData .= "  data-NOM_SOLICITANTE = '".$filas['NOM_SOLICITANTE']."'";
            $generaData .= "  data-MARCA = '".$filas['MARCA']."'";
            $generaData .= "  data-MODELO = '".$filas['MODELO']."'";
            $generaData .= "  data-COD_BARRA = '".$filas['COD_BARRA']."'";
            $generaData .= "  data-NUM_SERIE = '".$filas['NUM_SERIE']."'";
            $generaData .= "  data-FECHA_COMPRA = '".$filas['FECHA_COMPRA']."'";
            $generaData .= "  data-NUM_FACTURA = '".$filas['NUM_FACTURA']."'";
            $generaData .= "  data-DESC_ACTIVO = '".$filas['DESC_ACTIVO']."'";
            $generaData .= "  data-ESTADO_FISICO = '".$filas['ESTADO_FISICO']."'";
            $generaData .= "  data-CATEGORIA_ACTIVO = '".$filas['CATEGORIA_ACTIVO']."'";
            $generaData .= "  data-SUCURSAL = '".$filas['SUCURSAL']."'";
            $generaData .= "  data-NOM_PROVEEDOR = '".$filas['NOM_PROVEEDOR']."'";
            $result['data'][$key]['FECHA_SOLICITUD']  = $filas['FECHA_SOLICITUD_FORMATO'];
            $result['data'][$key]['ACCION']  = ($this->metodoGeneraBotonSolicitud($filas['ID_TRACKING'], $generaData, $filas['ID_ESTATUS'], $params['perfil']));
        }
        return json_encode($result);
    }
    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite obtener el Json o Arreglo de las solicitudes de los usuarios
     * @access public
     *
     */
    public function parseoJsonSolicitudAdmin($params){
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerSolicitudAdmin('".$params['idSolicitud']."',  '".$params['idEstatus']."', :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result['data'] = $dbmysqlFactory->getAll($query);

        foreach ($result['data'] as $key => $filas){
            $generaData = "   data-ID_TRACKING = '".$filas['ID_TRACKING']."'";
            $generaData .= "  data-ID_ACTIVO = '".$filas['ID_ACTIVO']."'";
            $generaData .= "  data-ID_SOLICITANTE = '".$filas['ID_SOLICITANTE']."'";
            $generaData .= "  data-ID_ESTATUS = '".$filas['ID_ESTATUS']."'";
            $generaData .= "  data-ID_MOTIVO = '".$filas['ID_MOTIVO']."'";
            $generaData .= "  data-CANTIDAD = '".$filas['CANTIDAD']."'";
            $generaData .= "  data-FECHA_SOLICITUD = '".$filas['FECHA_SOLICITUD']."'";
            $generaData .= "  data-MOTIVO_SOLICITUD = '".$filas['MOTIVO_SOLICITUD']."'";
            $generaData .= "  data-TIPO_ACTIVO = '".$filas['TIPO_ACTIVO']."'";
            $generaData .= "  data-NOM_ESTATUS = '".$filas['NOM_ESTATUS']."'";
            $generaData .= "  data-NOM_SOLICITANTE = '".$filas['NOM_SOLICITANTE']."'";
            $result['data'][$key]['ACCION']  = ($this->metodoGeneraBotonSolicitud($filas['ID_TRACKING'], $generaData, $filas['ID_ESTATUS'], $params['perfil']));
        }
        return json_encode($result);
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite obtener el valor de la bitacora o etapas de la solicitudes
     * @access public
     *
     */
    public function obtenerBitacora($params)
    {
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerBitacora(".$params['idTracking'].", :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result['data'] = $dbmysqlFactory->getAll($query);
        return $this->formarCeldas($result['data'], $params);
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite obtener el Json de los estatus del sistema para mostrarlos en un select
     * @access public
     *
     */
    public function obtenerEstatus($params)
    {
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerCatalogoEstatusSistema('".$params['referencia']."',".$params['valida'].",'".$params['estatus']."', :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result = $dbmysqlFactory->getAll($query);
        $arrays = array();
        $arrays[0] = array("ID_ESTATUS"=> 0,"NOM_ESTATUS"=> "[Seleccione ]");
        foreach ($result as $key=>$filas){
            $arrays[$key+1] = array("ID_ESTATUS"=> $filas['ID_ESTATUS'],"NOM_ESTATUS"=> $filas['NOM_ESTATUS']);
        }
        return json_encode($arrays);
    }


    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite obtener el Json o Arreglo de las sucursales de Pendulum
     * @access public
     *
     */
    public function obtenerSucursal($params, $type)
    {
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerSucursalAdmin(".$params['idSolicitante'].", :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result = $dbmysqlFactory->getAll($query);
        $arrays = array();
        $arrays[0] = array("CVEUBICACION"=> 0,"NMSUCURSAL"=> "[Seleccione ]");
        foreach ($result as $key=>$filas){
            $arrays[$key+1] = array("CVEUBICACION"=> $filas['CVEUBICACION'] , "NMSUCURSAL"=> $filas['NMSUCURSAL']);
        }
        if ($type == 0 ){
            return json_encode($arrays);
        }else{
            return $arrays;
        }
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite listar las asignaciones de usuario y sus sucursales.
     * @access public
     *
     */
    public function obtenerAdminUsuSucursal()
    {
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerAdminUsuSucursal(:RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result['data'] = $dbmysqlFactory->getAll($query);

        foreach ($result['data'] as $key => $filas){
            $generaData = "   data-ID_CVETRA = '".$filas['ID_CVETRA']."'";
            $generaData .= "  data-NOMBRE = '".$filas['NOMBRE']."'";
            $generaData .= "  data-ID_SUCURSAL = '".$filas['ID_SUCURSAL']."'";
            $generaData .= "  data-NMSUCURSAL = '".$filas['NMSUCURSAL']."'";
            $result['data'][$key]['NMSUCURSAL2']  = ($this->metodoFormatoNomSucursal($filas['NMSUCURSAL']));
            $result['data'][$key]['ACCION']  = ($this->metodoGeneraBotonUsuSucursal($filas['ID_CVETRA'], $generaData));
        }
        return json_encode($result);
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite obtener el Json o Arreglo de todos los empleados del Pendulum
     * @access public
     *
     */
    public function obtenerPersonal($params, $type)
    {
        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerPersonal('".$params['idSucursal']."', '', :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result = $dbmysqlFactory->getAll($query);
        $arrays = array();
        $arrays[0] = array("CVETRA"=> 0,"NOMBRE"=> "[Seleccione ]");
        foreach ($result as $key=>$filas){
            $arrays[$key+1] = array("CVETRA"=> $filas['cvetra'] , "NOMBRE"=> $filas['nombreCompleto']);
        }
        if ($type == 0 ){
            return json_encode($arrays);
        }else{
            return $arrays;
        }
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite obtener el Json  de los empleados filtrados por sucursal para mostrarlo en un select
     * @access public
     *
     */
    public function obtenerAutoPersonal($params, $type)
    {

        $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.obtenerPersonal('', '".$params['empleado']."', :RESDATA); END;";
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $result = $dbmysqlFactory->getAll($query);
        $arrays = array();
        foreach ($result as $key=>$filas){
            $arrays[$key] = array("id"=> $filas['cvetra'] , "value"=> $filas['nombreCompleto']);
        }
            return json_encode($arrays);
    }

//Insert - Edit - Deshabilitar ***** Métodos Registrar

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite insertar los valores en la tabla ->ACTPROVEEDOR
     * @access public
     *
     */
    public function procesarProveedor($params){
        //Valido y proceso
        if ($params['inptProceso'] == 'Guardar') {
            $query  = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.insertProveedor('".strtoupper($params['inpNombre'])."', '".strtoupper($params['inpDes'])."', '".strtoupper($params['inpCredito'])."', :psError);END;";
        } else if($params['inptProceso'] == 'Editar') {
            $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.editProveedor(" . strtoupper($params['inpId']) . ", '" . strtoupper($params['inpNombre']) . "', '" . strtoupper($params['inpDes']) . "', '" . strtoupper($params['inpCredito']) . "', :psError);END;";
        }else{
            $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.deshabilitarProveedor(" . strtoupper($params['inpId']) . ", :psError);END;";
        }
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $typeResponses = $dbmysqlFactory->set($query);
        return $this->metodoResultado($typeResponses);

    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite procesar los datos de los diferentes catalgos ->CACT_CATEGORIA
     * @access public
     *
     */
    public function procesarCatalogo($params){

        if ($params['inptProceso'] == 'Guardar') {
            $query  = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.insertCatalogo('".strtoupper($params['inpNombre'])."', '".strtoupper($params['inpDes'])."', '".strtoupper($params['inpTipoCatalogo'])."', :psError);END;";
        } else if($params['inptProceso'] == 'Editar') {
            $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.editCatalogo(" . strtoupper($params['inpId']) . ", '" . strtoupper($params['inpNombre']) . "', '" . strtoupper($params['inpDes']) . "',  :psError);END;";
        }else{
            $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.deshabilitarCatalogo(" . strtoupper($params['inpId']) . ", :psError);END;";
        }
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $typeResponses = $dbmysqlFactory->set($query);
        return $this->metodoResultado($typeResponses);

    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite insertar los valores en la tabla ->CACTIVOMAIN
     * @access public
     *
     */
    public function procesarAdminActivo($params){
        if ($params['inptProceso'] == 'Guardar') {
            $params['inpNombreUbiacion'] = 0;
            $query  = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.insertActivo(".strtoupper($params['inpCategoria']).",".strtoupper($params['inpTipoActivo']).",".strtoupper($params['inpEstadoFisico']).",".strtoupper($params['inpTipoAsignacion']).",".strtoupper($params['inpProveedor']).",".strtoupper($params['inpSucursal']).",".strtoupper($params['inpNombreUbiacion']).",  '".strtoupper($params['inpMarca'])."', '".strtoupper($params['inpModelo'])."', '".strtoupper($params['inpCodBarra'])."', '".strtoupper($params['inpNumSerie'])."', '".strtoupper($params['inpFechaCompra'])."', '".strtoupper($params['inpNumFactura'])."','".strtoupper($params['inpDes'])."',  :psError);END;";
        } else if($params['inptProceso'] == 'Editar') {
            $params['inpNombreUbiacion'] = 0;
            $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.editActivo(".strtoupper($params['inpId']).",".strtoupper($params['inpCategoria']).",".strtoupper($params['inpTipoActivo']).",".strtoupper($params['inpEstadoFisico']).",".strtoupper($params['inpTipoAsignacion']).",".strtoupper($params['inpProveedor']).",".strtoupper($params['inpSucursal']).",".strtoupper($params['inpNombreUbiacion']).",  '".strtoupper($params['inpMarca'])."', '".strtoupper($params['inpModelo'])."', '".strtoupper($params['inpCodBarra'])."', '".strtoupper($params['inpNumSerie'])."', '".strtoupper($params['inpFechaCompra'])."', '".strtoupper($params['inpNumFactura'])."','".strtoupper($params['inpDes'])."', :psError);END;";
        }else{
            $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.deshabilitarActivo(" . strtoupper($params['inpId']) . ", :psError);END;";
        }
        //    echo $query; exit;
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $typeResponses = $dbmysqlFactory->set($query);
        return $this->metodoResultado($typeResponses);

    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite insertar los valores en la tabla ->ACTPROVEEDOR
     * @access public
     *
     */
    public function procesarCargaAdminActivo($query){
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $typeResponses = $dbmysqlFactory->set($query);
        return $this->metodoResultado($typeResponses);
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite insertar los valores en la tabla ->CACT_TRACKING
     * @access public
     *
     */
    public function procesarSolicitud($params){

        if ($params['inptProceso'] == 'Guardar') {
            $query  = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.insertSolicitud(".strtoupper($params['inpCategoria']).", ".strtoupper($params['inpTipoActivo']).",".strtoupper($params['inpSolicitante']).",".strtoupper($params['inpMotivo']).",".strtoupper($params['inpCantidad']).", '".strtoupper($params['inpDes'])."', :psError);END;";
        } else if($params['inptProceso'] == 'Estatus') {
            $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.insertSolicitudBitacora(" . strtoupper($params['inpIdTracking']) . ", " . strtoupper($params['inpSolicitante']) . ", '" . strtoupper($params['inpDes']) . "', ".strtoupper($params['inpEstatus']).", :psError);END;";
        }else if($params['inptProceso'] == 'EstatusAdmin') {
            $params['inpIdAdmin'] = $params['inpSolicitante'];
            if ( empty($params['inpActivo']) == true ){ $params['inpActivo'] = 0;}
            $query = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.insertSolicitudBitacoraAdmin(" . strtoupper($params['inpIdTracking']) . ", " . strtoupper($params['inpSolicitante']) . ", '" . strtoupper($params['inpDes']) . "', ".strtoupper($params['inpEstatus']).", ".strtoupper($params['inpActivo']).", ".strtoupper($params['inpIdAdmin']).", :psError);END;";
        }else if($params['inptProceso'] == 'Entrega'){
            $params['inpIdAdmin'] = $params['inpSolicitante'];
            $query  = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.insertSolicitudAdmin(".strtoupper($params['inpCategoriaRe']).", ".strtoupper($params['selTipoActivoRe']).",".strtoupper($params['inpPersonal']).",".strtoupper($params['inpMotivoRe']).",".strtoupper($params['inpCantidadRe']).", '".strtoupper($params['inpDes'])."', ".strtoupper($params['inpActivoRe']).", ".strtoupper($params['inpIdAdmin']).", :psError);END;";
        }
        $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
        $typeResponses = $dbmysqlFactory->set($query);
        // print_r($typeResponses); exit;

        return $this->metodoResultado($typeResponses);
    }
    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite insertar los valores en la tabla ->CACT_USU_SUCURSAL
     * @access public
     *
     */
    public function procesarAdminUsu($params){

        $arraysSucursal = explode(',', $params['inpSucursalAgrega'] );
        $query = '';

        if ($params['inptProceso'] == 'Guardar') {
            for ($i=0; $i<count($arraysSucursal); $i++){
                $query  = "BEGIN  PENDUPM.PCK_CONTROL_ACTIVOS.insertAdminUsuSucursal(".$params['inpCvetra'].", ".$arraysSucursal[$i].", :psError); END;";
                $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
                $typeResponses = $dbmysqlFactory->set($query);
            }
        }else if ($params['inptProceso'] == 'Editar'){
            $query  = "BEGIN PENDUPM.PCK_CONTROL_ACTIVOS.limpiarAdminSucursal(".$params['inpCvetra'].", :psError); END;";
            $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
            $dbmysqlFactory->set($query);

            for ($i=0; $i<count($arraysSucursal); $i++){
                $query  = "BEGIN  PENDUPM.PCK_CONTROL_ACTIVOS.insertAdminUsuSucursal(".$params['inpCvetra'].", ".$arraysSucursal[$i].", :psError); END;";
                $dbmysqlFactory = Pendum_Db_DbFactory::factory('dbmysql');
                $typeResponses = $dbmysqlFactory->set($query);
            }

        }
        return $this->metodoResultado($typeResponses);
    }



//Metodos  - Metodos del Modelo para facilitar operaciones

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company Neta System C.A
     * @description Permite generar una respuesta para Json
     * @access public
     *
     */
    public function metodoResultado($typeResponses){
        if($typeResponses==1){
            $result['valida'] = 'true';
        }else{
            $result['valida'] = 'false';
        }
        return json_encode($result);
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite generar botones para el apoyo de la vista
     * @access public
     *
     */
    public function metodoGeneraBoton($id, $generaData, $status){

        if ($status != 'DELETE'){
            $string  = "<span class='glyphicon glyphicon-pencil btnAccionEdit' data-id='".$id."' title='Editar este registro' data-toggle='modal' data-target='#form-bp1' ".$generaData." ></span>";
            $string .= "<span class='glyphicon glyphicon-remove btnAccionDel'  data-id='".$id."' title='Deshabilitar este registro' ></span>";
        }else{
            $string = "<span class='glyphicon glyphicon-eye-close'  data-id='".$id."' title='Registro deshabilitado'></span>";
        }
        return $string;
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite generar botones para el apoyo de la vista
     * @access public
     *
     */
    public function metodoGeneraBotonUsuSucursal($id, $generaData){
        $string  = "<span class='glyphicon glyphicon-pencil btnAccionUsuEdit btnAccionEdit' data-id='".$id."' title='Editar asignación de sucursal del usuario' data-toggle='modal' data-target='#form-bp1' ".$generaData." ></span>";
        return $string;
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite generar botones para el apoyo de la vista
     * @access public
     *
     */
    public function metodoGeneraBotonSolicitud($id, $generaData, $status, $perfil){
        $string = "<span class='glyphicon glyphicon-eye-open btnAccionBitacora' data-id='".$id."' title='Ver historico de la solicitud' data-toggle='modal' data-target='#modalBitacora' ></span>";
        //lOGICA - Estatus SOLICITUD -
        if ($status == 1 )
            $string .= "<span class='glyphicon glyphicon-pencil cssValSolicitud btnValEstatus'  data-id='".$id."' data-id_estatus='6' data-id_estatus_admin='2,3,4'  data-id_referencia='SYS_CONTROL_ACTIVOS' data-id_valida='1' title='Valida tu solicitud' data-toggle='modal' data-target='#form-bp2' ".$generaData." ></span>";
        //lOGICA - Estatus ACEPTADA ADMIN
        if ( ( $status == 3 || $status == 6 )  &&  $perfil == 'ADMIN' ){
            $string .= "<span class='glyphicon glyphicon-inbox cssValEntrega btnValEstatus'  data-id='".$id."' data-id_estatus='0' data-id_estatus_admin='2,4 ' data-id_referencia='SYS_CONTROL_ACTIVOS' data-id_valida='1' title='Valida tu entrega' data-toggle='modal' data-target='#form-bp2' ".$generaData." ></span>";
        }
        //lOGICA - Estatus ENTREGA
        if ($status == 4  &&  $perfil == 'USU' ){
            $string .= "<span class='glyphicon glyphicon-inbox cssValEntrega btnValEstatus'  data-id='".$id."' data-id_estatus='5,6' data-id_estatus_admin='0' data-id_referencia='SYS_CONTROL_ACTIVOS' data-id_valida='1' title='Valida tu entrega' data-toggle='modal' data-target='#form-bp2' ".$generaData." ></span>";
        }
        //lOGICA - Estatus ACEPTADA USUARIO
        if ($status == 5 &&  $perfil == 'USU'   )
            $string .= "<span class='glyphicon glyphicon-search cssValEntrega btnDetalle'  data-id='".$id."' title='Ver detalle del equipo' data-toggle='modal' data-target='#form-bp1' ".$generaData." ></span>";

        return $string;
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company PENDULUN  C.V
     * @description Permite generar botones para el apoyo de la vista
     * @access public
     *
     */
    public function formarCeldas($arrays, $params){
        $string = '';
        foreach ($arrays as $filas){

            if ($filas['NOM_ESTATUS'] == 'RECHAZADA POR ADMIN' || $filas['NOM_ESTATUS'] == 'RECHAZADA POR  USUARIO' ){  $nomEstuloText = 'text-danger'; }else{ $nomEstuloText = 'text-success';}
            if ($filas['SEXO'] == 'M' ){  $nomAvatar = 'avatar4.png'; }else{ $nomAvatar = 'avatar6.png';}
            $string .= "<tr>
                            <td class='text-center user-avatar'><img src='".$params['url']."/images/assets/img/".$nomAvatar."' alt='Avatar'><h5>".ucwords(strtolower($filas['NOM_SOLICITANTE']))."</h5></td>
                            <td class='text-left'><h6>".$filas['COMENTARIO']."</h6></td>
                            <td>".$filas['FECHA_FORMATO']."</td>
                            <td><span class='".$nomEstuloText."'> ".$filas['NOM_ESTATUS']." </span></td>
                        </tr>";
        }
        return $string;
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company Neta System C.A
     * @description Permite formatear la fecha
     * @access public
     *
     */
    public function metodoFormateoFecha($fechaOriginal){
        $fechaDesfrag = explode('-', $fechaOriginal);
        $arrayMeses = array('01'=>'ENE', '02'=>'FEB', '03'=>'MAR', '04'=>'ABR', '05'=>'MAY', '06'=>'JUL', '07'=>'JUN', '08'=>'AUG', '09'=>'SEP', '10'=>'OCT', '11'=>'NOV', '12'=>'DIC');
        $fechaFinal = $fechaDesfrag[0]."-".$arrayMeses[$fechaDesfrag[1]]."-".$fechaDesfrag[2];
        return $fechaFinal;
    }

    /**
     * @author Leonard Cuenca <ljcuenca@pendulum.com.mx>
     * @company Neta System C.A
     * @description Permite formatear los campos para anexar el nombre de una sucursal
     * @access public
     *
     */
    public function metodoFormatoNomSucursal($NombreSucursal){
        $arrNom = explode(',', $NombreSucursal);
        $string = '<ul class="list-group">';
        for ($i=0; $i < count($arrNom); $i++){
            $string .='<li class="list-group-item pCenter">'.$arrNom[$i].'</li>';
        }
        $string .='</ul>';
        return $string;
    }


}//fin del modelo
