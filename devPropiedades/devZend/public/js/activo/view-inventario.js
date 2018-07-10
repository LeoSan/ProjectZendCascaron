var procesarInventario = {
    table:'',
    init: function () {
        procesarInventario.cargaDatos();
        procesarInventario.procesoBitacora();
        procesarInventario.procesoMuestra();

    },// fin init
    cargaDatos:function () {
        $(document).ready( function () {
            var idSolicitud = procesarInventario.obtenerCvetra();
            var idEstatus = '5';
            var idPerfil = 'USU';

            procesarInventario.table =  $('#dt_tabla').DataTable( {
                processing: false, // esto permite realizar busqueda conectado con el servidor
                serverSide: false, // esto permite realizar busqueda conectado con el servidor
                ajax: {
                    url: baseUrl + "/controlactivos/index/obtener-json-inventario",
                    dataSrc: 'data',
                    data: {
                        idSolicitud: idSolicitud, idEstatus:idEstatus,perfil:idPerfil
                    }
                },
                columns: [
                    { data: "FECHA_SOLICITUD",orderable: true, "width": "5%"  },
                    { data: "ID_TRACKING",orderable: true, "width": "5%"  },
                    { data: "TIPO_ACTIVO",orderable: true, "width": "5%"  },
                    { data: "MOTIVO_SOLICITUD",orderable: true, "width": "5%"  },
                    { data: "NOM_ESTATUS",orderable: true, "width": "5%"  },
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
                aaSorting: [[ 0, "desc" ]],

            } );

            //Permite agregar los campos para ser filtrados
            $('#dt_tabla thead th').each( function (i) {

                if (i < 5 ){
                    var title = $(this).text();
                    $(this).html( '<input type="text" class="form-control" placeholder=" '+title+'" />' );
                }

            });

            procesarInventario.table.columns().every( function () {
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
    procesoMuestra: function () {
        $(document).on("click", ".btnDetalle", function () {

            var inpCategoria = $(this).attr("data-categoria_activo");
            var inpTipoActivo = $(this).attr("data-tipo_activo");
            var inpMotivo = $(this).attr("data-MOTIVO_SOLICITUD");

            var inpCantidad = $(this).attr("data-cantidad");
            var inpTipoAsignacion = $(this).attr("data-tipo_activo");
            var inpEstadoFisico = $(this).attr("data-ESTADO_FISICO");

            var inpMarca = $(this).attr("data-MARCA");
            var inpModelo = $(this).attr("data-MODELO");
            var inpCodBarra = $(this).attr("data-COD_BARRA");

            var inpNumSerie = $(this).attr("data-NUM_SERIE");
            var inpProveedor = $(this).attr("data-nom_proveedor");
            var inpFechaCompra = $(this).attr("data-FECHA_COMPRA");

            var inpNumFactura = $(this).attr("data-NUM_FACTURA");
            var inpSucursal = $(this).attr("data-tipo_activo");
            var inpDes = $(this).attr("data-desc_activo");
            var inpSucursal = $(this).attr("data-SUCURSAL");



            $("#inpCategoria").val(inpCategoria);
            $("#inpTipoActivo").val(inpTipoActivo);
            $("#inpMotivo").val(inpMotivo);

            $("#inpCantidad").val(inpCantidad);
            $("#inpTipoAsignacion").val(inpTipoAsignacion);
            $("#inpEstadoFisico").val(inpEstadoFisico);

            $("#inpMarca").val(inpMarca);
            $("#inpModelo").val(inpModelo);
            $("#inpCodBarra").val(inpCodBarra);

            $("#inpNumSerie").val(inpNumSerie);
            $("#inpProveedor").val(inpProveedor);
            $("#inpFechaCompra").val(inpFechaCompra);

            $("#inpNumFactura").val(inpNumFactura);
            $("#inpSucursal").val(inpSucursal);
            $("#inpDes").val(inpDes);


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
    obtenerCvetra:function () {
        var val = $("#idEmpleado").val();
        return val;
    },

};
procesarInventario.init();