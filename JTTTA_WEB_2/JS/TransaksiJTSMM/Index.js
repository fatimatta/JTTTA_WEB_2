//----dataset

var ds_jt = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/TransaksiJTSMM/ListJT",
            contentType: "application/json",
            type: "POST"
        },
        parameterMap: function (data, operation) {
            return kendo.stringify(data)
        }
    },
    schema: {
        data: "Data",
        total: "Total"
    },
});

var ds_material = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/TransaksiJTSMM/ListMaterial",
            contentType: "application/json",
            type: "POST"
        },
        parameterMap: function (data, operation) {
            return kendo.stringify(data)
        }
    },
    schema: {
        data: "Data",
        total: "Total"
    },
});


var ds_pit = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/TransaksiJTSMM/ListPit",
            contentType: "application/json",
            type: "POST"
        },
        parameterMap: function (data, operation) {
            return kendo.stringify(data)
        }
    },
    schema: {
        data: "Data",
        total: "Total"
    },
});


var ds_shift = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/TransaksiJTSMM/ListShift",
            contentType: "application/json",
            type: "POST"
        },
        parameterMap: function (data, operation) {
            return kendo.stringify(data)
        }
    },
    schema: {
        data: "Data",
        total: "Total"
    },
});

var ds_condition = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/TransaksiJTSMM/ListCondition",
            contentType: "application/json",
            type: "POST"
        },
        parameterMap: function (data, operation) {
            return kendo.stringify(data)
        }
    },
    schema: {
        data: "Data",
        total: "Total"
    },
});

var ds_destination = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/TransaksiJTSMM/ListDestination",
            contentType: "application/json",
            type: "POST"
        },
        parameterMap: function (data, operation) {
            return kendo.stringify(data)
        }
    },
    schema: {
        data: "Data",
        total: "Total"
    },
});


var ds_unit = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/TransaksiJTSMM/ListUnit",
            contentType: "application/json",
            type: "POST"
        },
        parameterMap: function (data, operation) {
            return kendo.stringify(data)
        }
    },
    schema: {
        data: "Data",
        total: "Total"
    },
});

//-----end dataset


//----function


$(document).ready(function () {
    //loadGrid();

    $("#txt_tglparam").kendoDatePicker({
        value: new Date(),
        dateInput: true,
        format: "yyyyMMdd"
    });

    $("#txt_type").kendoDropDownList({
        dataSource: 
            [
                { text: "Block", value: "Block" },
                { text: "Seam", value: "Seam" },
                { text: "Elevasi", value: "Elevasi" }
            ]
        ,
        dataTextField: "text",
        dataValueField: "value"
    }).data("kendoDropDownList");

    loadGridData(" ");




    $("#dv_add").kendoWindow({
        //width: 1200,
        //height: 500,
        iframe: true,
        modal: true,
        resizable: true,
        close: onModalClose,
        visible: false,
        actions: [
            "Maximize",
            "Close"
        ],
    }).data("kendoWindow");

});


