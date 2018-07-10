var procesarSolicitudAdmin = {
    //Declaracion Variables
    EstruturaMesajeExito: '<div class="alert alert-success alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4>   </div>',
    EstruturaMesajeInfo: '<div class="alert alert-info alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajePeligro: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajeAdvertencia: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    mensajeExito01:  '! Almacenamiento exitoso de Datos ¡',
    mensajeExito02:  '! Usted ha rechazado esta solicitud, deberá esperar por el administrador para su validación. ¡',
    mensajePeligro01:  '! Falla en el almacenamiento, intente mas tarde ¡',
    mensajePeligro02:  '! Si va realizar una entrega debe seleccionar un activo ¡',
    mensajePeligro03:  '! Si va realizar una entrega debe seleccionar un motivo ¡',
    mensajePeligro04:  '! Si va realizar una entrega debe colocar una cantidad ¡',
    mensajePeligro05:  '! Si va realizar una entrega debe seleccionar una sucursal ¡',
    mensajePeligro06:  '! Si va realizar una entrega debe seleccionar un personal ¡',
    mensajeAdvertencia03:'! Hubo Problema con la validacion, por favor revise el archivo CSV ¡',
    table:'',
    //Metodo Inicial
    init: function () {

        //cambios front-end
        procesarSolicitudAdmin.obtenerCvetra();
        procesarSolicitudAdmin.changeCategoria();
        procesarSolicitudAdmin.changeTipoActivo();
        procesarSolicitudAdmin.changeActivoRe();
        procesarSolicitudAdmin.changePersonal();
        procesarSolicitudAdmin.changeMotivo();
        procesarSolicitudAdmin.changeCantidad();
        procesarSolicitudAdmin.changeEstatus();
        procesarSolicitudAdmin.changeSelActivo();
        procesarSolicitudAdmin.changeSelSucursal();
        procesarSolicitudAdmin.changeCategoriaRe();
        // procesarSolicitudAdmin.changeTipoActivoRe();

        //Procesos
        procesarSolicitudAdmin.cargaDatos();
        procesarSolicitudAdmin.procesoBitacora();
        procesarSolicitudAdmin.procesoGuardadEntrega();
        procesarSolicitudAdmin.procesoGuardarSolcitud();
        procesarSolicitudAdmin.procesoMuestra();
        procesarSolicitudAdmin.procesoLimpiar();

        //validaciones
        procesarSolicitudAdmin.validaTeclado();
        procesarSolicitudAdmin.validaDeshabilitar();



    },// fin init
    changeCategoria:function () {
        $(document).on("change", "#selCategoria", function () {
            var valor = $("#selCategoria option:selected").val();
            $("#inpCategoria").val(valor);
            $("#selActivoRe").attr("disabled", "disabled");
            $.ajax({
                type: "POST",
                url: baseUrl + "/controlactivos/index/obtener-lista-activo",
                processData: true,
                dataType: 'json',
                data: {ID_CATEGORIA: valor, REFERENCIA: 'TIPO_ACTIVO'},
                success: function (data) {
                    procesarSolicitudAdmin.cargarSelectTipoActivo("selTipoActivo", data,  "DESC_UBICACION", "DESC_UBICACION" );
                }
            });
        });
    },
    changeTipoActivo:function () {
        $(document).on("change", ".changeActivo", function () {
            var nomSelectNext = $(this).attr("data-nomSelectNext");
            var nomSelectActual = $(this).attr("data-nomSelectActual");
            var valor = $("#"+nomSelectActual+" option:selected").val();
            var inpIdUsuario = $("#inpSolicitante").val();

            $.ajax({
                type: "POST",
                url: baseUrl + "/controlactivos/index/obtener-activo",
                processData: true,
                dataType: 'json',
                data: {inpTipoActivo: valor, inpIdUsuario:inpIdUsuario},
                success: function (data) {
                    procesarSolicitudAdmin.cargarSelectActivo(nomSelectNext, data );
                }
            });

        });
    },
    // changeTipoActivoRe:function () {
    //     $(document).on("change", "#selTipoActivoRe", function () {
    //         var valor = $("#selTipoActivoRe option:selected").val();
    //         var inpIdUsuario = $("#inpSolicitante").val();
    //         $.ajax({
    //             type: "POST",
    //             url: baseUrl + "/controlactivos/index/obtener-activo",
    //             processData: true,
    //             dataType: 'json',
    //             data: {inpTipoActivo: valor, inpIdUsuario:inpIdUsuario},
    //             success: function (data) {
    //                 procesarSolicitudAdmin.cargarSelectActivoRe("selActivoRe", data );
    //             }
    //         });
    //
    //     });
    // },
    changeActivoRe:function () {
        $(document).on("change", "#selActivoRe", function () {
            var valor = $("#selActivoRe option:selected").val();
            $("#inpActivoRe").val(valor);
        });
    },
    changePersonal:function () {
        $(document).on("change", "#selPersonal", function () {
            var valor = $("#selPersonal option:selected").val();
            $("#inpPersonal").val(valor);
        });
    },
    changeMotivo:function () {
        $(document).on("change", "#selMotivoRe", function () {
            var valor = $("#selMotivoRe option:selected").val();
            $("#inpMotivoRe").val(valor);
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
    changeSelActivo:function () {
        $(document).on("change", "#selActivo", function () {
            var valor = $("#selActivo option:selected").val();
            $("#inpActivo").val(valor);
        });
    },
    changeSelSucursal:function () {
        $(document).on("change", "#selSucursal", function () {
            var valor = $("#selSucursal option:selected").val();
            $("#inpSucursal").val(valor);
            $.ajax({
                type: "POST",
                url: baseUrl + "/controlactivos/index/obtener-personal",
                processData: true,
                dataType: 'json',
                data: {idSucursal: valor},
                success: function (data) {
                    procesarSolicitudAdmin.cargarSelectPersonal("selPersonal", data );
                }
            });
        });
    },
    cargaDatos:function () {
        $(document).ready( function () {
            var idSolicitud = procesarSolicitudAdmin.obtenerCvetra();
            var idEstatus = 0; //Esto permite Ver todos los estatus para el admin
            var idPerfil = 'ADMIN';
            procesarSolicitudAdmin.table = $('#dt_tabla').DataTable( {
                processing: false, // esto permite realizar busqueda conectado con el servidor
                serverSide: false, // esto permite realizar busqueda conectado con el servidor
                ajax: {
                    url: baseUrl + "/controlactivos/index/obtener-json-solicitud-admin",
                    dataSrc: 'data',
                    type: "POST",
                    data: {
                        idSolicitud: idSolicitud, idEstatus:idEstatus, admin:'1', perfil:idPerfil,
                    }
                },
                columns: [
                    { data: "FECHA_SOLICITUD_FORMATO",orderable: true, "width": "5%" },
                    { data: "ID_TRACKING",orderable: true, "width": "5%" },
                    { data: "NOM_ADMIN",orderable: true, "width": "5%" },
                    { data: "TIPO_ACTIVO",orderable: true, "width": "5%" },
                    { data: "NOM_SOLICITANTE",orderable: true, "width": "5%" },
                    { data: "MOTIVO_SOLICITUD",orderable: true, "width": "5%" },
                    { data: "NOM_ESTATUS",orderable: false, "width": "5%" },
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
                /*                initComplete: function () {

                 this.api().columns().every( function () {
                 var column = this;
                 var select = $('<select><option value=""></option></select>')
                 .appendTo( $(column.header()).empty() )
                 .on( 'change', function () {
                 var val = $.fn.dataTable.util.escapeRegex(
                 $(this).val()
                 );

                 column
                 .search( val ? '^'+val+'$' : '', true, false )
                 .draw();
                 } );

                 column.data().unique().sort().each( function ( d, j ) {
                 select.append( '<option value="'+d+'">'+d+'</option>' )
                 } );
                 } );
                 }
                 */

            } );

            //Permite agregar los campos para ser filtrados
            $('#dt_tabla thead th').each( function (i) {
                //coloca el campo filtro a las columnas definifidas
                if (i < 6 ){
                    var title = $(this).text();
                    $(this).html( '<input type="text" class="form-control" placeholder=" '+title+'" />' );
                }

                //coloca el select filtro a las columnas definifidas
                // if (i == 6 ){
                //      $(this).html( '<select id="selcEstatus"><option value="0">ESTATUS</option><option value="0">TODO</option><option value="ACEPTADA ADMIN">ACEPTADA ADMIN</option><option value="ACEPTADA USUARIO">ACEPTADA USUARIO</option><option value="ENTREGA">ENTREGA</option><option value="RECHAZADA POR  USUARIO">RECHAZADA POR  USUARIO</option><option value="RECHAZADA POR ADMIN POR  USUARIO">RECHAZADA POR  USUARIO</option><option value="SOLICITUD">SOLICITUD</option></select>');
                // }

            });
            //Define filtro de busqueda a los campos
            procesarSolicitudAdmin.table.columns().every( function () {
                var that = this;
                $( 'input', this.header() ).on( 'keyup change', function () {
                    if ( that.search() !== this.value ) {
                        that.search( this.value ).draw();
                    }
                } );
            });
            //Define filtro de busqueda a los select
            procesarSolicitudAdmin.table.columns([6]).every( function () {
                var column = this;
                $( 'select', this.header() ).on( 'change', function () {

                    if ( $(this).val() == 'TODO'){
                        procesarSolicitudAdmin.table.ajax.reload();
                    }else{
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column.search( val ? '^'+val+'$' : '', true, false ).draw();
                    }

                } );
                column.data().unique().sort().each( function ( d, j ) {

                    $( 'select', this.header() ).append( '<option value="'+d+'">'+d+'</option>' )
                } );

            });
            //Permite agregar los campos para ser filtrados


        } );

    },
    procesoGuardadEntrega: function () {
        var validaCampos = $(function () {//esto permite convertir todo el validate en una funcion
            $("#formGestionAdmin").validate({
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
                    var datosForm = $("#formGestionAdmin").serializeArray();
                    //Valido Manualmente
                    if( $("#inpActivoRe").val() == ""  || $("#inpActivoRe").val() == "0" ){
                        var str = procesarSolicitudAdmin.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarSolicitudAdmin.mensajePeligro02);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }

                    if( $("#inpMotivoRe").val() == ""  ||  $("#inpMotivoRe").val() == "0"  ){
                        var str = procesarSolicitudAdmin.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarSolicitudAdmin.mensajePeligro03);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }
                    if( $("#inpCantidadRe").val() == "" ){
                        var str = procesarSolicitudAdmin.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarSolicitudAdmin.mensajePeligro04);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }

                    if( $("#inpSucursal").val() == "" || $("#inpSucursal").val() == "0"){
                        var str = procesarSolicitudAdmin.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarSolicitudAdmin.mensajePeligro05);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }

                    if( $("#inpPersonal").val() == "" || $("#inpPersonal").val() == "0" ){
                        var str = procesarSolicitudAdmin.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarSolicitudAdmin.mensajePeligro06);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }



                    $.ajax({
                        type: "POST",
                        url: baseUrl + "/controlactivos/index/procesar-solicitud",
                        processData: true,
                        data: datosForm,
                        dataType: 'json',
                        success: function (data) {
                            procesarSolicitudAdmin.metodoMensaje(data, 'btnGuardarEntrega', procesarSolicitudAdmin.mensajeExito01, procesarSolicitudAdmin.mensajePeligro01, 'msjRespuesta');
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
    procesoGuardarSolcitud: function () {
        var validaCampos = $(function () {//esto permite convertir todo el validate en una funcion
            $("#formSolicitudAdmin").validate({
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
                    var datosForm = $("#formSolicitudAdmin").serializeArray();
                    if( $("#inpEstatus").val() == "4"){//Estatus Entrega Valida Asignación de Activo
                        if( $("#inpActivo").val() == "" ){
                            var str = procesarSolicitudAdmin.EstruturaMesajePeligro;
                            var respHtml = str.replace("i_mensaje", procesarSolicitudAdmin.mensajePeligro02);
                            $(".msjRespuestaRecha").html(respHtml);
                            return false;
                        }else{
                            $(".msjRespuestaRecha").html('');
                        }
                    }

                    $.ajax({
                        type: "POST",
                        url: baseUrl + "/controlactivos/index/procesar-solicitud",
                        processData: true,
                        data: datosForm,
                        dataType: "json",
                        success: function (data) {
                            procesarSolicitudAdmin.metodoMensaje(data, 'btnRechazar', procesarSolicitudAdmin.mensajeExito01, procesarSolicitudAdmin.mensajePeligro01, 'msjRespuestaRecha' );
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

            var estatus = $(this).attr('data-id_estatus_admin');
            var referencia = $(this).attr('data-id_referencia');
            var valida = $(this).attr('data-id_valida');

            $("textarea#inpDes").val('');
            $(".msjRespuestaRecha").html('');
            $("#btnGuardar").removeAttr("disabled");
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
    validaDeshabilitar: function () {
        $(document).on("click", ".btnAccionDel", function () {
            var id = $(this).attr("data-id");
            procesarSolicitudAdmin.modalMensaje('Confirmación', '¿ Está seguro de deshabilitar ?', id, 'btnAccionDel');

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
    metodoMensaje: function (data, bonton, mensajeExito, mensajeFalla, divMensaje) {
        console.log()
        if (data.valida == 'true') {
            var str = procesarSolicitudAdmin.EstruturaMesajeExito;
            var respHtml = str.replace("i_mensaje", mensajeExito);
            $("." + divMensaje).html(respHtml);
            $("#" + bonton).attr('disabled', 'disable');
            //Refresco Datatable
            procesarSolicitudAdmin.table.ajax.reload();
            $( ".md-close" ).trigger( "click" );
        }
        if (data.valida == 'false') {
            var str = procesarSolicitudAdmin.EstruturaMesajePeligro;
            var respHtml = str.replace("i_mensaje", mensajeFalla);
            $("." + divMensaje).html(respHtml);
        }

    },
    validaTeclado: function () {
        var validaCamposTeclado = $(function () {
            $(".soloLetrasNum").keypress(function (e) {
                procesarSolicitudAdmin.metodoTeclado(e, "soloLetrasNum", this);
            });
            $(".soloNum").keypress(function (e) {
                procesarSolicitudAdmin.metodoTeclado(e, "soloNum", this);
            });

        });

    },
    metodoTeclado: function (e, permitidos, fieldObj, upperCase) {

        if (fieldObj.readOnly) return false;
        upperCase = typeof(upperCase) != 'undefined' ? upperCase : true;
        e = e || event;

        charCode = e.keyCode; // || e.keyCode;

        if ((procesarSolicitudAdmin.is_nonChar(charCode)) && e.shiftKey == 0)
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
        selectArray['soloNum'] = numeros;

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
                    procesarSolicitudAdmin.procesoDeshabilitar(valor);
                    dialog.close();
                    procesarSolicitudAdmin.funtCerrarReload();
                }
            }]
        });

    },
    funtCerrarReload: function () {
        $(document).on("click", "#btnCerrar", function () {
            window.location.reload(true);
        });

    },
    cargarSelectTipoActivo: function (nomSelect, array, optionText, optionval) {
        console.log(nomSelect);
        // Ordena el Array Alfabeticamente, es muy facil ;)):
        // array.sort();
        $('#selTipoActivo').removeAttr('disabled');
        var select = document.getElementsByName(nomSelect)[0];
        if (array.length == 1){
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
    cargarSelectActivo: function (nomSelect, array, optionText, optionval) {
        var select = document.getElementsByName(nomSelect)[0];
        $('#'+nomSelect).removeAttr('disabled');
        if (array.length == 1){
            $('#'+nomSelect+' option').remove();
            var option = document.createElement("option");
            option.text = 'No hay Datos';
            option.value = 0;
            select.add(option);
        }else{
            $('#'+nomSelect+' option').remove();
            for(var i=0;i<array.length;i++){
                var option = document.createElement("option");
                option.text = array[i].NOMBRE;
                option.value = array[i].ID_ACTIVO;
                select.add(option);
            }
        }
    },
    procesoLimpiar: function () {
        $(document).on("click", "#btnRegistrar", function () {
            document.getElementById("formGestionAdmin").reset();
            $("#btnGuardar").removeClass("btn-primary");
            $("#btnGuardar").addClass("btn-success");
            $("#form-bp1").removeClass("colored-header-primary");
            $("#form-bp1").addClass("colored-header-success");

            $("#spTitulomodalRegEdit").html("Registrar");
            $("#btnGuardar").html("Registrar");
            $("#btnGuardar").removeAttr("disabled");
            $(".msjRespuesta").html(" ");

        });

    },
    obtenerCvetra:function () {
        var val = $("#idEmpleado").val();
        $("#inpSolicitante").val(val);
        $(".idEmpleado").val(val);
        return val;
    },
    changeCategoriaRe:function () {
        $(document).on("change", "#selCategoriaRe", function () {
            var valor = $("#selCategoriaRe option:selected").val();
            $("#inpCategoriaRe").val(valor);

            $.ajax({
                type: "POST",
                url: baseUrl + "/controlactivos/index/obtener-lista-activo",
                processData: true,
                dataType: 'json',
                data: {ID_CATEGORIA: valor, REFERENCIA: 'TIPO_ACTIVO'},
                success: function (data) {
                    procesarSolicitudAdmin.cargarSelectTipoActivoRe("selTipoActivoRe", data,  "DESC_UBICACION", "DESC_UBICACION" );
                }
            });
        });
    },

    cargarSelectActivoRe: function (nomSelect, array, optionText, optionval) {
        // Ordena el Array Alfabeticamente, es muy facil ;)):
        // array.sort();
        var select = document.getElementsByName(nomSelect)[0];
        $('#selActivoRe').removeAttr('disabled');
        if (array.length == 1){
            $('#selActivoRe option').remove();
            var option = document.createElement("option");
            option.text = 'No hay Datos';
            option.value = 0;
            select.add(option);

        }else{
            $('#selActivoRe option').remove();
            for(var i=0;i<array.length;i++){
                var option = document.createElement("option");
                option.text = array[i].NOMBRE;
                option.value = array[i].ID_ACTIVO;
                select.add(option);
            }
        }


    },
    cargarSelectTipoActivoRe: function (nomSelect, array, optionText, optionval) {

        // Ordena el Array Alfabeticamente, es muy facil ;)):
        // array.sort();
        $('#selTipoActivoRe').removeAttr('disabled');
        var select = document.getElementsByName(nomSelect)[0];
        if (array.length == 1){
            $('#selTipoActivoRe option').remove();
            var option = document.createElement("option");
            option.text = 'No hay Datos';
            option.value = 0;
            select.add(option);

        }else{
            $('#selTipoActivoRe option').remove();

            for(var i=0;i<array.length;i++){
                var option = document.createElement("option");
                option.text = array[i].NOM_CATEGORIA;
                option.value = array[i].ID_CACT_CATEGORIA;
                select.add(option);
            }
        }


    },
    cargarSelectPersonal: function (nomSelect, array) {
        console.log(nomSelect);
        // Ordena el Array Alfabeticamente, es muy facil ;)):
        // array.sort();
        $('#selPersonal').removeAttr('disabled');
        var select = document.getElementsByName(nomSelect)[0];
        if (array.length == 1){
            $('#selPersonal option').remove();
            var option = document.createElement("option");
            option.text = 'No hay Datos';
            option.value = 0;
            select.add(option);

        }else{
            $('#selPersonal option').remove();
            for(var i=0;i<array.length;i++){
                var option = document.createElement("option");
                option.value = array[i].CVETRA;
                option.text = array[i].NOMBRE;
                select.add(option);
            }
        }


    },

};
procesarSolicitudAdmin.init();