var procesarSolicitud = {
    //Declaracion Variables
    EstruturaMesajeExito: '<div class="alert alert-success alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4>   </div>',
    EstruturaMesajeInfo: '<div class="alert alert-info alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajePeligro: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajeAdvertencia: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    mensajeExito01:  '! Almacenamiento exitoso de Datos ¡',
    mensajeExito02:  '! Usted ha rechazado esta solicitud, deberá esperar por el administrador para su validación. ¡',
    mensajePeligro01:  '! Falla en el proceso ¡',
    table:'',
    //Metodo Inicial
    init: function () {
        //Front
        procesarSolicitud.obtenerCvetra();
        procesarSolicitud.changeCategoria();
        procesarSolicitud.changeTipoActivo();
        procesarSolicitud.changeMotivo();
        procesarSolicitud.changeCantidad();
        procesarSolicitud.changeEstatus();
        //Procesos
        procesarSolicitud.cargaDatos();
        procesarSolicitud.procesoMuestra();
        procesarSolicitud.procesoBitacora();
        procesarSolicitud.procesoGuardado();
        procesarSolicitud.procesoRechaza();
        //Validaciones
        procesarSolicitud.validaTeclado();
        procesarSolicitud.procesoLimpiar();

    },// fin init
    changeCategoria:function () {
        $(document).on("change", "#selCategoria", function () {
            var valor = $("#selCategoria option:selected").val();
            $("#inpCategoria").val(valor);

            $.ajax({
                type: "POST",
                url: baseUrl + "/controlactivos/index/obtener-lista-activo",
                processData: true,
                dataType: 'json',
                data: {ID_CATEGORIA: valor, REFERENCIA: 'TIPO_ACTIVO'},
                success: function (data) {
                    procesarSolicitud.cargarSelectTipoActivo("selTipoActivo", data,  "DESC_UBICACION", "DESC_UBICACION" );
                }
            });
        });
    },
    changeTipoActivo:function () {
        $(document).on("change", "#selTipoActivo", function () {
            var valor = $("#selTipoActivo option:selected").val();
            $("#inpTipoActivo").val(valor);
        });
    },
    changeMotivo:function () {
        $(document).on("change", "#selMotivo", function () {
            var valor = $("#selMotivo option:selected").val();
            $("#inpMotivo").val(valor);
        });
    },
    changeCantidad:function () {
        $(document).on("change", "#selCantidad", function () {
            var valor = $("#selCantidad option:selected").val();
            $("#inpCantidad").val(valor);
        });
    },
    changeEstatus:function () {
        $(document).on("change", "#selEstatus", function () {
            var valor = $("#selEstatus option:selected").val();
            $("#inpEstatus").val(valor);
        });
    },
    cargaDatos:function () {
        $(document).ready( function () {

            var idSolicitud =  procesarSolicitud.obtenerCvetra();
            var idEstatus = '1,2,3,4,6';
            var idPerfil = 'USU';

            procesarSolicitud.table = $('#dt_tabla').DataTable( {
                //"searching": false,
                // responsive: true,
                processing: false, // esto permite realizar busqueda conectado con el servidor
                serverSide: false, // esto permite realizar busqueda conectado con el servidor
                ajax: {
                    url: baseUrl + "/controlactivos/index/obtener-json-solicitud",
                    dataSrc: 'data',
                    type: "POST",
                    data: {
                        idSolicitud: idSolicitud, idEstatus:idEstatus, perfil:idPerfil,
                    }
                },
                columns: [
                    { data: "FECHA_SOLICITUD", orderable: true, "width": "5%" },
                    { data: "ID_TRACKING", orderable: true, "width": "5%" },
                    { data: "TIPO_ACTIVO", orderable: true, "width": "10%" },
                    { data: "MOTIVO_SOLICITUD", orderable: true, "width": "10%" },
                    { data: "NOM_ESTATUS", orderable: true, "width": "10%" },
                    { data: "ACCION", orderable: false, "width": "10%" },
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
                aaSorting: [[ 1, "desc" ]]

            } );


            $('#dt_tabla thead th').each( function (i) {
                if (i <( $('#dt_tabla thead th').length-1) ){
                    var title = $(this).text();
                    $(this).html( '<input type="text" class="form-control" placeholder=" '+title+'" />' );
                }
            });
            procesarSolicitud.table.columns().every( function () {
                var that = this;
                $( 'input', this.header() ).on( 'keyup change', function () {
                    console.log("entrado")
                    if ( that.search() !== this.value ) {
                        that.search( this.value ).draw();
                    }
                } );
            } );

        });//fin del ready

    },
    procesoGuardado: function () {
        var validaCampos = $(function () {//esto permite convertir todo el validate en una funcion
            $("#formSolicitud").validate({
                event: "blur",
                rules: {
                    inpCategoria: {
                        required: true
                    },
                    inpTipoActivo: {
                        required: true
                    },
                    inpMotivo: {
                        required: true
                    },
                    inpCantidad: {
                        required: true
                    },
                    inpDes: {
                        required: true
                    },
                },
                messages: {
                    inpCategoria: {
                        required: "Este campo es obligatorio.",
                    },
                    inpTipoActivo: {
                        required: "Este campo es obligatorio.",
                    },
                    inpMotivo: {
                        required: "Este campo es obligatorio.",
                    },
                    inpCantidad: {
                        required: "Este campo es obligatorio.",
                    },
                    inpDes: {
                        required: "Este campo es obligatorio.",
                    },
                }
                , debug: true
                , errorElement: "label"
                , submitHandler: function (form) {
                    var datosForm = $("#formSolicitud").serializeArray();
                    $.ajax({
                        type: "POST",
                        url: baseUrl + "/controlactivos/index/procesar-solicitud",
                        processData: true,
                        data: datosForm,
                        dataType: "json",
                        success: function (data) {
                            procesarSolicitud.metodoMensaje(data, 'btnGuardar', procesarSolicitud.mensajeExito01, procesarSolicitud.mensajePeligro01, 'msjRespuesta' );
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
    procesoRechaza: function () {
        var validaCampos = $(function () {//esto permite convertir todo el validate en una funcion
            $("#formSolicitudRecha").validate({
                event: "blur",
                rules: {
                    inpDes: {
                        required: true
                    },
                    inpEstatus: {
                        required: true
                    },

                },
                messages: {
                    inpDes: {
                        required: "Este campo es obligatorio.",
                    },
                    inpEstatus: {
                        required: "Este campo es obligatorio.",
                    },

                }
                , debug: true
                , errorElement: "label"
                , submitHandler: function (form) {
                    var datosForm = $("#formSolicitudRecha").serializeArray();
                    $.ajax({
                        type: "POST",
                        url: baseUrl + "/controlactivos/index/procesar-solicitud",
                        processData: true,
                        data: datosForm,
                        dataType: "json",
                        success: function (data) {
                            procesarSolicitud.metodoMensaje(data, 'btnRechazar', procesarSolicitud.mensajeExito01, procesarSolicitud.mensajePeligro01, 'msjRespuestaRecha')
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
        $(document).on("click", ".btnValEstatus", function () {

            var id_tracking = $(this).attr("data-id_tracking");
            var id_solicitante = $(this).attr("data-id_solicitante");
            var nomMotivo = $(this).attr("data-motivo_solicitud");
            var cantidad = $(this).attr("data-cantidad");
            var nomTipoActivo = $(this).attr("data-tipo_activo");

            $("#inpIdTracking").val(id_tracking);
            $("#inpTipoActivoRecha").val(nomTipoActivo);
            $("#inpMotivoRecha").val(nomMotivo);
            $("#inpCantidadRecha").val(cantidad);

            var estatus = $(this).attr('data-id_estatus');
            var referencia = $(this).attr('data-id_referencia');
            var valida = $(this).attr('data-id_valida');

            $("textarea#inpDes").val('');
            $(".msjRespuestaRecha").html('');
            $("#btnRechazar").removeAttr("disabled");

            $.ajax({
                type: "POST",
                url: baseUrl + "/controlactivos/index/obtener-estatus",
                processData: true,
                dataType: 'json',
                data: {estatus: estatus, referencia:referencia, valida:valida},
                success: function (data) {
                    var select = document.getElementsByName("selEstatus")[0];
                    if (data.length == 0){
                        $('#selEstatus option').remove();
                        var option = document.createElement("option");
                        option.text = 'No hay Datos';
                        option.value = 0;
                        select.add(option);

                    }else{
                        $('#selEstatus option').remove();
                        for(var i=0; i<data.length; i++){
                            var option = document.createElement("option");
                            option.text = data[i].NOM_ESTATUS;
                            option.value = data[i].ID_ESTATUS;
                            select.add(option);
                        }
                    }
                }
            });

        });
    },
    procesoBitacora: function () {
        $(document).on("click", ".btnAccionBitacora", function () {

            var inpId = $(this).attr("data-id");

            $.ajax({
                type: "POST",
                url: baseUrl + "/controlactivos/index/obtener-bitacora",
                processData: true,
                // dataType: 'json',
                dataType: 'html',
                data: {idTracking: inpId},
                success: function (data) {
                    $("#bitacora").html(data);
                }
            });



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
                window.location.reload(true);
            }
        });

    },
    metodoMensaje: function (data, bonton, mensajeTrue, mensajeFalse, divMensaje) {
        console.log(data);
        if (data.valida == 'true') {
            var str = procesarSolicitud.EstruturaMesajeExito;
            var respHtml = str.replace("i_mensaje", mensajeTrue);
            $("." + divMensaje ).html(respHtml);
            $("#" + bonton).attr('disabled', 'disable');
            //Refresco Datatable
            procesarSolicitud.table.ajax.reload();
            $( ".md-close" ).trigger( "click" );

        }
        if (data.valida == 'false') {
            var str = procesarSolicitud.EstruturaMesajePeligro ;
            var respHtml = str.replace("i_mensaje", mensajeFalse);
            $("." + divMensaje ).html(respHtml);
        }

    },
    validaTeclado: function () {
        var validaCamposTeclado = $(function () {
            $(".soloLetrasNum").keypress(function (e) {
                procesarSolicitud.metodoTeclado(e, "soloLetrasNum", this);
            });

            $(".soloFecha").keypress(function (e) {
                procesarSolicitud.metodoTeclado(e, "soloFecha", this);
            });

        });

    },
    metodoTeclado: function (e, permitidos, fieldObj, upperCase) {

        if (fieldObj.readOnly) return false;
        upperCase = typeof(upperCase) != 'undefined' ? upperCase : true;
        e = e || event;

        charCode = e.keyCode; // || e.keyCode;

        if ((procesarSolicitud.is_nonChar(charCode)) && e.shiftKey == 0)
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
                    procesarSolicitud.procesoDeshabilitar(valor);
                    dialog.close();
                    //procesarSolicitud.funtCerrarReload();
                }
            }]
        });

    },
    cargarSelectTipoActivo: function (nomSelect, array, optionText, optionval) {
        console.log(nomSelect);
        // Ordena el Array Alfabeticamente, es muy facil ;)):
        // array.sort();
        var select = document.getElementsByName(nomSelect)[0];
        if (array.length == 0){
            $('#selTipoActivo option').remove();
            var option = document.createElement("option");
            option.text = 'No hay Datos';
            option.value = 0;
            select.add(option);

        }else{
            $('#selTipoActivo option').remove();

            for(var i=0;i<array.length;i++){
                var option = document.createElement("option");
                option.text = array[i].NOM_CATEGORIA;
                option.value = array[i].ID_CACT_CATEGORIA;
                select.add(option);
            }
        }
    },
    procesoLimpiar: function () {
        $(document).on("click", "#btnRegistrar", function () {
            document.getElementById("formSolicitud").reset();
            $("#btnGuardar").removeAttr("disabled");
            $(".msjRespuesta").html(" ");

        });

    },
    obtenerCvetra:function () {
        var val = $("#idEmpleado").val();
        $("#inpSolicitante").val(val);
        $(".inpSolicitante").val(val);
        return val;
    },

};
procesarSolicitud.init();