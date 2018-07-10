var procesarUsuSucursal = {
    //Declaracion Variables
    EstruturaMesajeExito: '<div class="alert alert-success alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4>   </div>',
    EstruturaMesajeInfo: '<div class="alert alert-info alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajePeligro: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    EstruturaMesajeAdvertencia: '<div class="alert alert-danger alert-dismissible pCenter" role="alert"> <button type="button" class="close pTamanio" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Mensaje!</strong> <h4> i_mensaje </h4> </div>',
    mensajeExito01:  '! Almacenamiento exitoso de Datos ¡',
    mensajePeligro01:  '! Falla en el proceso ¡',
    mensajePeligro02:  '! Debes seleccionar una sucursal ¡',
    mensajeAdvertencia03:'! Hubo Problema con la validacion, por favor revise el archivo CSV ¡',
    table:'',
    idSucursales : [],
    inpSucursalAgrega:[],
    inpSucursalAgrega2:[],
    init: function () {
        //Front-End
        procesarUsuSucursal.cargaDatos();
        //Porcesos
        procesarUsuSucursal.procesoMuestra();
        procesarUsuSucursal.procesoAgregarSucursal();
        procesarUsuSucursal.procesoQuitarSucursal();
        procesarUsuSucursal.procesoAutoComplete();
        procesarUsuSucursal.procesoGuardado();
        procesarUsuSucursal.procesoLimpiar();

    },// fin init
    cargaDatos:function(){
        $(document).ready( function () {
            var idSolicitud = procesarUsuSucursal.obtenerCvetra();

            procesarUsuSucursal.table =  $('#dt_tabla').DataTable( {
                processing: false, // esto permite realizar busqueda conectado con el servidor
                serverSide: false, // esto permite realizar busqueda conectado con el servidor
                ajax: {
                    url: baseUrl + "/controlactivos/index/obtener-sucursal-admin",
                    dataSrc: 'data',
                    data: {
                        idSolicitud: idSolicitud
                    }
                },
                columns: [
                    { data: "ID_CVETRA",orderable: true, "width": "5%"  },
                    { data: "NOMBRE",orderable: true, "width": "5%"  },
                    { data: "NMSUCURSAL2",orderable: true, "width": "5%"  },
                    { data: "ACCION",orderable: false, "width": "5%"  },
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
                aaSorting: [[ 1, "desc" ]],

            } );

            //Permite agregar los campos para ser filtrados
            $('#dt_tabla thead th').each( function (i) {
                if (i < 3 ){
                    var title = $(this).text();
                    $(this).html( '<input type="text" class="form-control" placeholder=" '+title+'" />' );
                }
            });

            procesarUsuSucursal.table.columns().every( function () {
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
    procesoMuestra: function(){
        $(document).on("click", ".btnAccionUsuEdit", function () {

            var inpCvetra = $(this).attr("data-id_cvetra");
            var inpNombre = $(this).attr("data-nombre");
            var inpSucursales = $(this).attr("data-id_sucursal");
            var inpNomSucursal = $(this).attr("data-nmsucursal");

            //llenamos el select multiple
            var arrIdSucu = inpSucursales.split(',');
            var arrNomSucu = inpNomSucursal.split(',');
            var string = '';
            for (var i=0; i < arrIdSucu.length; i++){
                string =  string + "<option value='" + arrIdSucu[i] + "'>" + arrNomSucu[i] + "</option>";
            }

            $("#selQuitarSucursal").html(string);

            $("#ttlRegistrar").html("Editar");
            $("#bntTitulomodal").html("Editar");
            $("#inptProceso").val("Editar");

            $("#inpNombre").val(inpNombre);
            $("#inpCvetra").val(inpCvetra);
            $("#inpSucursalAgrega").val(inpSucursales);

            $("#inpNombre").attr('disabled', 'disabled' );

            $("#form-bp1").removeClass("colored-header-success");
            $("#form-bp1").addClass("colored-header-primary");

            $("#btnGuardar").removeClass("btn-success");
            $("#btnGuardar").addClass("btn-primary");
            $("#btnGuardar").html("Editar");
            $("#btnGuardar").removeAttr("disabled");

            $(".msjRespuesta").html("");

            $("#icoTitulo").removeClass("mdi-collection-plus");
            $("#icoTitulo").addClass("mdi-edit");

        });
    },
    procesoAutoComplete: function(){
        $( document ).ready(function() {
            $('#inpNombre').typeahead(
                {
                    items: 10,
                    source:function(request, response)
                    {
                        return  response(  JsonUsuario   );
                    },
                    autoSelect: false,
                    debug: true,
                    order: "asc",
                    displayText: function(item){  $("#inpCvetra").val(item.id); return item.value;}
                });
        });
    },
    obtenerCvetra:function(){
        var val = $("#idEmpleado").val();
        return val;
    },
    procesoAgregarSucursal:function(){
         $(document).on("click", "#btnAgregar", function (e) {
            e.preventDefault();
            if( $('#selAgregarSucursal option').is(':selected') == false ){
                alert("Seleccione algo.");
                $('#selAgregarSucursal').focus();
                return false;
            }

            $("#selAgregarSucursal option:selected").each(function(){
                procesarUsuSucursal.idSucursales[$(this).val()] = $(this).text();
            });

            $("#selQuitarSucursal option:selected").remove();

            $('#selQuitarSucursal').empty();

             procesarUsuSucursal.inpSucursalAgrega = [];
            for (var elemento in procesarUsuSucursal.idSucursales){
                if(procesarUsuSucursal.idSucursales[elemento]){

                    procesarUsuSucursal.inpSucursalAgrega.push(elemento);

                    $('#selQuitarSucursal').append($('<option>', {
                        value: elemento,
                        text: procesarUsuSucursal.idSucursales[elemento],
                    }));
                }
            }
            //Almaceno valores en el campo para la BD
            $("#inpSucursalAgrega").val(procesarUsuSucursal.inpSucursalAgrega.toString());

            //return false;
         });
    },
    procesoQuitarSucursal:function() {
         $(document).on("click", "#btnQuitar", function (e) {
             e.preventDefault();
             var haySeleccionados = false;
             $('#selQuitarSucursal option').each(function() {
                 if (this.selected)
                     haySeleccionados = true;
             });

             if( !haySeleccionados ) {
                 alert("Debe seleccionar algo.");
                 return false;
             }

             $("#selQuitarSucursal option:selected").each(function(item){
                // $("<option value='" + procesarUsuSucursal.idSucursales[$(this).val()] + "'>" + $(this).text() + "</option>").appendTo("#selAgregarSucursal");
                 procesarUsuSucursal.idSucursales[$(this).val()] = null; //Oculta los elementos del campo
                // console.log(procesarUsuSucursal.idSucursales);
             });

             procesarUsuSucursal.inpSucursalAgrega2 = [];
             procesarUsuSucursal.idSucursales.forEach(function (elemento, indice, array) {
                 if (procesarUsuSucursal.idSucursales[indice] != null){
                     procesarUsuSucursal.inpSucursalAgrega2.push(indice);
                 }
             });
             //Almaceno valores en el campo para la BD
             $("#inpSucursalAgrega").val(procesarUsuSucursal.inpSucursalAgrega2.toString());
             $("#selQuitarSucursal option:selected").remove();
         });
    },
    procesoGuardado: function () {
        var validaCampos = $(function () {//esto permite convertir todo el validate en una funcion
            $("#formUsuSucursal").validate({
                event: "blur",
                rules: {
                    inpNombre: {
                        required: true
                    },
                },
                messages: {
                    inpNombre: {
                        required: "Este campo es obligatorio.",
                    },
                }
                , debug: true
                , errorElement: "label"
                , submitHandler: function (form) {
                    var datosForm = $("#formUsuSucursal").serializeArray();

                    //Valido Manualmente
                    var selQuitarSucursal = $("#inpSucursalAgrega").val();
                    if( selQuitarSucursal == ""  || selQuitarSucursal.length == 0 ){
                        var str = procesarUsuSucursal.EstruturaMesajePeligro;
                        var respHtml = str.replace("i_mensaje", procesarUsuSucursal.mensajePeligro02);
                        $(".msjRespuesta").html(respHtml);
                        return false;
                    }else{
                        $(".msjRespuesta").html('');
                    }

                    $.ajax({
                        type: "POST",
                        url: baseUrl + "/controlactivos/index/procesar-admin-usu",
                        processData: true,
                        data: datosForm,
                        dataType: "json",
                        success: function (data) {
                            procesarUsuSucursal.metodoMensaje(data, 'btnGuardar', procesarUsuSucursal.mensajeExito01, procesarUsuSucursal.mensajePeligro01, 'msjRespuesta');
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
    metodoMensaje: function (data, bonton, mensajeExito, mensajeFalla, didResp ) {
        if (data.valida == 'true') {
            var str = procesarUsuSucursal.EstruturaMesajeExito;
            var respHtml = str.replace("i_mensaje", mensajeExito);
            $("." + didResp).html(respHtml);
            $("#" + bonton).attr('disabled', 'disable');
            //Refresco Datatable
            procesarUsuSucursal.table.ajax.reload();
            $( ".md-close" ).trigger( "click" );
        }
        if (data.valida == 'false') {
            var str = procesarUsuSucursal.EstruturaMesajePeligro;
            var respHtml = str.replace("i_mensaje", mensajeFalla1);
            $("." + didResp).html(respHtml);
        }
    },
    procesoLimpiar: function () {
        $(document).on("click", "#btnRegistrar", function () {
            document.getElementById("formUsuSucursal").reset();
            $(".msjRespuesta").html(" ");
            $("#selQuitarSucursal option").remove();

            $("#inpSucursalAgrega").val("");
            $("#btnGuardar").removeAttr("disabled");
            $("#form-bp1").removeClass("colored-header-primary");
            $("#form-bp1").addClass("colored-header-success");
            $("#btnGuardar").removeClass("btn-primary");
            $("#btnGuardar").addClass("btn-success");
            $("#btnGuardar").html("Registrar");
            $("#bntTitulomodal").html("Registrar sucursales");
            $("#icoTitulo").removeClass("mdi-edit");
            $("#icoTitulo").addClass("mdi-collection-plus");
            $("#inpNombre").removeAttr('disabled');
            procesarUsuSucursal.inpSucursalAgrega = [];
            procesarUsuSucursal.idSucursales = [];

        });

    },

};
procesarUsuSucursal.init();