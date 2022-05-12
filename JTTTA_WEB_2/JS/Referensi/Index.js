

$(document).ready(function () {
    loadGridData_Pit();
    loadGridData_JT();
    loadGridData_Destination();
    loadGridData_Material();
    loadGridData_Condition();

});


function loadGridData_Pit() {


    if ($("#gridData_Pit").data().kendoGrid != null) {
        $("#gridData_Pit").data().kendoGrid.destroy();
        $("#gridData_Pit").empty();
    }

    // pembuatan grid
    var gridBarang = $("#gridData_Pit").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: $("#urlPath").val() + "/Referensi/readRef_Pit",
                    contentType: "application/json",
                    type: "POST",
                    cache: false

                },
                create: {
                    url: $("#urlPath").val() + "/Referensi/insert_Pit",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert(data.responseJSON.remarks);
                            $("#gridData_Pit").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.responseJSON.remarks);
                        }
                    }
                },

                update: {
                    url: $("#urlPath").val() + "/Referensi/update_Pit",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dirubah");
                            $("#gridData_Pit").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                destroy: {
                    url: $("#urlPath").val() + "/Referensi/delete_Pit",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dihapus");
                            $("#gridData_Pit").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
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

                    //data.sTgl = tgl_param;


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
                    id: "PIT_CODE",
                    fields: {
                          PIT_CODE: { type: "string", filterable: true, sortable: true }
                        , PIT_NAME: { type: "string", filterable: true, sortable: true, editable: true }
                     
                    }
                }
            }
        },
        height: 300, //tinggi grid
        //selectable: true,
        filterable: {
            extra: false,
            operators: {
                string: { contains: "Contains" }
            }
        },
        sortable: true,
        editable: "inline",
        //groupable: true,
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
        //selectable: 'multiple row',
        persistSelection: true,
        //excel: {
        //    allPages: true
        //},
        //excelExport: function (e) {
        //    var sheet = e.workbook.sheets[0];

        //    for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
        //        var row = sheet.rows[rowIndex];
        //        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
        //            row.cells[row.cells.length - 1].format = "yyyy-MM-dd HH:mm:ss"
        //        }
        //    }
        //},
        toolbar: ["create"],

        //toolbar: [//"create"
        //   // { name: "btn_tambah", template: "<button class='k-button' onclick='btn_add_onclick()'>Add new record</button>" }
        //    //{ name: "cmb_Dept", template: "<div style='float:right'>Pilih Dept : <input type=text id='cmb_Dept'></div>" },
        //    //{ name: "cmb_District", template: "<div style='float:right'>Pilih District : <input type=text id='cmb_District'></div>" }
        //],
        columns: [
            {
                command: [
                    "edit"
                    //{ text: " Reset", click: btn_reset_onclick },
                    ,"destroy"],
                
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

            { field: "PIT_CODE", title: "Code", width: "50px" },
            { field: "PIT_NAME", title: "Deskripsi", width: "80px" }      


        ],
        edit: function (e) {
            if (!e.model.isNew()) {
                //$("input[id='cmb_district']").kendoDropDownList().enable(false);
                //$("#cmb_district").data("kendoDropDownList").enable(false);
                $("input[name='PIT_CODE']").attr("disabled", true);
                //$("input[name='TRANS_SHIFT']").attr("disabled", true);
                //$("input[name='TRANS_DOCKET_NO']").attr("disabled", true);
                //$("input[name='PIT_NAME']").attr("disabled", true);
                //$("input[name='TRANS_NETTO']").attr("disabled", true);
                //$("input[name='TRANS_UPDATE_AT']").attr("disabled", true);


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




function loadGridData_JT() {


    if ($("#gridData_JT").data().kendoGrid != null) {
        $("#gridData_JT").data().kendoGrid.destroy();
        $("#gridData_JT").empty();
    }

    // pembuatan grid
    var gridBarang = $("#gridData_JT").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: $("#urlPath").val() + "/Referensi/readRef_JT",
                    contentType: "application/json",
                    type: "POST",
                    cache: false

                },
                create: {
                    url: $("#urlPath").val() + "/Referensi/insert_JT",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert(data.responseJSON.remarks);
                            $("#gridData_Pit").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.responseJSON.remarks);
                        }
                    }
                },

                update: {
                    url: $("#urlPath").val() + "/Referensi/update_JT",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dirubah");
                            $("#gridData_JT").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                destroy: {
                    url: $("#urlPath").val() + "/Referensi/delete_JT",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dihapus");
                            $("#gridData_JT").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                parameterMap: function (data, operation) {

                    //if (operation == "create") {
                    //    data.s_process = "i";
                    //} else if (operation == "update") {
                    //    data.s_process = "u";
                    //} else if (operation == "destroy") {
                    //    data.s_process = "d";
                    //}

                    //data.sTgl = tgl_param;


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
                    id: "JT_KODE",
                    fields: {
                        JT_KODE: { type: "string", filterable: true, sortable: true }
                        , JT_INSTANCE: { type: "string", filterable: true, sortable: true, editable: true }
                        , JT_AKTIF: { type: "string", filterable: true, sortable: true, editable: true }

                    }
                }
            }
        },
        height: 300, //tinggi grid
        //selectable: true,
        filterable: {
            extra: false,
            operators: {
                string: { contains: "Contains" }
            }
        },
        sortable: true,
        editable: "inline",
        //groupable: true,
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
        //selectable: 'multiple row',
        persistSelection: true,
        //excel: {
        //    allPages: true
        //},
        //excelExport: function (e) {
        //    var sheet = e.workbook.sheets[0];

        //    for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
        //        var row = sheet.rows[rowIndex];
        //        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
        //            row.cells[row.cells.length - 1].format = "yyyy-MM-dd HH:mm:ss"
        //        }
        //    }
        //},
        toolbar: ["create"],

        //toolbar: [//"create"
        //   // { name: "btn_tambah", template: "<button class='k-button' onclick='btn_add_onclick()'>Add new record</button>" }
        //    //{ name: "cmb_Dept", template: "<div style='float:right'>Pilih Dept : <input type=text id='cmb_Dept'></div>" },
        //    //{ name: "cmb_District", template: "<div style='float:right'>Pilih District : <input type=text id='cmb_District'></div>" }
        //],
        columns: [
            {
                command: [
                    "edit"
                    //{ text: " Reset", click: btn_reset_onclick },
                    , "destroy"],

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

            { field: "JT_KODE", title: "Code", width: "50px" },
            { field: "JT_INSTANCE", title: "Deskripsi", width: "100px" },
            { field: "JT_AKTIF", title: "Aktfi", width: "30px" }


        ],
        edit: function (e) {
            if (!e.model.isNew()) {
                //$("input[id='cmb_district']").kendoDropDownList().enable(false);
                //$("#cmb_district").data("kendoDropDownList").enable(false);
                $("input[name='JT_KODE']").attr("disabled", true);
                //$("input[name='TRANS_SHIFT']").attr("disabled", true);
                //$("input[name='TRANS_DOCKET_NO']").attr("disabled", true);
                //$("input[name='PIT_NAME']").attr("disabled", true);
                //$("input[name='TRANS_NETTO']").attr("disabled", true);
                //$("input[name='TRANS_UPDATE_AT']").attr("disabled", true);


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



function loadGridData_Destination() {


    if ($("#gridData_Destination").data().kendoGrid != null) {
        $("#gridData_Destination").data().kendoGrid.destroy();
        $("#gridData_Destination").empty();
    }

    // pembuatan grid
    var gridBarang = $("#gridData_Destination").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: $("#urlPath").val() + "/Referensi/readRef_Destination",
                    contentType: "application/json",
                    type: "POST",
                    cache: false

                },
                create: {
                    url: $("#urlPath").val() + "/Referensi/insert_Destination",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert(data.responseJSON.remarks);
                            $("#gridData_Destination").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.responseJSON.remarks);
                        }
                    }
                },

                update: {
                    url: $("#urlPath").val() + "/Referensi/update_Destination",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dirubah");
                            $("#gridData_Destination").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                destroy: {
                    url: $("#urlPath").val() + "/Referensi/delete_Destination",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dihapus");
                            $("#gridData_Destination").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                parameterMap: function (data, operation) {

                    //if (operation == "create") {
                    //    data.s_process = "i";
                    //} else if (operation == "update") {
                    //    data.s_process = "u";
                    //} else if (operation == "destroy") {
                    //    data.s_process = "d";
                    //}

                    //data.sTgl = tgl_param;


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
                    id: "DEST_CODE",
                    fields: {
                        DEST_CODE: { type: "string", filterable: true, sortable: true }
                        , DEST_NAME: { type: "string", filterable: true, sortable: true, editable: true }
                        

                    }
                }
            }
        },
        height: 300, //tinggi grid
        //selectable: true,
        filterable: {
            extra: false,
            operators: {
                string: { contains: "Contains" }
            }
        },
        sortable: true,
        editable: "inline",
        //groupable: true,
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
        //selectable: 'multiple row',
        persistSelection: true,
        //excel: {
        //    allPages: true
        //},
        //excelExport: function (e) {
        //    var sheet = e.workbook.sheets[0];

        //    for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
        //        var row = sheet.rows[rowIndex];
        //        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
        //            row.cells[row.cells.length - 1].format = "yyyy-MM-dd HH:mm:ss"
        //        }
        //    }
        //},
        toolbar: ["create"],

        //toolbar: [//"create"
        //   // { name: "btn_tambah", template: "<button class='k-button' onclick='btn_add_onclick()'>Add new record</button>" }
        //    //{ name: "cmb_Dept", template: "<div style='float:right'>Pilih Dept : <input type=text id='cmb_Dept'></div>" },
        //    //{ name: "cmb_District", template: "<div style='float:right'>Pilih District : <input type=text id='cmb_District'></div>" }
        //],
        columns: [
            {
                command: [
                    "edit"
                    //{ text: " Reset", click: btn_reset_onclick },
                    , "destroy"],

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

            { field: "DEST_CODE", title: "Code", width: "50px" },
            { field: "DEST_NAME", title: "Deskripsi", width: "100px" }


        ],
        edit: function (e) {
            if (!e.model.isNew()) {
                //$("input[id='cmb_district']").kendoDropDownList().enable(false);
                //$("#cmb_district").data("kendoDropDownList").enable(false);
                $("input[name='DEST_CODE']").attr("disabled", true);
                //$("input[name='TRANS_SHIFT']").attr("disabled", true);
                //$("input[name='TRANS_DOCKET_NO']").attr("disabled", true);
                //$("input[name='PIT_NAME']").attr("disabled", true);
                //$("input[name='TRANS_NETTO']").attr("disabled", true);
                //$("input[name='TRANS_UPDATE_AT']").attr("disabled", true);


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



function loadGridData_Material() {


    if ($("#gridData_Material").data().kendoGrid != null) {
        $("#gridData_Material").data().kendoGrid.destroy();
        $("#gridData_Material").empty();
    }

    // pembuatan grid
    var gridBarang = $("#gridData_Material").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: $("#urlPath").val() + "/Referensi/readRef_Material",
                    contentType: "application/json",
                    type: "POST",
                    cache: false

                },
                create: {
                    url: $("#urlPath").val() + "/Referensi/insert_Material",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert(data.responseJSON.remarks);
                            $("#gridData_Material").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.responseJSON.remarks);
                        }
                    }
                },

                update: {
                    url: $("#urlPath").val() + "/Referensi/update_Material",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dirubah");
                            $("#gridData_Material").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                destroy: {
                    url: $("#urlPath").val() + "/Referensi/delete_Material",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dihapus");
                            $("#gridData_Material").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                parameterMap: function (data, operation) {

                    //if (operation == "create") {
                    //    data.s_process = "i";
                    //} else if (operation == "update") {
                    //    data.s_process = "u";
                    //} else if (operation == "destroy") {
                    //    data.s_process = "d";
                    //}

                    //data.sTgl = tgl_param;


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
                    id: "MATERIAL_CODE",
                    fields: {
                        MATERIAL_CODE: { type: "string", filterable: true, sortable: true }
                        , MATERIAL_NAME: { type: "string", filterable: true, sortable: true, editable: true }


                    }
                }
            }
        },
        height: 300, //tinggi grid
        //selectable: true,
        filterable: {
            extra: false,
            operators: {
                string: { contains: "Contains" }
            }
        },
        sortable: true,
        editable: "inline",
        //groupable: true,
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
        //selectable: 'multiple row',
        persistSelection: true,
        //excel: {
        //    allPages: true
        //},
        //excelExport: function (e) {
        //    var sheet = e.workbook.sheets[0];

        //    for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
        //        var row = sheet.rows[rowIndex];
        //        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
        //            row.cells[row.cells.length - 1].format = "yyyy-MM-dd HH:mm:ss"
        //        }
        //    }
        //},
        toolbar: ["create"],

        //toolbar: [//"create"
        //   // { name: "btn_tambah", template: "<button class='k-button' onclick='btn_add_onclick()'>Add new record</button>" }
        //    //{ name: "cmb_Dept", template: "<div style='float:right'>Pilih Dept : <input type=text id='cmb_Dept'></div>" },
        //    //{ name: "cmb_District", template: "<div style='float:right'>Pilih District : <input type=text id='cmb_District'></div>" }
        //],
        columns: [
            {
                command: [
                    "edit"
                    //{ text: " Reset", click: btn_reset_onclick },
                    , "destroy"],

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

            { field: "MATERIAL_CODE", title: "Code", width: "50px" },
            { field: "MATERIAL_NAME", title: "Deskripsi", width: "100px" }


        ],
        edit: function (e) {
            if (!e.model.isNew()) {
                //$("input[id='cmb_district']").kendoDropDownList().enable(false);
                //$("#cmb_district").data("kendoDropDownList").enable(false);
                $("input[name='MATERIAL_CODE']").attr("disabled", true);
                //$("input[name='TRANS_SHIFT']").attr("disabled", true);
                //$("input[name='TRANS_DOCKET_NO']").attr("disabled", true);
                //$("input[name='PIT_NAME']").attr("disabled", true);
                //$("input[name='TRANS_NETTO']").attr("disabled", true);
                //$("input[name='TRANS_UPDATE_AT']").attr("disabled", true);


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



function loadGridData_Condition() {


    if ($("#gridData_Condition").data().kendoGrid != null) {
        $("#gridData_Condition").data().kendoGrid.destroy();
        $("#gridData_Condition").empty();
    }

    // pembuatan grid
    var gridBarang = $("#gridData_Condition").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: $("#urlPath").val() + "/Referensi/readRef_Condition",
                    contentType: "application/json",
                    type: "POST",
                    cache: false

                },
                create: {
                    url: $("#urlPath").val() + "/Referensi/insert_Condition",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert(data.responseJSON.remarks);
                            $("#gridData_Condition").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.responseJSON.remarks);
                        }
                    }
                },

                update: {
                    url: $("#urlPath").val() + "/Referensi/update_Condition",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dirubah");
                            $("#gridData_Condition").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                destroy: {
                    url: $("#urlPath").val() + "/Referensi/delete_Condition",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dihapus");
                            $("#gridData_Condition").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                parameterMap: function (data, operation) {

                    //if (operation == "create") {
                    //    data.s_process = "i";
                    //} else if (operation == "update") {
                    //    data.s_process = "u";
                    //} else if (operation == "destroy") {
                    //    data.s_process = "d";
                    //}

                    //data.sTgl = tgl_param;


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
                    id: "COND_CODE",
                    fields: {
                        COND_CODE: { type: "string", filterable: true, sortable: true }
                        , COND_NAME: { type: "string", filterable: true, sortable: true, editable: true }


                    }
                }
            }
        },
        height: 300, //tinggi grid
        //selectable: true,
        filterable: {
            extra: false,
            operators: {
                string: { contains: "Contains" }
            }
        },
        sortable: true,
        editable: "inline",
        //groupable: true,
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
        //selectable: 'multiple row',
        persistSelection: true,
        //excel: {
        //    allPages: true
        //},
        //excelExport: function (e) {
        //    var sheet = e.workbook.sheets[0];

        //    for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
        //        var row = sheet.rows[rowIndex];
        //        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
        //            row.cells[row.cells.length - 1].format = "yyyy-MM-dd HH:mm:ss"
        //        }
        //    }
        //},
        toolbar: ["create"],

        //toolbar: [//"create"
        //   // { name: "btn_tambah", template: "<button class='k-button' onclick='btn_add_onclick()'>Add new record</button>" }
        //    //{ name: "cmb_Dept", template: "<div style='float:right'>Pilih Dept : <input type=text id='cmb_Dept'></div>" },
        //    //{ name: "cmb_District", template: "<div style='float:right'>Pilih District : <input type=text id='cmb_District'></div>" }
        //],
        columns: [
            {
                command: [
                    "edit"
                    //{ text: " Reset", click: btn_reset_onclick },
                    , "destroy"],

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

            { field: "COND_CODE", title: "Code", width: "50px" },
            { field: "COND_NAME", title: "Deskripsi", width: "100px" }


        ],
        edit: function (e) {
            if (!e.model.isNew()) {
                //$("input[id='cmb_district']").kendoDropDownList().enable(false);
                //$("#cmb_district").data("kendoDropDownList").enable(false);
                $("input[name='COND_CODE']").attr("disabled", true);
                //$("input[name='TRANS_SHIFT']").attr("disabled", true);
                //$("input[name='TRANS_DOCKET_NO']").attr("disabled", true);
                //$("input[name='PIT_NAME']").attr("disabled", true);
                //$("input[name='TRANS_NETTO']").attr("disabled", true);
                //$("input[name='TRANS_UPDATE_AT']").attr("disabled", true);


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