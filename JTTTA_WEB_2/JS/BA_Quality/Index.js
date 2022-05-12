$(document).ready(function () {
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

    loadGridData_Quality();
});


function onModalClose() {
    $('#gridData_Quality').data('kendoGrid').dataSource.read()
    $("#gridData_Quality").data("kendoGrid").refresh();

    $("#dv_add").empty();
}

var data_rom = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/BA_Quality/GetRom",
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

var data_material = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/Planning/GetMaterial",
            contentType: "application/json",
            type: "POST"
        },
        parameterMap: function (data, operation) {
            //list: data;
            console.log('print data', data);
            return kendo.stringify(data)
        }
    },
    schema: {
        data: "Data",
        total: "Total"
    },
});

function editor_rom(container, options) {
    $('<input id="cmb_rom" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            valuePrimitive: true,
            dataSource: data_rom,
            dataTextField: "ROM_NAME",
            dataValueField: "ROM_NAME",
            autoBind: false
        }).data("kendoDropDownList");
}

function editor_material(container, options) {
    $('<input id="cmb_mat" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            height: 500,
            valuePrimitive: true,
            dataSource: data_material,
            dataTextField: "MATERIAL_NAME",
            dataValueField: "MATERIAL_NAME",
            autoBind: false
        }).data("kendoDropDownList");
}

function editor_tgl(container, options) {
    $('<input type="text" data-bind="value:Tanggal"/>')
        .appendTo(container)
        .kendoDatePicker({
            format: "yyyy-MM-dd",
            value: kendo.toString(new Date(options.model.Tanggal), 'yyyy-MM-dd')
        });
}

function loadGridData_Quality() {
    if ($("#gridData_Quality").data().kendoGrid != null) {
        $("#gridData_Quality").data().kendoGrid.destroy();
        $("#gridData_Quality").empty();
    }
    // pembuatan grid
    var gridQuality = $("#gridData_Quality").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: $("#urlPath").val() + "/BA_Quality/GetQuality",
                    contentType: "application/json",
                    type: "POST",
                    cache: false
                },                
                update: {
                    url: $("#urlPath").val() + "/BA_Quality/UpdateQuality",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dirubah");
                            $("#gridData_Quality").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                destroy: {
                    url: $("#urlPath").val() + "/BA_Quality/DeleteQuality",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            var grid = $("#gridData_Quality").data("kendoGrid");
                            grid.refresh();
                            alert("data berhasil dihapus");
                            $("#gridData_Quality").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                parameterMap: function (data, operation) {
                    return kendo.stringify(data);
                }
            },
            pageSize: 50, //jumlah row dalam grid
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    id: "Id",
                    fields: {
                        Id: { type: "number", filterable: true, sortable: true },
                        Tanggal: { type: "string", filterable: true, sortable: true, editable: true },
                        ROM_NAME: { type: "string", filterable: true, sortable: true, editable: true },
                        MATERIAL_NAME: { type: "string", filterable: true, sortable: true, editable: true },

                        TM: { type: "number", filterable: true, sortable: true, editable: true },
                        IM: { type: "number", filterable: true, sortable: true, editable: true },
                        ASH: { type: "number", filterable: true, sortable: true, editable: true },
                        VM: { type: "number", filterable: true, sortable: true, editable: true },
                        FC: { type: "number", filterable: true, sortable: true, editable: true },
                        TS: { type: "number", filterable: true, sortable: true, editable: true },
                        CVA: { type: "number", filterable: true, sortable: true, editable: true },
                        CVD: { type: "number", filterable: true, sortable: true, editable: true },
                        RD: { type: "number", filterable: true, sortable: true, editable: true },
                        HGI: { type: "number", filterable: true, sortable: true, editable: true },
                        CSN: { type: "number", filterable: true, sortable: true, editable: true },
                        IS: { type: "number", filterable: true, sortable: true, editable: true },
                        MC: { type: "number", filterable: true, sortable: true, editable: true },
                        MD: { type: "number", filterable: true, sortable: true, editable: true },
                        ML: { type: "number", filterable: true, sortable: true, editable: true },
                        FF: { type: "number", filterable: true, sortable: true, editable: true },
                        SO: { type: "number", filterable: true, sortable: true, editable: true },
                        PR: { type: "number", filterable: true, sortable: true, editable: true },
                    }
                }
            }
        },
        //height: "300", //tinggi grid
        //width: "100%",
        //selectable: true,
        filterable: {
            extra: false,
            operators: {
                string: { contains: "Contains" }
            }
        },
        sortable: true,
        editable: "inline",
        //edit: onEdit,
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
        //persistSelection: true,
        toolbar: [{ name: "btn_tambah", template: "<button class = 'btn btn-info' onclick='btn_add_onclick()'>Add</button>" }],
        //scrollable: {
        //    endless: true
        //},
        columns: [
            {
                title: "Id",
                width: "40px",
                template: "#= ++RecNumerEq #",
                filterable: false,
                sortable: false,
                editable: false,
                locked: true,
                lockable: false
            },
            {
                field: "Tanggal",
                title: "Tanggal",
                width: "100px",
                format: "{0: yyyy-MM-dd}",
                template: "#= kendo.toString(kendo.parseDate(Tanggal), 'yyyy-MM-dd') #",
                locked: true,
                editor: editor_tgl
            },
            {
                field: "ROM_NAME",
                title: "ROM",
                width: "100px",
                locked: true,
                editor: editor_rom
            },
            {
                field: "MATERIAL_NAME",
                title: "Material",
                width: "100px",
                locked: true,
                editor: editor_material
            },
            { field: "TM", title: "TM", width: "80px" },
            { field: "IM", title: "IM", width: "80px" },
            { field: "ASH", title: "ASH", width: "80px" },
            { field: "VM", title: "VM", width: "80px" },
            { field: "FC", title: "FC", width: "80px" },
            { field: "TS", title: "TS", width: "80px" },
            { field: "CVA", title: "CVA", width: "90px" },
            { field: "CVD", title: "CVD", width: "90px" },
            { field: "RD", title: "RD", width: "80px" },
            { field: "HGI", title: "HGI", width: "90px" },
            { field: "CSN", title: "CSN", width: "90px" },
            { field: "IS", title: "IS", width: "80px" },
            { field: "MC", title: "MC", width: "80px" },
            { field: "MD", title: "MD", width: "80px" },
            { field: "ML", title: "ML", width: "80px" },
            { field: "FF", title: "FF", width: "80px" },
            { field: "SO", title: "SO", width: "80px" },
            { field: "PR", title: "PR", width: "80px" },
            {
                command: [
                    {
                        name: "edit",
                        text: "Edit",
                    },
                    { name: "destroy", text: "Remove" },
                ],
                title: "ACTION", width: "180px", locked: true
            }
        ],
        edit: function (e) {
            if (!e.model.isNew()) {
                $("input[name='Id']").attr("disabled", true);
            }
        },
        dataBinding: function () {
            window.RecNumerEq = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        }
    });
}

function btn_add_onclick() {
    var win = $("#dv_add").data("kendoWindow");
    win.title("INPUT BA Quality");
    win.refresh({ url: $("#urlPath").val() + "/BA_Quality/InputQuality" });

    win.open().maximize();
}