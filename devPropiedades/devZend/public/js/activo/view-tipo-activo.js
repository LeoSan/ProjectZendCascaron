var procesoTipoActivo = {
    //Declaracion Variables
    EstruturaMesajeExito: '<div class="alert alert-success alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4>   </div>',
    EstruturaMesajeInfo: '<div class="alert alert-info alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajePeligro: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajeAdvertencia: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    mensajeExito01:  '! Almacenamiento exitoso de Datos ¡',
    mensajePeligro01:  '! Falla en el proceso ¡',
    table:'',
    //Metodo Inicial
    init: function () {
        procesoTipoActivo.cargaDatos();
        procesoTipoActivo.validaTeclado();
        procesoTipoActivo.procesoGuardado();
        procesoTipoActivo.procesoMuestra();
        procesoTipoActivo.validaDeshabilitar();
        procesoTipoActivo.procesoLimpiar();
    },// fin init
    cargaDatos:function () {
        $(document).ready( function () {
            procesoTipoActivo.table =   $('#dt_tabla').DataTable( {
                processing: false, // esto permite realizar busqueda conectado con el servidor
                serverSide: false, // esto permite realizar busqueda conectado con el servidor
                ajax: {
                    url: baseUrl + "/controlactivos/index/obtener-json-catalogo/",
                    dataSrc: 'data',
                    type: "POST",
                    data:{ tipoCatalogo:'TIPO_ACTIVO'}
                },
                columns: [
                    { data: "ID_CACT_CATEGORIA",orderable: true, "width": "5%" },
                    { data: "NOM_CATEGORIA",orderable: true, "width": "5%" },
                    { data: "DESC_CATEGORIA",orderable: true, "width": "5%" },
                    { data: "ESTATUS",orderable: true, "width": "5%" },
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
                aaSorting: [[ 0, "desc" ]]
            } );

            //Permite agregar los campos para ser filtrados
            $('#dt_tabla thead th').each( function (i) {
                if (i <($('#dt_tabla thead th').length - 1) ){
                    var title = $(this).text();
                    $(this).html( '<input type="text" class="form-control" placeholder=" '+title+'" />' );
                }
            });
            procesoTipoActivo.table.columns().every( function () {
                var that = this;
                $( 'input', this.header() ).on( 'keyup change', function () {
                    if ( that.search() !== this.value ) {
                        that.search( this.value ).draw();
                    }
                } );
            });
            //Permite agregar los campos para ser filtrados

        } );
    },
    procesoGuardado: function () {
        var validaCampos = $(function () {//esto permite convertir todo el validate en una funcion
            $("#formCatalogo").validate({
                event: "blur",
                rules: {
                    inpNombre: {
                        required: true
                    },
                    inpDes: {
                        required: true
                    },
                },
                messages: {
                    inpNombre: {
                        required: "Este campo es obligatorio.",
                    },
                    inpDes: {
                        required: "Este campo es obligatorio.",
                    },
                }
                , debug: true
                , errorElement: "label"
                , submitHandler: function (form) {
                    var datosForm = $("#formCatalogo").serializeArray();
                    $.ajax({
                        type: "POST",
                        url: baseUrl + "/controlactivos/index/procesar-catalogo",
                        processData: true,
                        data: datosForm,
                        dataType: "json",
                        success: function (data) {
                            procesoTipoActivo.metodoMensaje(data, 'btnGuardar', procesoTipoActivo.mensajeExito01, procesoTipoActivo.mensajePeligro01, 'msjRespuesta' );
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
            var inpNombre = $(this).attr("data-NOM_CATEGORIA");
            var inpDes = $(this).attr("data-DESC_CATEGORIA");

            $("#inpId").val(inpId);
            $("#inpNombre").val(inpNombre);
            $("#inpDes").val(inpDes);

            $("#spTitulomodalRegEdit").html("Editar");
            $("#inptProceso").val("Editar");
            $("#btnGuardar").html("Editar");
            $("#btnGuardar").removeClass("btn-success");
            $("#btnGuardar").addClass("btn-primary");
            $("#form-bp1").removeClass("colored-header-success");
            $("#form-bp1").addClass("colored-header-primary");

            $("#btnGuardar").removeAttr("disabled");
            $(".msjRespuesta").html(" ");

        });
    },
    validaDeshabilitar: function () {
        $(document).on("click", ".btnAccionDel", function () {
            var id = $(this).attr("data-id");
            procesoTipoActivo.modalMensaje('Confirmación', '¿ Está seguro de deshabilitar ?', id, 'btnAccionDel');

        });
    },
    procesoDeshabilitar: function (valor) {
        $.ajax({
            type: "POST",
            url: baseUrl + "/controlactivos/index/procesar-catalogo",
            processData: true,
            dataType: 'json',
            data: {inptProceso: 'Deshabilitar', inpId: valor},
            success: function (data) {
                //Refresco Datatable
                procesoProveedor.table.ajax.reload();
            }
        });
    },
    metodoMensaje: function (data, bonton, mensajeExito, mensajeFalla, divResp) {
        console.log(data);
        if (data.valida == 'true') {
            var str = procesoTipoActivo.EstruturaMesajeExito;
            var respHtml = str.replace("i_mensaje", mensajeExito);
            $("." + divResp).html(respHtml);
            $("#" + bonton).attr('disabled', 'disable');
            //Refresco Datatable
            procesoTipoActivo.table.ajax.reload();
            $( ".md-close" ).trigger( "click" );

        }
        if (data.valida == 'false') {
            var str = procesoTipoActivo.EstruturaMesajePeligro;
            var respHtml = str.replace("i_mensaje", mensajeFalla);
            $("." + divResp).html(respHtml);
        }

    },
    validaTeclado: function () {
        var validaCamposTeclado = $(function () {
            $(".soloLetrasNum").keypress(function (e) {
                procesoTipoActivo.metodoTeclado(e, "soloLetrasNum", this);
            });
        });

    },
    metodoTeclado: function (e, permitidos, fieldObj, upperCase) {

        if (fieldObj.readOnly) return false;
        upperCase = typeof(upperCase) != 'undefined' ? upperCase : true;
        e = e || event;

        charCode = e.keyCode; // || e.keyCode;

        if ((procesoTipoActivo.is_nonChar(charCode)) && e.shiftKey == 0)
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
                    procesoTipoActivo.procesoDeshabilitar(valor);
                    dialog.close();
                    procesoTipoActivo.table.ajax.reload();

                }
            }]
        });

    },
    procesoLimpiar: function () {
        $(document).on("click", "#btnRegistrar", function () {
            document.getElementById("formCatalogo").reset();
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


};
procesoTipoActivo.init();