function loadGridData(sTgl) {
    var tgl_param;
    if (sTgl.length < 5) {
        tgl_param = $("#txt_tglparam").val();
    } else {
        tgl_param = $("#txt_tglparam").val();
    }



    if ($("#gridData").data().kendoGrid != null) {
        $("#gridData").data().kendoGrid.destroy();
        $("#gridData").empty();
    }

    // pembuatan grid
    var gridBarang = $("#gridData").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: $("#urlPath").val() + "/TransaksiJTSMM/readTransaction",
                    contentType: "application/json",
                    type: "POST",
                    cache: false

                },
                //create: {
                //    url: $("#urlPath").val() + "/Position/managePosition",
                //    contentType: "application/json",
                //    type: "POST",
                //    complete: function (data) {
                //        if (data.status) {
                //            alert(data.responseJSON.remarks);
                //            $("#grid").data("kendoGrid").dataSource.read();
                //        } else {
                //            alert(data.responseJSON.remarks);
                //        }
                //    }
                //},

                update: {
                    url: $("#urlPath").val() + "/TransaksiJTSMM/updateTransaction",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dirubah");
                            $("#gridData").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                //destroy: {
                //    url: $("#urlPath").val() + "/Dokumen/deleteDokumen",
                //    contentType: "application/json",
                //    type: "POST",
                //    complete: function (data) {
                //        if (data.status) {
                //            alert("data berhasil dihapus");
                //            $("#gridData").data("kendoGrid").dataSource.read();
                //        } else {
                //            alert(data.remarks);
                //        }
                //    }
                //},
                parameterMap: function (data, operation) {

                    //if (operation == "create") {
                    //    data.s_process = "i";
                    //} else if (operation == "update") {
                    //    data.s_process = "u";
                    //} else if (operation == "destroy") {
                    //    data.s_process = "d";
                    //}

                    //if (data.ID_POSITION == '') {
                    //    data.ID_POSITION = $("input[name='ID_POSITION']").val();
                    //}

                    //if (data.DEPT_DESC == '' || data.DEPT_DESC == null) {
                    //    data.DEPT_DESC = $("input[name='DEPT_DESC']").val();
                    //}

                    data.sTgl = tgl_param;


                    //console.log('Parameter sent :' + kendo.stringify(data));
                    //console.log($("input[name='ID_POSITION']").val());
                    //console.log($("input[name='DEPT_DESC']").val());
                    return kendo.stringify(data);
                    //return { models: kendo.stringify(data) };

                }
            },
            //group: {
            //    field: "SURAT_TYPE",
            //    dir: "asc"
            //},
            pageSize: 50, //jumlah row dalam grid
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    id: "TRANS_RAW_ID",
                    fields: {
                          TRANS_TGL_PRODUKSI: { type: "string", filterable: true, sortable: true, editable: false }
                        , TRANS_SHIFT: { type: "string", filterable: true, sortable: true, editable: false }
                        , TRANS_DOCKET_NO: { type: "string", filterable: true, sortable: true, editable: false}
                        , TRANS_COAL_NUMBER: { type: "string", filterable: true, sortable: true, editable: false}
                        , TRANS_PIT: { type: "string", filterable: true, sortable: true }
                        , PIT_NAME: { type: "string", filterable: true, sortable: true}
                        , TRANS_BLOCK: { type: "string", filterable: true, sortable: true }
                        , TRANS_ELEVASI: { type: "string", filterable: true, sortable: true }
                        , TRANS_SEAM: { type: "string", filterable: true, sortable: true }
                        , TRANS_RAW: { type: "string", filterable: true, sortable: true }
                        , MATERIAL_NAME: { type: "string", filterable: true, sortable: true }
                        , TRANS_EXCAVATOR: { type: "string", filterable: true, sortable: true }
                        , TRANS_DESTINATION: { type: "string", filterable: true, sortable: true }
                        , DEST_NAME: { type: "string", filterable: true, sortable: true }
                        , TRANS_CONDITION: { type: "string", filterable: true, sortable: true }
                        , COND_NAME: { type: "string", filterable: true, sortable: true }
                        , TRANS_NO_UNIT: { type: "string", filterable: true, sortable: true }
                        , TRANS_GROSS: { type: "number", filterable: true, sortable: true }
                        , TRANS_TARE: { type: "number", filterable: true, sortable: true }
                        , TRANS_NETTO: { type: "number", filterable: true, sortable: true, editable: false }
                        , TRANS_JT_NAME: { type: "string", filterable: true, sortable: true, editable: false }
                        , TRANS_DATETIME: { type: "datetime", filterable: true, sortable: true, editable: false }
                        , TRANS_UPDATE_AT: { type: "date", filterable: true, sortable: true, editable: false}
                        , TRANS_OPERATOR: { type: "string", filterable: true, sortable: true, editable: false }
                        , TRANS_STARTTIMBANG: { type: "datetime", filterable: true, sortable: true, editable: false }
                        , TRANS_SOURCE: { type: "string", filterable: true, sortable: true, editable: false }
                    }
                }
            }
        },
        height: 600, //tinggi grid
        //selectable: true,
        filterable: {
            extra: false,
            operators: {
                string: { contains: "Contains" }
            }
        },
        sortable: true,
        editable: "inline",
        groupable: true,
        pageable: {
            refresh: true,
            buttonCount: 10,
            input: true,
            pageSizes: [5, 10, 20, 50, 100, 1000],
            info: true,
            messages: {
            }
        },
        //navigatable: true,
        selectable: 'multiple row',
        persistSelection: true,
        excel: {
            allPages: true
        },
        excelExport: function (e) {
            var sheet = e.workbook.sheets[0];

            for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
                var row = sheet.rows[rowIndex];
                for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                    row.cells[row.cells.length-1].format = "yyyy-MM-dd HH:mm:ss"
                }
            }
        },
        toolbar: [{ name: "btn_tambah", template: "<button class=' btn btn-info' onclick='btn_add_onclick()'>Input Transaksi</button>" }, "excel"],
        
        //toolbar: [//"create"
        //   // { name: "btn_tambah", template: "<button class='k-button' onclick='btn_add_onclick()'>Add new record</button>" }
        //    //{ name: "cmb_Dept", template: "<div style='float:right'>Pilih Dept : <input type=text id='cmb_Dept'></div>" },
        //    //{ name: "cmb_District", template: "<div style='float:right'>Pilih District : <input type=text id='cmb_District'></div>" }
        //],
        columns: [
            {
                selectable: true,
                width: "50px"
            },
            {
                command: [
                    "edit"
                    //{ text: " Reset", click: btn_reset_onclick },
                    //"destroy"],
                ],
                title: "ACTION", width: "100px"
            },
            {
                title: "No.",
                width: "30px",
                template: "#= ++RecNumerEq #",
                filterable: false,
                sortable: false,
                editable: false,
            },
           
            { field: "TRANS_TGL_PRODUKSI", title: "Tanggal", width: "100px" },
            { field: "TRANS_SHIFT", title: "Shift", width: "100px" },
            { field: "TRANS_DOCKET_NO", title: "No Docket", width: "40px" },
            { field: "PIT_NAME", title: "Pit", editor: editor_pit },
            { field: "TRANS_BLOCK", title: "Block" },
            //, template: "#= kendo.toString(kendo.parseDate(TransactionDateLoading), 'dd-MM-yyyy HH:mm') #"
            { field: "TRANS_ELEVASI", title: "Elevasi", /*editor: editor_product*/ },
            { field: "TRANS_SEAM", title: "Seam", /*editor: editor_loader*/ },
            { field: "MATERIAL_NAME", title: "Material", editor: editor_material },
            { field: "TRANS_EXCAVATOR", title: "Loader", /*editor: editor_destination*/ },
            { field: "DEST_NAME", title: "Room", editor: editor_destination },
            { field: "COND_NAME", title: "Condition", editor: editor_condition },
            { field: "TRANS_NO_UNIT", title: "Unit", editor: editor_unit },
            { field: "TRANS_GROSS", title: "Gross" },
            { field: "TRANS_TARE", title: "Tare" },
            { field: "TRANS_NETTO", title: "Netto" },
	    { field: "TRANS_JT_NAME", title: "JT Name" },
            { field: "TRANS_UPDATE_AT", title: "Jam Timbang", template: "#= kendo.toString(kendo.parseDate(TRANS_UPDATE_AT), 'dd-MM-yyyy HH:mm') #" }
           



        ],
        edit: function (e) {
            if (!e.model.isNew()) {
                //$("input[id='cmb_district']").kendoDropDownList().enable(false);
                //$("#cmb_district").data("kendoDropDownList").enable(false);
                $("input[name='TRANS_TGL_PRODUKSI']").attr("disabled", true);
                $("input[name='TRANS_SHIFT']").attr("disabled", true);
                $("input[name='TRANS_DOCKET_NO']").attr("disabled", true);
                $("input[name='PIT_NAME']").attr("disabled", true);
                $("input[name='TRANS_NETTO']").attr("disabled", true);
                $("input[name='TRANS_UPDATE_AT']").attr("disabled", true);
                

                //$("#DEPT_CODE").data("kendoTextBox").enable(false);
            }

            //if (e.model.isNew()) {
            //    $("input[name='DOK_NUMBER']").attr("disabled", true);
            //}
        },    
        dataBinding: function () {
            window.RecNumerEq = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        }
    });
}

