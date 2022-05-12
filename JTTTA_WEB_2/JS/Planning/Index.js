$(document).ready(function () {
    var windowTemplate = kendo.template($("#windowTemplate").html());

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

    $("#txt_shift").kendoDropDownList({
        optionLabel: "Select Shift",
        dataTextField: "SHIFT_NAME",
        dataValueField: "SHIFT_NAME",
        dataSource: data_shift
    }).data("kendoDropDownList");    
        
    loadGridData_Plan();
});

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

var data_shift = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/Planning/GetShift",
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

function onModalClose() {
    $('#gridData_Plan').data('kendoGrid').dataSource.read()
    $("#gridData_Plan").data("kendoGrid").refresh();

    $("#dv_add").empty();
}

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

//var statusForColumnShift = data_shift.map(function (s) {
//    return {
//        value: s.SHIFT_NAME,
//        text: s.SHIFT_NAME
//    };
//});

function dropDownEditorShift(container, options) {
    var input = $('<input id="SHIFT_CODE" name="SHIFT_CODE" data-bind="SHIFT_NAME"/>');
    // append to the editor container
    input.appendTo(container);

    // initialize a dropdownlist
    input.kendoDropDownList({
        dataTextField: "SHIFT_NAME",
        dataValueField: "SHIFT_CODE",
        dataSource: data_shift // bind it to the brands array
    }).appendTo(container);
}

