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

    loadGridData_BA();
});

function onModalClose() {
    $('#gridData_BA').data('kendoGrid').dataSource.read()
    $("#gridData_BA").data("kendoGrid").refresh();

    $("#dv_add").empty();
}

function loadGridData_BA() {
    if ($("#gridData_BA").data().kendoGrid != null) {
        $("#gridData_BA").data().kendoGrid.destroy();
        $("#gridData_BA").empty();
    } // pembuatan grid
    var gridBarang = $("#gridData_BA").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: $("#urlPath").val() + "/Planning/GetPlan",
                    contentType: "application/json",
                    type: "POST",
                    cache: false
                },
                create: {
                    url: $("#urlPath").val() + "/Planning/CreatePlan",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert(data.responseJSON.remarks);
                            $("#gridData_BA").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.responseJSON.remarks);
                        }
                    }
                },
                update: {
                    url: $("#urlPath").val() + "/Planning/UpdatePlan",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dirubah");
                            $("#gridData_BA").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                destroy: {
                    url: $("#urlPath").val() + "/Planning/DeletePlan",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            alert("data berhasil dihapus");
                            $("#gridData_BA").data("kendoGrid").dataSource.read();
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
                        Tanggal: { type: "string", filterable: true, sortable: true },
                        Shift: { type: "int", filterable: true, sortable: true, editable: true },
                        Inventory: { type: "int", filterable: true, sortable: true, editable: true },
                        Seam: { type: "string", filterable: true, sortable: true, editable: true },
                        Block: { type: "string", filterable: true, sortable: true, editable: true },
                        Strip: { type: "string", filterable: true, sortable: true, editable: true },
                        Seam: { type: "string", filterable: true, sortable: true, editable: true },
                        Ash: { type: "string", filterable: true, sortable: true, editable: true },
                        Tm: { type: "string", filterable: true, sortable: true, editable: true },
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
        columns: [
            {
                title: "Id",
                width: "10px",
                template: "#= ++RecNumerEq #",
                filterable: false,
                sortable: false,
                editable: false,
            },
            {
                field: "Tanggal",
                title: "Tanggal",
                width: "20px",
            },
            { field: "Cpp", title: "CPP", width: "20px" },
            { field: "Material", title: "Material", width: "20px" },
            { field: "Tonage", title: "Tonage", width: "20px" },
            { field: "Tm", title: "TM", width: "14px" },
            {
                field: "Im",
                title: "IM",
                width: "14px"
            },
            { field: "Ash", title: "ASH", width: "16px" },
            {
                field: "Vm",
                title: "VM",
                width: "14px"
            },
            { field: "Fc", title: "FC", width: "14px" },
            { field: "Ts", title: "TS", width: "14px" },
            { field: "Cva", title: "CVA", width: "16px" },
            { field: "Cvd", title: "CVD", width: "16px" },
            { field: "Ri", title: "RI", width: "14px" },
            { field: "Hgi", title: "HGI", width: "16px" },
            { field: "Csn", title: "CSN", width: "16px" },
            {
                command: [
                    {
                        name: "edit",
                        text: "Edit",
                    },
                    { name: "destroy", text: "Remove" },
                ],
                title: "ACTION", width: "50px"
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
    win.title("INPUT PLANNING");
    win.refresh({ url: $("#urlPath").val() + "/BeritaAcara/InsertBA" });

    win.open().maximize();
}