function editor_pit(container, options) {
    $('<input id="cmb_pit" data-text-field="PIT_NAME" data-value-field="PIT_CODE" data-bind="value:TRANS_PIT"/>')
        .appendTo(container)
        .kendoDropDownList({
            dataSource: ds_pit,
            dataTextField: "PIT_NAME",
            dataValueField: "PIT_CODE"
        }).data("kendoDropDownList");
}

function editor_material(container, options) {
    $('<input id="cmb_material" data-text-field="MATERIAL_NAME" data-value-field="MATERIAL_CODE" data-bind="value:TRANS_RAW"/>')
        .appendTo(container)
        .kendoDropDownList({
            dataSource: ds_material,
            dataTextField: "MATERIAL_NAME",
            dataValueField: "MATERIAL_CODE"
        }).data("kendoDropDownList");
}

function editor_destination(container, options) {
    $('<input id="cmb_destination" data-text-field="DEST_NAME" data-value-field="DEST_CODE" data-bind="value:TRANS_DESTINATION"/>')
        .appendTo(container)
        .kendoDropDownList({
            dataSource: ds_destination,
            dataTextField: "DEST_NAME",
            dataValueField: "DEST_CODE"
        }).data("kendoDropDownList");
}

function editor_condition(container, options) {
    $('<input id="cmb_condition" data-text-field="COND_NAME" data-value-field="COND_CODE" data-bind="value:TRANS_CONDITION"/>')
        .appendTo(container)
        .kendoDropDownList({
            dataSource: ds_condition,
            dataTextField: "COND_NAME",
            dataValueField: "COND_CODE"
        }).data("kendoDropDownList");
}