function editor_shift(container, options) {
    console.log('ini nih', container, options);
    $('<input id="cmb_shift" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            valuePrimitive: true,
            dataSource: data_shift,
            dataTextField: "SHIFT_NAME",
            dataValueField: "SHIFT_NAME",
            autoBind: false
            //index: 0
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

function loadGridData_Plan() {
    if ($("#gridData_Plan").data().kendoGrid != null) {
        $("#gridData_Plan").data().kendoGrid.destroy();
        $("#gridData_Plan").empty();
    }
    // pembuatan grid
    var griPlanning = $("#gridData_Plan").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: $("#urlPath").val() + "/Planning/GetPlan",
                    contentType: "application/json",
                    type: "POST",
                    cache: false
                },
                //create: {
                //    url: $("#urlPath").val() + "/Planning/CreatePlan",
                //    contentType: "application/json",
                //    type: "POST",
                //    complete: function (data) {
                //        if (data.status) {
                //            alert(data.responseJSON.remarks);
                //            $("#gridData_Plan").data("kendoGrid").dataSource.read();
                //        } else {
                //            alert(data.responseJSON.remarks);
                //        }
                //    }
                //},
                //update: {
                //    url: $("#urlPath").val() + "/Planning/UpdatePlan",
                //    contentType: "application/json",
                //    type: "POST",
                //    complete: function (data) {
                //        if (data.status) {
                //            //var grid = $("#gridData_Plan").data("kendoGrid");
                //            //grid.refresh();
                //            alert("data berhasil dirubah");
                //            $("#gridData_Plan").data("kendoGrid").dataSource.read();
                //        } else {
                //            alert(data.remarks);
                //        }
                //    }
                //},
                destroy: {              
                    url: $("#urlPath").val() + "/Planning/DeletePlan",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        if (data.status) {
                            var grid = $("#gridData_Plan").data("kendoGrid");
                            grid.refresh();
                            alert("data berhasil dihapus");
                            $("#gridData_Plan").data("kendoGrid").dataSource.read();
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
                        Id: { type: "string", filterable: true, sortable: true },
                        Tanggal: { type: "string", filterable: true, sortable: true, editable: true },
                        //SHIFT_NAME: { type: "string", filterable: true, sortable: true, editable: true },
                        Inventory: { type: "number", filterable: true, sortable: true, editable: true },
                        Seam: { type: "string", filterable: true, sortable: true, editable: true },
                        Block: { type: "string", filterable: true, sortable: true, editable: true },
                        Strip: { type: "number", filterable: true, sortable: true, editable: true },
                        Elevasi: { type: "string", filterable: true, sortable: true, editable: true },
                        MATERIAL_NAME: { type: "number", filterable: true, sortable: true, editable: true },
                        ROM_NAME: { type: "number", filterable: true, sortable: true, editable: true },
                        //Sub_Seam: { type: "string", filterable: true, sortable: true, editable: true },
                        Ash: { type: "number", filterable: true, sortable: true, editable: true },
                        Tm: { type: "number", filterable: true, sortable: true, editable: true },
                        Im: { type: "number", filterable: true, sortable: true, editable: true },
                        Vm: { type: "number", filterable: true, sortable: true, editable: true },
                        Fc: { type: "number", filterable: true, sortable: true, editable: true },
                        Ts: { type: "number", filterable: true, sortable: true, editable: true },
                        Cva: { type: "number", filterable: true, sortable: true, editable: true },
                        Cvd: { type: "number", filterable: true, sortable: true, editable: true },
                        Rd: { type: "number", filterable: true, sortable: true, editable: true },
                        Hgi: { type: "number", filterable: true, sortable: true, editable: true },
                        Csn: { type: "number", filterable: true, sortable: true, editable: true },
                        Is: { type: "number", filterable: true, sortable: true, editable: true },
                        Mc: { type: "number", filterable: true, sortable: true, editable: true },
                        Md: { type: "number", filterable: true, sortable: true, editable: true },
                        Ml: { type: "number", filterable: true, sortable: true, editable: true },
                        Ff: { type: "number", filterable: true, sortable: true, editable: true },
                        So: { type: "number", filterable: true, sortable: true, editable: true },
                        Pr: { type: "number", filterable: true, sortable: true, editable: true },
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
        editable: {
            mode: "inline"
        },
        //editable: {
        //    mode: "popup",
        //    template: kendo.template($("#custom_editor").html())
        //},
        //editable: "inline",
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
            //{
            //    field: "SHIFT_NAME",
            //    title: "Shift",
            //    width: "100px",
            //    locked: true,
            //    //values: statusForColumnShift,
            //    editor: editor_shift
            //},
            { field: "Inventory", title: "Inventory", width: "110px", locked: true },
            { field: "Seam", title: "Seam", width: "90px", locked: true },
            { field: "Block", title: "Block", width: "90px", locked: true },
            {
                field: "Strip",
                title: "Strip",
                width: "90px",
                locked: true
            },
            //{ field: "Elevasi", title: "Elevasi", width: "110px", locked: true },
            //{
            //    field: "ROM_NAME",
            //    title: "ROM",
            //    width: "100px",
            //    locked: true,
            //    editor: editor_rom
            //},
            //{
            //    field: "MATERIAL_NAME",
            //    title: "Material",
            //    width: "100px",
            //    locked: true,
            //    editor: editor_material
            //},
            //{ field: "Sub_Seam", title: "Sub Seam", width: "50px" },
            {
                field: "Ash",
                title: "ASH",
                width: "80px"
            },
            { field: "Tm", title: "TM", width: "80px" },
            { field: "Im", title: "IM", width: "80px" },
            { field: "Vm", title: "VM", width: "80px" },
            { field: "Fc", title: "FC", width: "80px" },
            { field: "Ts", title: "TS", width: "80px" },
            { field: "Cva", title: "CVA", width: "90px" },
            { field: "Cvd", title: "CVD", width: "90px" },
            { field: "Rd", title: "RD", width: "80px" },
            { field: "Hgi", title: "HGI", width: "90px" },
            { field: "Csn", title: "CSN", width: "90px" },
            { field: "Is", title: "IS", width: "80px" },
            { field: "Mc", title: "MC", width: "80px" },
            { field: "Md", title: "MD", width: "80px" },
            { field: "Ml", title: "ML", width: "80px" },
            { field: "Ff", title: "FF", width: "80px" },
            { field: "So", title: "SO", width: "80px" },
            { field: "Pr", title: "PR", width: "80px" },
            {
            command: [
                {
                    //name: "edit",
                    text: "Edit",
                    click: btn_edit
                },
                {
                    name: "destroy",
                    text: "Remove",
                    //click: btn_delete
                },
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
    win.title("INPUT PLANNING");
    win.refresh({ url: $("#urlPath").val() + "/Planning/InsertPlan" });

    win.open().maximize();
}

function btn_edit(e) {
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    console.log('isi dataitem', dataItem);

    var win = $("#dv_add").data("kendoWindow");
    //win.wrapper.width("1200px");
    //win.wrapper.height("500px");
    win.title("EDIT PLANNING");
    win.refresh({ url: $("#urlPath").val() + '/Planning/InsertPlan?Id=' + dataItem.Id });

    win.center().open().maximize();
}

function btn_delete(e) {
    window.alert("halooo");
    var tr = $(e.target).closest("tr"); //get the row for deletion
    var data = this.dataItem(tr); //get the row data so it can be referred later
    window.content(windowTemplate(data)); //send the row data object to the template and render it
    window.center().open();

    $("#yesButton").click(function () {
        griPlanning.dataSource.remove(data)  //prepare a "destroy" request
        griPlanning.dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
        window.close();
    })
    $("#noButton").click(function () {
        window.close();
    })
}