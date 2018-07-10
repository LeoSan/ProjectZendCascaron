<?php
require_once "Zend/Registry.php";
class Controlactivos_IndexController extends Zend_Controller_Action
{
    public $model = "";

    public function init(){
        $this->model = new Controlactivos_Model_Activos();
        $this->view->baseUrl = $this->getRequest()->getBaseUrl();
        session_start();
    }

//VIEW ************* ACCIONES DE VISTAS

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company Pendulum C.V
     * @deprecated Genera Interfaz
     * @access public
     *
     */
    public function viewInventarioAction()
    {
        $this->_helper->layout->setLayout('dev');
    }


    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company ----
     * @deprecated Genera Interfaz Login 
     * @access public
     *
     */
    public function viewLoginAction()
    {
        $this->_helper->layout->setLayout('dev');
    }

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company ----
     * @deprecated Genera Interfaz Login 
     * @access public
     *
     */
    public function viewMapAction()
    {
        $this->_helper->layout->setLayout('dev');
    }

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company ----
     * @deprecated Genera Interfaz Login 
     * @access public
     *
     */
    public function viewUsuarioAction()
    {
        $this->_helper->layout->setLayout('dev');
    }

	
	/**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company ----
     * @deprecated Genera Interfaz Login 
     * @access public
     *
     */
    public function viewAuditoriaAction()
    {
        $this->_helper->layout->setLayout('dev');
    }


	





    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company Pendulum C.V
     * @deprecated Genera Interfaz
     * @access public
     *
     */
    public function viewAdminActivoAction()
    {
        $this->_helper->layout->disabledLayout();
        //$this->_helper->layout->setLayout('quantum');
        $activoModel = new Controlactivos_Model_Activos();
        $param = $this->getRequest()->getParams();
        //Obtengo los Catalagos
        $param['tipoCatalogo'] = 'TIPO_ACTIVO';
        $this->view->TIPO_ACTIVO = $activoModel->parseoJsonCatalogo($param, 1);
        $param['tipoCatalogo'] = 'TIPO_ASIGNACION';
        $this->view->TIPO_ASIGNACION = $activoModel->parseoJsonCatalogo($param, 1);
        $param['tipoCatalogo'] = 'ESTADO_FISICO';
        $this->view->ESTADO_FISICO = $activoModel->parseoJsonCatalogo($param, 1);
        $param['tipoCatalogo'] = 'CATEGORIA_ACTIVO';
        $this->view->CATEGORIA = $activoModel->parseoJsonCatalogo($param, 1);
        $this->view->PROVEEDOR = $activoModel->parseoJsonProveedor( 1 );
        $this->view->SUCURSAL = $activoModel->parseoJsonSucursal($param);

    }

   
   



    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company Pendulum C.V
     * @deprecated Permite obtener el Json para el datatable de Proveedores
     * @access public
     *
     */
    public function obtenerJsonProveedorAction()
    {
        $activoModel = new Controlactivos_Model_Activos();
        $arregloTemp = $activoModel->parseoJsonProveedor();
        echo $arregloTemp;
        exit();

    }

       

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company Pendulum C.V
     * @deprecated Genera Interfaz
     * @access public
     *
     */
    public function obtenerAutoCompletePersonalAction()
    {
        $activoModel = new Controlactivos_Model_Activos();
        $params = $this->getRequest()->getParams();
        $arregloTemp = $activoModel->obtenerAutoPersonal($params, 'json');
        echo $arregloTemp;
        exit();

    }






//PROCESAR ************* Acciones de Registrar, Editar, Deshabilitar

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company Pendulum C.V
     * @deprecated Permite tratar la información del formulario proveedor en las tres acciones posibles Registrar, Editar, Deshabilitar
     * @access public
     *
     */
    public function procesarProveedorAction()
    {
        $activoModel = new Controlactivos_Model_Activos();
        $params = $this->getRequest()->getParams();
        $arregloTemp = $activoModel->procesarProveedor($params);
        echo $arregloTemp;
        exit();

    }



    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company Pendulum C.V
     * @deprecated Permite tratar la información del formulario proveedor en las tres acciones posibles Registrar, Editar, Deshabilitar
     * @access public
     *
     */
    public function procesarUploadCsvAction()
    {
        try{
            $this->_helper->layout->disableLayout();
            // Define a destination
            $targetFolder =  $_SERVER['DOCUMENT_ROOT']  .  $this->getRequest()->getBaseUrl()."/doc/cargacsv/activo/";
            $fechaFile = date("YmdHis");
            if (!empty($_FILES)) {
                $tempFile = $_FILES['file_csv']['tmp_name'];
                $targetPath = $targetFolder;
                // Validate the file type
                $fileTypes = array('CSV', 'csv'); // File extensions
                $fileParts = pathinfo($_FILES['file_csv']['name']);

                $nombreArchivo = "CARGA_MASIVA_ACTIVO_" . $fechaFile . "." . $fileParts['extension'];
                $targetFile = rtrim($targetPath,'/') . "/".$nombreArchivo;

                if ( in_array( strtolower( $fileParts['extension'] ) , $fileTypes ) ) {

                    $up = move_uploaded_file($tempFile,$targetFile);
                    if( !$up ){
                        throw new Exception("No se pudo mover el archivo: " . $targetFile);
                        $result['valida'] = 'false';
                        $result['msg'] = "No se pudo mover el archivo: " . $targetFile;
                        echo json_encode($result); die();
                    }else{
                        $result['valida'] = 'true';
                        $result['nom'] = $nombreArchivo;
                        $result['url'] = $targetFile;
                        echo json_encode($result); die();
                    }

                } else {
                    $result['valida'] = 'false';
                    echo json_encode($result);
                    die();
                }
            } else {
                $result['valida'] = 'false';
                echo json_encode($result);
                die();
            }
        } catch( Exception $e) {
            $result['valida'] = 'false';
            $result['msg'] = "Excepción: " . $e->getMessage();
            echo json_encode($result); die();
        }
    }

   

    /**
     * @author Leonard Cuenca <cuenca623@gmail.com>
     * @company Pendulum C.V
     * @deprecated Permite tratar la información del formulario proveedor en las tres acciones posibles Registrar, Editar, Deshabilitar
     * @access public
     *
     */
    public function pingAction()
    {
        $ip = "doc.pendulum.com.mx";
        $output = shell_exec("ping $ip");

        if (strpos($output, "recibidos = 0")) {
            $resp = 'No Conectado';
        } else {
            $resp = 'Conectado';
        }
        echo $resp;
        exit();
    }

}//fin del controlador