function editor_unit(container, options) {
    $('<input id="cmb_unit" data-text-field="UNIT_NO" data-value-field="UNIT_NO" data-bind="value:TRANS_NO_UNIT"/>')
        .appendTo(container)
        .kendoDropDownList({
            dataSource: ds_unit,
            dataTextField: "UNIT_NO",
            dataValueField: "UNIT_NO"
        }).data("kendoDropDownList");
}

//----end function


//----event handler


function btn_search_onclick() {
    var tgl = $("#txt_tglparam").val();


    if (tgl.length < 5) {
        alert("Isikan tanggal dengan benar");
    } else {
        loadGridData(tgl);
    }
}

function onModalClose() {
    //loadGridSurat();
    $('#gridData').data('kendoGrid').dataSource.read()
    $("#gridData").data("kendoGrid").refresh();

    $("#dv_add").empty();
}


function btn_add_onclick() {
    var win = $("#dv_add").data("kendoWindow");
    win.title("INPUT TRANSAKSI");
    win.refresh({ url: $("#urlPath").val() + "/TransaksiJTSMM/InsertTrans" });

    //win.center().open('width = 1800, height = 900, scrollbars=no, resizable=no');
    win.open().maximize();
}


function cekdata() {
    var list = new Array();
    
    var rows = $('#gridData').data('kendoGrid').select();

    
    //console.log(rows.length);

    if (rows.length > 0 && $("#txt_value").val().trim().length != 0) {

        if (confirm('Yakin akan mengedit ' + rows.length +' data ' + $("#txt_type").val() +'')) {
            rows.each(function (e) {
                var grid = $("#gridData").data("kendoGrid");
                var dataItem = grid.dataItem(this).TRANS_RAW_ID;

                list.push(dataItem);

                

            })

            update_data(list);

        }

        
    } else {
        alert('Tidak ada data yang dipilih / Nilai ubahan kosong');
    }

    
        
}


function update_data(list) {


    var _param = {
        s_id: list,
        s_type: $("#txt_type").val(),
        s_value: $("#txt_value").val()
    };


    $.ajax({
        type: "POST",
        url: $("#urlPath").val() + "/TransaksiJTSMM/updateBlokData",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(_param),
        success: function (response) {
            if (response.status == true) {
                alert(response.remark)
                //console.log(JSON.stringify(_param));
                //window.parent.$("#dv_add").data("kendoWindow").close()
                
            }
            else {
                console.log(response);
                alert("Error Message: " + response.error);
                
            }

            $("#gridData").data("kendoGrid").dataSource.read();
        }
    })
}


//-----end event handler