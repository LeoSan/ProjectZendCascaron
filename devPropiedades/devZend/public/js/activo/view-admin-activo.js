var procesarAdminActivo = {
    //Declaracion Variables
    EstruturaMesajeExito: '<div class="alert alert-success alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4>   </div>',
    EstruturaMesajeInfo: '<div class="alert alert-info alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajePeligro: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajeAdvertencia: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    mensajeExito01:  '! Almacenamiento exitoso de Datos ¡',
    mensajeExito02:  '! Carga masiva exitosa ¡',
    mensajeExito03:  '! Validacion exitosa del archivo ¡',
    mensajeExito04:  '! Carga exitosa del archivo ¡',
    mensajePeligro01:  '! Falla en el almacenamiento, intente mas tarde ¡',
    mensajePeligro02:  '!  Debe seleccionar categoría ¡',
    mensajePeligro03:  '!  Debe seleccionar tipo activo ¡',
    mensajePeligro04:  '!  Debe seleccionar asignación ¡',
    mensajePeligro05:  '!  Debe seleccionar estado¡',
    mensajePeligro06:  '!  Debe colocar marca ¡',
    mensajePeligro07:  '!  Debe colocar modelo ¡',
    mensajePeligro08:  '!  Debe colocar código barra ¡',
    mensajePeligro09:  '!  Debe colocar numero de serie ¡',
    mensajePeligro10:  '!  Debe seleccionar proveedor ¡',
    mensajePeligro11:  '!  Debe colocar fecha compra ¡',
    mensajePeligro12:  '!  Debe colocar número factura ¡',
    mensajePeligro13:  '!  Debe seleccionar sucursal ¡',

    mensajeAdvertencia02:'! Debe seleccionar un archivo ¡',
    mensajeAdvertencia03:'! Hubo Problema con la validacion, por favor revise el archivo CSV ¡',
    table:'',
    //Metodo Inicial
    init: function () {
        //cambios front-end
        procesarAdminActivo.calendario();
        procesarAdminActivo.changeCategoria();
        procesarAdminActivo.changeTipoActivo();
        procesarAdminActivo.changeTipoAsignacion();
        procesarAdminActivo.changeEstadoFisico();
        procesarAdminActivo.changeProveedor();
        procesarAdminActivo.changeSucursal();
        procesarAdminActivo.procesoLimpiar();
        procesarAdminActivo.procesoLimpiarCarga();

        //Procesos
        procesarAdminActivo.cargaDatos();
        procesarAdminActivo.procesoUpload();
        procesarAdminActivo.procesoCargaMasiva();
        procesarAdminActivo.procesoGuardado();
        procesarAdminActivo.procesoMuestra();

        //validaciones
        procesarAdminActivo.validaTeclado();
        procesarAdminActivo.validaDeshabilitar();


    },// fin init
    changeCategoria:function () {
        $(document).on("change", "#selCategoriaAc", function () {
            var valor = $("#selCategoriaAc option:selected").val();
            $("#inpCategoria").val(valor);
        });

    },
    changeTipoActivo:function () {
        $(document).on("change", "#selTipoActivoAc", function () {
            var valor = $("#selTipoActivoAc option:selected").val();
            $("#inpTipoActivo").val(valor);
        });

    },
    changeTipoAsignacion:function () {
        $(document).on("change", "#selTipoAsignacion", function () {
            var valor = $("#selTipoAsignacion option:selected").val();
            $("#inpTipoAsignacion").val(valor);
        });

    },
    changeEstadoFisico:function () {
        $(document).on("change", "#selEstadoFisico", function () {
            var valor = $("#selEstadoFisico option:selected").val();
            $("#inpEstadoFisico").val(valor);
        });

    },
    changeProveedor:function () {
        $(document).on("change", "#selProveedor", function () {
            var valor = $("#selProveedor option:selected").val();
            $("#inpProveedor").val(valor);
        });

    },
    changeSucursal:function () {
        $(document).on("change", "#selSucursal", function () {
            var valor = $("#selSucursal option:selected").val();
            $("#inpSucursal").val(valor);
        });

    },
    cargaDatos:function () {
        $(document).ready( function () {

            var inpIdUsuario = procesarAdminActivo.obtenerCvetra();
            procesarAdminActivo.table = $('#dt_tabla').DataTable( {
                processing: false, // esto permite realizar busqueda conectado con el servidor
                serverSide: false, // esto permite realizar busqueda conectado con el servidor
                ajax: {
                    url: baseUrl + "/controlactivos/index/obtener-json-admin-activo",
                    dataSrc: 'data',
                    type: "POST",
                    data: {
                        inpIdUsuario: inpIdUsuario, inpTipoActivo:0
                    }
                },
                columns: [
                    { data: "COD_BARRA",orderable: true, "width": "5%" },
                    { data: "NUM_SERIE",orderable: true, "width": "5%" },
                    { data: "MARCA",orderable: true, "width": "5%" },
                    { data: "MODELO",orderable: true, "width": "5%" },
                    { data: "SUCURSAL",orderable: true, "width": "5%" },
                    { data: "ACCION",orderable: false, "width": "5%" },
                ],
                language: {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "No se encontraron resultados",
                    "sEmptyTable": "Ningún dato disponible en esta tabla",
                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "sInfoThousands": ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": [
                        {
                            "sFirst": "Primero",
                            "sLast": "Ultimo",
                            "sNext": "Siguiente",
                            "sPrevious": "Anterior"
                        }
                    ],
                    "oAria": [
                        {
                            "sSortAscending": "Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": "UltiActivar para ordenar la columna de manera descendentemo"
                        }
                    ]
                },
                aaSorting: [[ 0, "desc" ]],

            } );

            //Permite agregar los campos para ser filtrados
            $('#dt_tabla thead th').each( function (i) {

                if (i < 5 ){
                    var title = $(this).text();
                    $(this).html( '<input type="text" class="form-control" placeholder=" '+title+'" />' );
                }
                /*  if (i == 6 ){
                 $(this).html( '<select id="selcEstatus"><option value="0">ESTATUS</option><option value="0">TODO</option><option value="ACEPTADA ADMIN">ACEPTADA ADMIN</option><option value="ACEPTADA USUARIO">ACEPTADA USUARIO</option><option value="ENTREGA">ENTREGA</option><option value="RECHAZADA POR  USUARIO">RECHAZADA POR  USUARIO</option><option value="RECHAZADA POR ADMIN POR  USUARIO">RECHAZADA POR  USUARIO</option><option value="SOLICITUD">SOLICITUD</option></select>');
                 }
                 */
            });

            //Define filtro de busqueda a los campos
            procesarAdminActivo.table.columns().every( function () {
                var that = this;
                $( 'input', this.header() ).on( 'keyup change', function () {
                    if ( that.search() !== this.value ) {
                        that.search( this.value ).draw();
                    }
                } );
            });

            //Define filtro de busqueda a los select
            // procesarAdminActivo.table.columns([6]).every( function () {
            //     var column = this;
            //     $( 'select', this.header() ).on( 'change', function () {
            //
            //         if ( $(this).val() == 'TODO'){
            //             procesarAdminActivo.table.ajax.reload();
            //         }else{
            //             var val = $.fn.dataTable.util.escapeRegex(
            //                 $(this).val()
            //             );
            //             column.search( val ? '^'+val+'$' : '', true, false ).draw();
            //         }
            //
            //     } );
            //     column.data().unique().sort().each( function ( d, j ) {
            //         $( 'select', this.header() ).append( '<option value="'+d+'">'+d+'</option>' )
            //     } );

            // });
            //Permite agregar los campos para ser filtrados

        } );

    },
    calendario:function () {
        $(document).ready( function () {
            $('.datepicker').datetimepicker({
                format: 'DD/MM/YYYY'
            });
        } );

    },
    procesoGuardado: function () {
        var validaCampos = $(function () {//esto permite convertir todo el validate en una funcion
            $("#formAdminActivo").validate({
                event: "blur",
                rules: {
                    inpDes: {
                        required: true
                    },
                },
                messages: {
                    inpDes: {
                        required: "Este campo es obligatorio.",
                    },
                }
                , debug: true
                , errorElement: "label"
                , submitHandler: function (form) {
                    //Valido Manualmente
                    if( $("#inpCategoria").val() == ""  || $("#inpCategoria").val() == "0" ){
                        var str = procesarAdminActivo.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajePeligro02);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }

                    if( $("#inpTipoActivo").val() == ""  ||  $("#inpTipoActivo").val() == "0"  ){
                        var str = procesarAdminActivo.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajePeligro03);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }
                    if( $("#inpTipoAsignacion").val() == ""  ||  $("#inpTipoAsignacion").val() == "0" ){
                        var str = procesarAdminActivo.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajePeligro04);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }

                    if( $("#inpEstadoFisico").val() == "" || $("#inpEstadoFisico").val() == "0"){
                        var str = procesarAdminActivo.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajePeligro05);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }

                    if( $("#inpMarca").val() == ""  ){
                        var str = procesarAdminActivo.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajePeligro06);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }

                    if( $("#inpModelo").val() == ""  ){
                        var str = procesarAdminActivo.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajePeligro07);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }

                    if( $("#inpCodBarra").val() == ""  ){
                        var str = procesarAdminActivo.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajePeligro08);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }

                    if( $("#inpNumSerie").val() == ""  ){
                        var str = procesarAdminActivo.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajePeligro09);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }

                    if( $("#inpProveedor").val() == ""  || $("#inpProveedor").val() == "0" ){
                        var str = procesarAdminActivo.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajePeligro10);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }


                    if( $("#inpFechaCompra").val() == ""  ){
                        var str = procesarAdminActivo.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajePeligro11);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }

                    if( $("#inpNumFactura").val() == ""  ){
                        var str = procesarAdminActivo.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajePeligro12);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }


                    if( $("#inpSucursal").val() == "" || $("#inpSucursal").val() == "0"  ){
                        var str = procesarAdminActivo.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajePeligro13);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }


                    var datosForm = $("#formAdminActivo").serializeArray();
                    $.ajax({
                        type: "POST",
                        url: baseUrl + "/controlactivos/index/procesar-admin-activo",
                        processData: true,
                        data: datosForm,
                        dataType: 'json',
                        success: function (data) {
                            procesarAdminActivo.metodoMensaje(data, 'btnGuardar', procesarAdminActivo.mensajeExito01, procesarAdminActivo.mensajePeligro01, 'msjRespuesta');
                        }
                    });
                },
                errorPlacement: function (error, element) {
                    error.insertBefore(element.parent().next('div').children().first());
                },
                highlight: function (element) {
                    $(element).parent().next('div').show();
                    $(element).parent().next('div').addClass("error");
                    $(element).parent().find('span').addClass('glyphicon-red');
                },
                unhighlight: function (element) {
                    //$(element).parent().next('div').hide();
                    $(element).parent().find('span').removeClass('glyphicon-red');
                }

            })//fin del validate
        });//Esto permite transformar el validate en una funcion y encapsularla en la clase
    },
    procesoMuestra: function () {
        $(document).on("click", ".btnAccionEdit", function () {

            var inpId = $(this).attr("data-id");
            var ID_ESTADO_FISICO = $(this).attr("data-ID_ESTADO_FISICO");
            var ID_TIPO_ACTIVO = $(this).attr("data-ID_TIPO_ACTIVO");
            var ID_TIPO_ASIGNACION = $(this).attr("data-ID_TIPO_ASIGNACION");
            var ID_PROVEEDOR = $(this).attr("data-ID_PROVEEDOR");
            var ID_SUCURSAL = $(this).attr("data-ID_SUCURSAL");
            var MARCA = $(this).attr("data-MARCA");
            var MODELO = $(this).attr("data-MODELO");
            var COD_BARRA = $(this).attr("data-COD_BARRA");
            var NUM_SERIE = $(this).attr("data-NUM_SERIE");
            var FECHA_COMPRA = $(this).attr("data-FECHA_COMPRA");
            var FECHA_COMPRA_ORI = $(this).attr("data-FECHA_COMPRA_ORI");
            var NUM_FACTURA = $(this).attr("data-NUM_FACTURA");
            var DESC_ACTIVO = $(this).attr("data-DESC_ACTIVO");
            var ID_TIPO_UBICACION = $(this).attr("data-ID_TIPO_UBICACION");
            var nomTipoUbicacion = $(this).attr("data-tipo_ubicacion");
            var nomPiso = $(this).attr("data-piso");
            var nomNomUbica = $(this).attr("data-nom_ubicacion");
            var ESTATUS = $(this).attr("data-ESTATUS");
            var FECHA_FORMATO = $(this).attr("data-FECHA_FORMATO");
            var CATEGORIA = $(this).attr("data-CATEGORIA");

            $("#inpId").val(inpId);

            $("#inpCategoria").val(CATEGORIA);
            $("#selCategoria").val(CATEGORIA);

            $("#inpTipoActivo").val(ID_TIPO_ACTIVO);
            $("#selTipoActivo").val(ID_TIPO_ACTIVO);

            $("#inpTipoAsignacion").val(ID_TIPO_ASIGNACION);
            $("#selTipoAsignacion").val(ID_TIPO_ASIGNACION);

            $("#inpEstadoFisico").val(ID_ESTADO_FISICO);
            $("#selEstadoFisico").val(ID_ESTADO_FISICO);


            $("#inpMarca").val(MARCA);
            $("#inpModelo").val(MODELO);
            $("#inpCodBarra").val(COD_BARRA);
            $("#inpNumSerie").val(NUM_SERIE);

            $("#inpProveedor").val(ID_PROVEEDOR);
            $("#selProveedor").val(ID_PROVEEDOR);

            $("#inpFechaCompra").val(FECHA_COMPRA_ORI);
            $("#inpNumFactura").val(NUM_FACTURA);

            $("#inpSucursal").val(ID_SUCURSAL);
            $("#selSucursal").val(ID_SUCURSAL);

            $("#inpUbicacion").val(nomTipoUbicacion);
            $( "#selUbicacion option:selected" ).text(nomTipoUbicacion);
            $( "#selUbicacion option:selected" ).val(nomTipoUbicacion);

            $("#inpPiso").val(nomPiso);
            $( "#selPiso option:selected" ).text(nomPiso);
            $( "#selPiso option:selected" ).val(nomPiso);

            $("#inpNombreUbiacion").val(ID_TIPO_UBICACION);
            $( "#selNomUbi option:selected" ).text(nomNomUbica);
            $( "#selNomUbi option:selected" ).val(ID_TIPO_UBICACION);

            $("#inpDes").val(DESC_ACTIVO);

            $("#bntTitulomodal").html("Editar activos");
            $("#inptProceso").val("Editar");
            $("#btnGuardar").html("Editar");
            $("#btnGuardar").removeAttr("disabled");
            $("#btnGuardar").removeClass("btn-success");
            $("#btnGuardar").addClass("btn-primary");
            $("#form-bp1").removeClass("colored-header-success");
            $("#form-bp1").addClass("colored-header-primary");

            $(".msjRespuesta").html("");

        });
    },
    validaDeshabilitar: function () {
        $(document).on("click", ".btnAccionDel", function () {
            var id = $(this).attr("data-id");
            procesarAdminActivo.modalMensaje('Confirmación', '¿ Está seguro de deshabilitar ?', id, 'btnAccionDel');

        });
    },
    procesoDeshabilitar: function (valor) {
        $.ajax({
            type: "POST",
            url: baseUrl + "/controlactivos/index/procesar-admin-activo",
            processData: true,
            dataType: 'json',
            data: {inptProceso: 'Deshabilitar', inpId: valor},
            success: function (data) {
                procesarAdminActivo.table.ajax.reload();
            }
        });

    },
    procesoUpload: function () {
        $(document).on("click", "#btnCargarMasiva", function () {
            var formData = new FormData();
            formData.append('file_csv', $('#file_csv')[0].files[0]);
            var url = baseUrl + "/controlactivos/index/procesar-upload-csv";
            $.ajax({
                url: url,
                type: 'POST',
                data: formData, //el data es tu objeto formData
                dataType: 'json',
                processData: false, //indicas a jQuery que no procese la información
                contentType: false //indicas a jQuery que no configure el contentType del request
            }).done(function(data) {

                if ( data.valida == 'false' ) {
                    var str = procesarAdminActivo.EstruturaMesajeAdvertencia;
                    var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajeAdvertencia02);
                    $(".msjRespuestaCarga").html(respHtml);
                    $("#btnCargarMasiva").removeAttr('disabled');

                }

                if ( data.valida == 'true' ) {
                    var str = procesarAdminActivo.EstruturaMesajeExito;
                    var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajeExito03);
                    $(".msjRespuestaCarga").html(respHtml);
                    $("#btnCargarMasivaProcesar").removeAttr('disabled', 'disabled');
                    $("#inpUrl").val(data.url);
                    $("#inpNombreArchivo").val(data.nom);
                    $("#btnCargarMasiva").attr('disabled', 'disabled');
                    $( ".md-close" ).trigger( "click" );
                }

            }).fail(function() {
                console.log("error");
            })

        });
    },
    procesoCargaMasiva: function () {
        $(document).on("click", "#btnCargarMasivaProcesar", function () {
            $("#btnCargarMasivaProcesar").attr('disabled', 'disabled');
            $("#btnCargarMasiva").attr('disabled', 'disabled');


            var nomArchivo = $("#inpNombreArchivo").val();
            $.ajax({
                type: "POST",
                url: baseUrl + "/controlactivos/index/procesar-csv",
                processData: true,
                dataType: 'json',
                data: {inpNombreArchivo: nomArchivo},
                success: function (data) {
                    if ( data.valida == 'false' ) {
                        var str = procesarAdminActivo.EstruturaMesajeAdvertencia;
                        var respHtml = str.replace("i_mensaje", data.msg);
                        $(".msjRespuestaCarga").html(respHtml);
                        $("#btnCargarMasivaProcesar").removeAttr('disabled');
                        $("#btnCargarMasiva").removeAttr('disabled');
                    }

                    if ( data.valida == 'true' ) {
                        var str = procesarAdminActivo.EstruturaMesajeExito;
                        var respHtml = str.replace("i_mensaje", procesarAdminActivo.mensajeExito02);
                        $(".msjRespuestaCarga").html(respHtml);
                        $("#btnCargarMasivaProcesar").attr('disabled', 'disabled');
                        $("#btnCargarMasiva").attr('disabled', 'disabled');
                        procesarAdminActivo.table.ajax.reload();
                        $( ".md-close" ).trigger( "click" );
                    }
                }, error: function (e) {
                    console.log("Error");
                }

            });

        });
    },
    metodoMensaje: function (data, bonton, mensajeExito, mensajeFalla, divMensaje) {
        console.log()
        if (data.valida == 'true') {
            var str = procesarAdminActivo.EstruturaMesajeExito;
            var respHtml = str.replace("i_mensaje", mensajeExito);
            $("." + divMensaje).html(respHtml);
            $("#" + bonton).attr('disabled', 'disable');
            //Refresco Datatable
            procesarAdminActivo.table.ajax.reload();
            // setTimeout(function(){
            //     $("#btnGuardar").removeAttr('disabled');
            //     $(".msjRespuesta" ).html('');
            //
            // }, 2000);
            $( ".md-close" ).trigger( "click" );
        }
        if (data.valida == 'false') {
            var str = procesarAdminActivo.EstruturaMesajePeligro;
            var respHtml = str.replace("i_mensaje", mensajeFalla);
            $("." + divMensaje).html(respHtml);
        }

    },
    validaTeclado: function () {
        var validaCamposTeclado = $(function () {
            $(".soloLetrasNum").keypress(function (e) {
                procesarAdminActivo.metodoTeclado(e, "soloLetrasNum", this);
            });

            $(".soloFecha").keypress(function (e) {
                procesarAdminActivo.metodoTeclado(e, "soloFecha", this);
            });

        });

    },
    metodoTeclado: function (e, permitidos, fieldObj, upperCase) {

        if (fieldObj.readOnly) return false;
        upperCase = typeof(upperCase) != 'undefined' ? upperCase : true;
        e = e || event;

        charCode = e.keyCode; // || e.keyCode;

        if ((procesarAdminActivo.is_nonChar(charCode)) && e.shiftKey == 0)
            return true;
        else if (charCode == '')
            charCode = e.charCode;

        if (fieldObj.value.length == fieldObj.maxLength) return false;

        var caracter = String.fromCharCode(charCode);

        // Variables que definen los caracteres permitidos
        var numeros = "0123456789";
        var float = "0123456789.";
        var caracteres = "  abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚ";
        var car_especiales = ".-_()'\"/&";

        //Los valores de las llaves del array representan los posibles valores permitidos
        var selectArray = new Array();
        selectArray['all'] = '';
        selectArray['num'] = numeros;
        selectArray['float'] = float;
        selectArray['soloLetrasNum'] = caracteres + numeros;
        selectArray['soloFecha'] = numeros + '/';

        // Comprobar si la tecla pulsada se encuentra en los caracteres permitidos
        if ((selectArray[permitidos].indexOf(caracter) != -1) || (permitidos == 'all')) {
            return (true);
        }
        else {
            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
        }
    },
    is_nonChar: function (charCode) {

        // 8 = BackSpace, 9 = tabulador, 13 = enter, 35 = fin, 36 = inicio, 37 = flecha izquierda, 38 = flecha arriba,
        // 39 = flecha derecha, 37 = flecha izquierda, 40 = flecha abajo 46 = delete.

        var teclas_especiales = [8, 9, 13, 35, 36, 37, 38, 39, 40, 46];
        // if ( jQuery.browser.msie) {
        //     return (false);
        // }
        for (var i in teclas_especiales) {

            if (charCode == teclas_especiales[i]) {
                return (true);
            }
        }
    },
    modalMensaje: function (titulo1, mensaje, valor, proceso) {

        BootstrapDialog.show({
            title: titulo1,
            message: mensaje,
            cssClass: 'prueba',
            type: 'type-danger',
            size: 'size-normal',
            closable: true,
            spinicon: 'glyphicon glyphicon-eur',
            buttons: [{
                id: 'btn-remove',
                icon: 'glyphicon glyphicon-remove',
                label: 'No',
                cssClass: 'btn-danger',
                action: function (dialog) {
                    dialog.close();
                }
            }, {
                id: 'btn-ok',
                icon: 'glyphicon glyphicon-check',
                label: 'Si',
                cssClass: 'btn-info',
                autospin: false,
                action: function (dialog) {
                    procesarAdminActivo.procesoDeshabilitar(valor);
                    dialog.close();
                }
            }]
        });

    },
    cargarSelectTipoUbi: function (nomSelect, array, optionText, optionval) {
        console.log(nomSelect);
        // Ordena el Array Alfabeticamente, es muy facil ;)):
        // array.sort();
        var select = document.getElementsByName(nomSelect)[0];
        for(var i=0;i<array.length;i++){
            var option = document.createElement("option");
            option.text = array[i].DESC_UBICACION;
            option.value = array[i].DESC_UBICACION;
            select.add(option);
        }
    },
    cargarSelectPiso: function (nomSelect, array, optionText, optionval) {
        console.log(nomSelect);
        // Ordena el Array Alfabeticamente, es muy facil ;)):
        // array.sort();
        var select = document.getElementsByName(nomSelect)[0];
        for(var i=0;i<array.length;i++){
            var option = document.createElement("option");
            option.text = array[i].PISO_UBICACION;
            option.value = array[i].PISO_UBICACION;
            select.add(option);
        }
    },
    cargarSelectNomUbi: function (nomSelect, array, optionText, optionval) {
        console.log(nomSelect);
        // Ordena el Array Alfabeticamente, es muy facil ;)):
        // array.sort();
        var select = document.getElementsByName(nomSelect)[0];
        for(var i=0;i<array.length;i++){
            var option = document.createElement("option");
            option.text = array[i].NOM_UBICACION;
            option.value = array[i].ID_UBICACION;
            select.add(option);
        }
    },
    obtenerCvetra:function () {
        var val = $("#idEmpleado").val();
        return val;
    },
    procesoLimpiar: function () {
        $(document).on("click", "#btnRegistrar", function () {
            document.getElementById("formAdminActivo").reset();
            $("#btnGuardar").removeClass("btn-primary");
            $("#btnGuardar").addClass("btn-success");
            $("#form-bp1").removeClass("colored-header-primary");
            $("#form-bp1").addClass("colored-header-success");

            $("#spTitulomodalRegEdit").html("Registrar");
            $("#btnGuardar").html("Registrar");
            $("#btnGuardar").removeAttr("disabled");
            $(".msjRespuesta").html(" ");


            $("#inpCategoria").val(0);
            $("#inpTipoActivo").val(0);
            $("#inpTipoAsignacion").val(0);
            $("#inpEstadoFisico").val(0);
            $("#inpProveedor").val(0);
            $("#inpSucursal").val(0);
        });

    },
    procesoLimpiarCarga: function () {
        $(document).on("click", "#btnMasiva", function () {
            document.getElementById("formMasiva").reset();
            $("#btnCargarMasiva").removeAttr("disabled");
            $("#btnCargarMasivaProcesar").removeAttr("disabled");
            $(".msjRespuestaCarga").html(" ");
        });

    },

};
procesarAdminActivo.init();