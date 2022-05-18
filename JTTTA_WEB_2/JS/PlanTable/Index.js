$(document).ready(function () {
    $("#search1").kendoDatePicker({
        format: "yyyy-MM-dd",
        value: new Date(),
        dateInput: true,
        change: checkDates2
    }); 

    $("#search2").kendoDatePicker({
        format: "yyyy-MM-dd",
        value: new Date(),
        dateInput: true,
        change: checkDates2
    }); 

    $("#txt_tgl").kendoDatePicker({
        format: "yyyy-MM-dd",
        value: new Date(),
        dateInput: true
    }); 

    $("#txt_start").kendoDatePicker({
        //value: new Date(),
        dateInput: true,
        interval: 5,
        //timeFormat: "HH:mm",
        format: "yyyy-MM-dd",
        //format: "M/d/yyyy H:mm",
        change: checkDates,
    });  

    $("#time_start").kendoTimePicker({
        dateInput: true,
        format: "H:mm",
    })

    $("#txt_end").kendoDatePicker({
        //value: new Date(),
        dateInput: true,
        interval: 5,
        //timeFormat: "HH:mm",
        format: "yyyy-MM-dd",
        //format: "M/d/yyyy H:mm",
        change: checkDates
    });  

    $("#time_end").kendoTimePicker({
        dateInput: true,
        format: "H:mm",
    })

    $("#txt_mat").kendoDropDownList({
        optionLabel: "Select Material",
        dataTextField: "MATERIAL_NAME",
        dataValueField: "MATERIAL_CODE",
        height: 300,
        dataSource: data_material
    }).data("kendoDropDownList");

    $("#txt_dest").kendoDropDownList({
        optionLabel: "Select Destinasi",
        height: 300,
        dataSource: data_dest,
        dataTextField: "DEST_NAME",
        dataValueField: "DEST_CODE",
    }).data("kendoDropDownList");

    $("#txt_shift").kendoDropDownList({
        optionLabel: "Select Shift",
        dataTextField: "SHIFT_NAME",
        dataValueField: "SHIFT_CODE",
        dataSource: data_shift
    }).data("kendoDropDownList");   

    $("#dv_add").kendoWindow({
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

    if ($("#idData").val() != "") {
        $("#btn_update").show();
        $("#btn_submit").hide();
    }
    else {        
        loadGridData_Plan("", "");
        $("#btn_update").hide();
        $("#btn_submit").show();
    }       
});

var idPlan;
var idPlan_Detail;
var rawId;
var tanggalPlan;
var shiftPlan;
var maxDatePlan;

var data_material = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/PlanTable/GetMaterial",
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

var data_dest = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/PlanTable/GetDestination",
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

var data_shift = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/PlanTable/GetShift",
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

var validator = $("#windowForAssign").kendoValidator().data("kendoValidator");

$("#btn_submit").on("click", function () {
    if (validator.validate()) {
        btn_submit_onclick();               
    }
});

var validatorLoader = $("#windowLoader").kendoValidator().data("kendoValidator");

$("#btn_submitL").on("click", function () {
    if (validatorLoader.validate()) {
        btnL_submit_onclick();
    }
});

function checkDates() {
    if ($("#txt_start").val() != '' && $("#txt_end").val() != '') {
        if (Date.parse($("#txt_start").val()) > Date.parse($("#txt_end").val())) {
            alert('End date should be before start date');
        }
    }
}

function checkDates2() {
    if ($("#search1").val() != '' && $("#search2").val() != '') {
        if (Date.parse($("#search1").val()) > Date.parse($("#search2").val())) {
            alert('End date should be before start date');
            $("#search2").val($("#search1").val());
        }
    }
}

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

function editor_tgl(container, options) {
    $('<input type="text" data-bind="value:PLAN_TANGGAL"/>')
        .appendTo(container)
        .kendoDatePicker({
            format: "yyyy-MM-dd",
            value: kendo.toString(new Date(options.model.PLAN_TANGGAL), 'yyyy-MM-dd')
        });
}

function editor_shift(container, options) {
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

function loadGridData_Plan(tanggal_awal, tanggal_akhir) {
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
                    url: $("#urlPath").val() + "/PlanTable/GetPlanData",
                    contentType: "application/json",
                    type: "POST",
                    cache: false
                },
                destroy: {
                    url: $("#urlPath").val() + "/PlanTable/DeletePlanTable",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {
                        console.log('isi data ini', data);
                        if (data.status) {
                            var grid = $("#gridData_Plan").data("kendoGrid");
                            grid.refresh();
                            alert("Data Berhasil Dihapus!");
                            $("#gridData_Plan").data("kendoGrid").dataSource.read();
                        } else {
                            alert(data.remarks);
                        }
                    }
                },
                parameterMap: function (data, operation) {
                    if (operation === "read") {
                        data.tgl_awal = tanggal_awal;
                        data.tgl_akhir = tanggal_akhir;
                    }
                    return kendo.stringify(data);
                }
            },
            pageSize: 50, 
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    id: "PLAN_ID",
                    fields: {
                        PLAN_ID: { type: "string", filterable: true, sortable: true },
                        PLAN_TANGGAL: { type: "string", filterable: true, sortable: true, editable: true },
                        PLAN_SHIFT: { type: "string", filterable: true, sortable: true, editable: true },
                        PLAN_START_TIME: { type: "string", filterable: true, sortable: true, editable: true },
                        PLAN_END_TIME: { type: "string", filterable: true, sortable: true, editable: true },
                        PLAN_INVENTORY: { type: "string", filterable: true, sortable: true, editable: true },
                        PLAN_SEAM: { type: "string", filterable: true, sortable: true, editable: true },
                        PLAN_BLOCK: { type: "string", filterable: true, sortable: true, editable: true },
                        PLAN_STRIP: { type: "string", filterable: true, sortable: true, editable: true },
                        PLAN_ELEVASI: { type: "string", filterable: true, sortable: true, editable: true },
                        PLAN_MATERIAL: { type: "string", filterable: true, sortable: true, editable: true },
                        PLAN_MAT_NAME: { type: "string", filterable: true, sortable: true, editable: true },
                        PLAN_DEST: { type: "string", filterable: true, sortable: true, editable: true },
                        PLAN_DEST_NAME: { type: "string", filterable: true, sortable: true, editable: true },
                        PLAN_ASH: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_TM: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_IM: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_VM: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_FC: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_TS: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_CVA: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_CVD: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_RD: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_HGI: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_CSN: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_IS: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_MC: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_MD: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_ML: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_FF: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_SO: { type: "number", filterable: true, sortable: true, editable: true },
                        PLAN_PR: { type: "number", filterable: true, sortable: true, editable: true },
                    }
                }
            }
        },
        filterable: {
            extra: false,
            operators: {
                string: { contains: "Contains" }
            },
            //mode: "row"
        },
        sortable: true,
        detailInit: detailInit,
        editable: {
            mode: "inline"
        },
        height: 500,
        pageable: {
            refresh: true,
            buttonCount: 10,
            input: true,
            pageSizes: [5, 10, 20, 50, 100, 1000],
            info: true,
            messages: {
            }
        },
        toolbar: [{ name: "btn_tambah", template: "<button class = 'btn btn-info' onclick='btn_add_onclick()'>Add New Planning</button>" }],
        columns: [
            {
                command: [
                    {
                        text: "Edit",
                        click: btn_edit
                    },
                    {
                        name: "destroy",
                        text: "Remove"
                    },
                ],
                title: "ACTION", width: "120px", locked: false
            },
            {
                field: "PLAN_TANGGAL",
                title: "Tanggal",
                width: "100px",
                //format: "{0:MM/dd/yyyy}",
                format: "{0: yyyy-MM-dd}",
                template: "#= kendo.toString(kendo.parseDate(PLAN_TANGGAL), 'yyyy-MM-dd') #",
                locked: false,
                editor: editor_tgl,
                filterable: {
                    cell: { template: betweenFilter }
                }
            },     
            {
                field: "PLAN_SHIFT_NAME",
                title: "Shift",
                width: "100px",
                locked: false,
                //values: statusForColumnShift,
                //editor: editor_shift
            },
            //{
            //    field: "PLAN_START_TIME",
            //    title: "Jam Awal",
            //    width: "110px",
            //    format: "{0: yyyy-MM-dd h:mm:ss}",
            //    template: "#= kendo.toString(kendo.parseDate(PLAN_START_TIME), 'yyyy-MM-dd h:mm:ss') #",
            //    locked: true,
            //    editor: editor_tgl
            //},
            //{
            //    field: "PLAN_END_TIME",
            //    title: "Jam Akhir",
            //    width: "125px",
            //    format: "{0: yyyy-MM-dd h:mm:ss}",
            //    template: "#= kendo.toString(kendo.parseDate(PLAN_END_TIME), 'yyyy-MM-dd h:mm:ss') #",
            //    locked: true,
            //    editor: editor_tgl
            //},
            //{ field: "PLAN_INVENTORY", title: "Inventory", width: "110px", locked: true },
            { field: "PLAN_SEAM", title: "Seam", width: "85px", locked: false },
            { field: "PLAN_BLOCK", title: "Block", width: "85px", locked: false },
            { field: "PLAN_STRIP", title: "Strip", width: "85px", locked: false },
            { field: "PLAN_ELEVASI", title: "Elevasi", width: "100px", locked: false },
            {
                field: "PLAN_MAT_NAME",
                title: "Material",
                width: "100px",
                //locked: true,
                editor: editor_material
            },
            {
                field: "PLAN_DEST_NAME",
                title: "Destinasi",
                width: "110px",
                //locked: true,
                editor: editor_rom
            },            
            { field: "PLAN_ASH", title: "ASH", width: "80px" },
            { field: "PLAN_TM", title: "TM", width: "80px" },
            //{ field: "PLAN_IM", title: "IM", width: "80px" },
            //{ field: "PLAN_VM", title: "VM", width: "80px" },
            //{ field: "PLAN_FC", title: "FC", width: "80px" },
            //{ field: "PLAN_TS", title: "TS", width: "80px" },
            //{ field: "PLAN_CVA", title: "CVA", width: "90px" },
            //{ field: "PLAN_CVD", title: "CVD", width: "90px" },
            //{ field: "PLAN_RD", title: "RD", width: "80px" },
            //{ field: "PLAN_HGI", title: "HGI", width: "90px" },
            //{ field: "PLAN_CSN", title: "CSN", width: "90px" },
            //{ field: "PLAN_IS", title: "IS", width: "80px" },
            //{ field: "PLAN_MC", title: "MC", width: "80px" },
            //{ field: "PLAN_MD", title: "MD", width: "80px" },
            //{ field: "PLAN_ML", title: "ML", width: "80px" },
            //{ field: "PLAN_FF", title: "FF", width: "80px" },
            //{ field: "PLAN_SO", title: "SO", width: "80px" },
            //{ field: "PLAN_PR", title: "PR", width: "80px" },
            
        ],
        edit: function (e) {
            if (!e.model.isNew()) {
                $("input[name='PLAN_ID']").attr("disabled", true);
            }
        },
        dataBinding: function () {
            window.RecNumerEq = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        }
    });
}

function detailInit(e) {
    $("<div/>").appendTo(e.detailCell).kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: $("#urlPath").val() + "/Loader/GetLoader",
                    contentType: "application/json",
                    type: "POST",
                    cache: false,
                    complete: function (data) {
                        console.log('isi loader', data);
                    }
                },
                destroy: {
                    url: $("#urlPath").val() + "/Loader/DeleteLoader",
                    contentType: "application/json",
                    type: "POST",
                    complete: function (data) {                        
                        if (data.status) {
                            var grid = $("#gridData_Plan").data("kendoGrid");
                            grid.refresh();
                            alert("Data Loader Berhasil Dihapus!");
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
            filter: { field: "PUNIT_PLANNING_ID", operator: "eq", value: e.data.PLAN_ID },
            pageSize: 50,
            schema: {
                data: "Data",
                total: "Total",
                model: {
                    id: "PUNIT_RAW_ID",
                    fields: {
                        PUNIT_RAW_ID: { type: "string", filterable: true, sortable: true },
                        PUNIT_PLANNING_ID: { type: "string", filterable: true, sortable: true },
                        PUNIT_LOADER: { type: "string", filterable: true, sortable: true, editable: true },                        
                        PUNIT_STARTDATE: { type: "string", filterable: true, sortable: true, editable: true },                        
                        PUNIT_ENDDATE: { type: "string", filterable: true, sortable: true, editable: true },                        
                        PUNIT_ISACTIVE: { type: "string", filterable: true, sortable: true },                        
                    }
                }
            }
        },
        scrollable: false,
        sortable: true,
        pageable: false,
        width:"100px",
        editable: {
            mode: "inline"
        },
        toolbar: [{ name: "btn_tambah", template: "<button class = 'btn btn-info' onclick='btn_addLoader_onclick(\"" + e.data.PLAN_ID + "\",\"" + e.data.PLAN_SHIFT + "\",\"" + e.data.PLAN_TANGGAL + "\")'>Add New Loader</button>" }],
        columns: [
            {
                command: [
                    {
                        text: "Edit",
                        click: btn_editLoader
                    },
                    {
                        name: "destroy",
                        text: "Remove"
                    },
                ],
                title: "ACTION", width: "120px", locked: false
            },
            { field: "PUNIT_LOADER", title: "LOADER", width: "85px", locked: false },
            {
                field: "PUNIT_STARTDATE",
                title: "START DATE",
                width: "100px",
                //format: "{0:dd/MMMM/yyyy H:mm}",
                template: "#= kendo.toString(kendo.parseDate(PUNIT_STARTDATE), 'yyyy-MM-dd HH:mm') #",
                locked: false,
                //editor: editor_tgl
            },
            {
                field: "PUNIT_ENDDATE",
                title: "END DATE",
                width: "100px",
                //format: "{0:dd/MMMM/yyyy H:mm}",
                template: "#= kendo.toString(kendo.parseDate(PUNIT_ENDDATE), 'yyyy-MM-dd HH:mm') #",
                locked: false,
                //editor: editor_tgl
            },
            { field: "PUNIT_ISACTIVE", title: "IS ACTIVE", width: "85px", locked: false }
        ],
        edit: function (e) {
            if (!e.model.isNew()) {
                $("input[name='PUNIT_RAW_ID']").attr("disabled", true);
            }
        },
    });
}

function betweenFilter(args) {
    var filterCell = args.element.parents(".k-filtercell");

    filterCell.empty();
    filterCell.html('<span style="display:flex; justify-content:center;"><span>From:</span><input  class="start-date"/><span>To:</span><input  class="end-date"/></span>');

    $(".start-date", filterCell).kendoDatePicker({
        change: function (e) {
            var startDate = e.sender.value(),
                endDate = $("input.end-date", filterCell).data("kendoDatePicker").value(),
                dataSource = $("#gridData_Plan").data("kendoGrid").dataSource;

            if (startDate & endDate) {
                var filter = { logic: "and", filters: [] };
                filter.filters.push({ field: "PLAN_TANGGAL", operator: "gte", value: startDate });
                filter.filters.push({ field: "PLAN_TANGGAL", operator: "lte", value: endDate });
                dataSource.filter(filter);
            }
        }
    });
    $(".end-date", filterCell).kendoDatePicker({
        change: function (e) {
            var startDate = $("input.start-date", filterCell).data("kendoDatePicker").value(),
                endDate = e.sender.value(),
                dataSource = $("#gridData_Plan").data("kendoGrid").dataSource;

            if (startDate & endDate) {
                var filter = { logic: "and", filters: [] };
                filter.filters.push({ field: "PLAN_TANGGAL", operator: "gte", value: startDate });
                filter.filters.push({ field: "PLAN_TANGGAL", operator: "lte", value: endDate });
                dataSource.filter(filter);
            }
        }
    });
}

function btn_add_onclick() {
    var kendoWindowAssign = $("#windowForAssign");
    var title = "Add New Planning";

    kendoWindowAssign.kendoWindow({
        width: "650px",
        modal: true,
        height: 'auto',
        iframe: false,
        resizable: false,
        title: title,
        //content: url,
        visible: false,
    });

    $("#btn_update").hide();
    $("#btn_submit").show();

    var popup = $("#windowForAssign").data('kendoWindow');
    popup.open();
    popup.center();
}

function btn_submit_onclick() {
    var startTime = kendo.toString(kendo.parseDate($("#txt_start").val()), "yyyy-MM-ddTHH:mm");
    var endTime = kendo.toString(kendo.parseDate($("#txt_end").val()), "yyyy-MM-ddTHH:mm");
    var input = {
        PLAN_TANGGAL: $("#txt_tgl").val(),
        PLAN_SHIFT: $("#txt_shift").val(),
        PLAN_START_TIME: startTime,
        PLAN_END_TIME: endTime,
        PLAN_SEAM: $("#txt_seam").val(),
        PLAN_BLOCK: $("#txt_block").val(),
        PLAN_STRIP: $("#txt_strip").val(),
        PLAN_ELEVASI: $("#txt_elevasi").val(),
        PLAN_INVENTORY: $("#txt_inven").val(),
        PLAN_MATERIAL: $("#txt_mat").val(),
        PLAN_DEST: $("#txt_dest").val(),
        PLAN_ASH: $("#txt_ash").val(),
        PLAN_TM: $("#txt_tm").val(),
        PLAN_IM: $("#txt_im").val(),
        PLAN_VM: $("#txt_vm").val(),
        PLAN_FC: $("#txt_fc").val(),
        PLAN_TS: $("#txt_ts").val(),
        PLAN_CVA: $("#txt_cva").val(),
        PLAN_CVD: $("#txt_cvd").val(),
        PLAN_RD: $("#txt_rd").val(),
        PLAN_HGI: $("#txt_hgi").val(),
        PLAN_CSN: $("#txt_csn").val(),
        PLAN_IS: $("#txt_is").val(),
        PLAN_MC: $("#txt_mc").val(),
        PLAN_MD: $("#txt_md").val(),
        PLAN_ML: $("#txt_ml").val(),
        PLAN_FF: $("#txt_ff").val(),
        PLAN_SO: $("#txt_so").val(),
        PLAN_PR: $("#txt_pr").val()
    };

    console.log('isian input', input);

    $.ajax({
        type: "POST",
        url: $("#urlPath").val() + "/PlanTable/CreatePlanSchedule",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(input),
        success: function (response) {
            if (response.status == true) {
                alert(response.remark)
                $("#gridData_Plan").data("kendoGrid").dataSource.read();
                btn_close_onclick();
                //window.parent.$("#windowForAssign").data("kendoWindow").close()
            }
            else {
                console.log(response);
                alert("Error Message: " + response.remark);
            }
        }
    })
}

function btn_edit(e) {
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

    idPlan = dataItem.PLAN_ID;

    var kendoWindowAssign = $("#windowForAssign");
    var title = "Edit Planning";

    kendoWindowAssign.kendoWindow({
        width: "650px",
        modal: true,
        //height: '1200px',
        iframe: false,
        resizable: false,
        title: title,
        //content: url,
        visible: false,
    });

    var popup = $("#windowForAssign").data('kendoWindow');

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#urlPath").val() + "/PlanTable/GetEditData",
        data: JSON.stringify({ "idData": idPlan }),
        success: function (response) {
            if (response.Data != null) {
                var dt = response.Data;
                console.log('result edit', dt);

                $("#txt_tgl").data("kendoDatePicker").value(dt.PLAN_TANGGAL);
                $("#txt_shift").data("kendoDropDownList").value(dt.PLAN_SHIFT);

                //$("#txt_start").data("kendoDateTimePicker").value(dt.PLAN_START_TIME);
                //$("#txt_end").data("kendoDateTimePicker").value(dt.PLAN_END_TIME);
                $("#txt_seam").val(dt.PLAN_SEAM);
                $("#txt_block").val(dt.PLAN_BLOCK);
                $("#txt_strip").val(dt.PLAN_STRIP);
                $("#txt_elevasi").val(dt.PLAN_ELEVASI);
                $("#txt_inven").val(dt.PLAN_INVENTORY);
                
                $("#txt_mat").data("kendoDropDownList").value(dt.PLAN_MATERIAL);
                $("#txt_dest").data("kendoDropDownList").value(dt.PLAN_DEST);

                $("#txt_tm").val(dt.PLAN_TM);
                //$("#txt_im").val(dt.PLAN_IM);
                $("#txt_ash").val(dt.PLAN_ASH);
                //$("#txt_vm").val(dt.PLAN_VM);
                //$("#txt_fc").val(dt.PLAN_FC);
                //$("#txt_ts").val(dt.PLAN_TS);
                //$("#txt_cva").val(dt.PLAN_CVA);
                //$("#txt_cvd").val(dt.PLAN_CVD);
                //$("#txt_rd").val(dt.PLAN_RD);
                //$("#txt_hgi").val(dt.PLAN_HGI);
                //$("#txt_csn").val(dt.PLAN_CSN);
                //$("#txt_is").val(dt.PLAN_IS);
                //$("#txt_mc").val(dt.PLAN_MC);
                //$("#txt_md").val(dt.PLAN_MD);
                //$("#txt_ml").val(dt.PLAN_ML);
                //$("#txt_ff").val(dt.PLAN_FF);
                //$("#txt_so").val(dt.PLAN_SO);
                //$("#txt_pr").val(dt.PLAN_PR);

                $("#btn_update").show();
                $("#btn_submit").hide();
            }
        },
    });

    popup.open();
    popup.center();
}

function btn_update_onclick() {
    var startTime = kendo.toString(kendo.parseDate($("#txt_start").val()), "yyyy-MM-ddTHH:mm");
    var endTime = kendo.toString(kendo.parseDate($("#txt_end").val()), "yyyy-MM-ddTHH:mm");

    var input = {
        PLAN_ID: idPlan,
        PLAN_START_TIME: startTime,
        PLAN_END_TIME: endTime,
        PLAN_TANGGAL: $("#txt_tgl").val(),
        PLAN_SHIFT: $("#txt_shift").val(),
        PLAN_SEAM: $("#txt_seam").val(),
        PLAN_BLOCK: $("#txt_block").val(),
        PLAN_STRIP: $("#txt_strip").val(),
        PLAN_ELEVASI: $("#txt_elevasi").val(),
        PLAN_INVENTORY: $("#txt_inven").val(),
        PLAN_MATERIAL: $("#txt_mat").val(),
        PLAN_DEST: $("#txt_dest").val(),
        PLAN_ASH: $("#txt_ash").val(),
        PLAN_TM: $("#txt_tm").val(),
        PLAN_IM: $("#txt_im").val(),
        PLAN_VM: $("#txt_vm").val(),
        PLAN_FC: $("#txt_fc").val(),
        PLAN_TS: $("#txt_ts").val(),
        PLAN_CVA: $("#txt_cva").val(),
        PLAN_CVD: $("#txt_cvd").val(),
        PLAN_RD: $("#txt_rd").val(),
        PLAN_HGI: $("#txt_hgi").val(),
        PLAN_CSN: $("#txt_csn").val(),
        PLAN_IS: $("#txt_is").val(),
        PLAN_MC: $("#txt_mc").val(),
        PLAN_MD: $("#txt_md").val(),
        PLAN_ML: $("#txt_ml").val(),
        PLAN_FF: $("#txt_ff").val(),
        PLAN_SO: $("#txt_so").val(),
        PLAN_PR: $("#txt_pr").val()
    };

    console.log('isian input', input);

    $.ajax({
        type: "POST",
        url: $("#urlPath").val() + "/PlanTable/UpdatePlanTable",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(input),
        success: function (response) {
            if (response.status == true) {
                alert(response.remark)
                $("#gridData_Plan").data("kendoGrid").dataSource.read();
                idPlan = '';
                //window.parent.$("#windowForAssign").data("kendoWindow").close()
                btn_close_onclick();
            }
            else {
                console.log(response);
                alert("Error Message: " + response.remark);
                idPlan = '';
                $("#gridData").data("kendoGrid").dataSource.read();
                btn_close_onclick();
            }
        }
    })
}

function btn_close_onclick() {
    validator.hideMessages();
    idPlan = '';
    var todayDate = kendo.toString(kendo.parseDate(new Date()), 'yyyy-MM-dd');
    $("#txt_tgl").val(todayDate);
    $("#txt_shift").data("kendoDropDownList").value(-1);
    $("#txt_dest").data("kendoDropDownList").value(-1);
    $("#txt_mat").data("kendoDropDownList").value(-1);
    $("#txt_start").val(''),
    $("#txt_end").val(''),
    $("#txt_seam").val(''),
    $("#txt_block").val(''),
    $("#txt_strip").val(''),
    $("#txt_elevasi").val(''),
    $("#txt_inven").val(''),
    $("#txt_ash").val(''),
    $("#txt_tm").val(''),
    $("#txt_im").val(''),
    $("#txt_vm").val(''),
    $("#txt_fc").val(''),
    $("#txt_ts").val(''),
    $("#txt_cva").val(''),
    $("#txt_cvd").val(''),
    $("#txt_rd").val(''),
    $("#txt_hgi").val(''),
    $("#txt_csn").val(''),
    $("#txt_is").val(''),
    $("#txt_mc").val(''),
    $("#txt_md").val(''),
    $("#txt_ml").val(''),
    $("#txt_ff").val(''),
    $("#txt_so").val(''),
    $("#txt_pr").val('')
    window.parent.$("#windowForAssign").data("kendoWindow").close();
}

function btn_search_onclick() {
    var a = $("#search1").val();
    var b = $("#search2").val();
    loadGridData_Plan(a, b);
    console.log('maison', a, b);

    //$.ajax({
    //    type: "POST",
    //    url: $("#urlPath").val() + "/PlanTable/SearchByDate",
    //    dataType: "json",
    //    contentType: "application/json",
    //    data: JSON.stringify({ "search1": a, "search2": b }),
    //    success: function (response) {
    //        console.log('maison', response)
    //        //if (response.status == true) {
    //        //    alert(response.remark)
    //        //    $("#gridData_Plan").data("kendoGrid").dataSource.read();
    //        //    btn_close_onclick();
    //        //    //window.parent.$("#windowForAssign").data("kendoWindow").close()
    //        //}
    //        //else {
    //        //    console.log(response);
    //        //    alert("Error Message: " + response.remark);
    //        //}
    //    }
    //})
}

/////////////LOADER////////////////

function btn_addLoader_onclick(e,plan_shift,tanggal_plan) {
    idPlan_Detail = e;
    tanggalPlan = tanggal_plan;
    shiftPlan = plan_shift;

    var kendoWindowLoader = $("#windowLoader");
    var title = "Add New Loader";

    kendoWindowLoader.kendoWindow({
        width: "650px",
        modal: true,
        height: 'auto',
        iframe: false,
        resizable: false,
        title: title,
        visible: false,
    });

    $("#btn_updateL").hide();
    $("#btn_submitL").show();

    var popupLoader = $("#windowLoader").data('kendoWindow');
    popupLoader.open();
    popupLoader.center();

    $("#txt_start").data("kendoDatePicker").value(null);
    $("#txt_end").data("kendoDatePicker").value(null);

    $("#time_start").data("kendoTimePicker").value(null);
    $("#time_end").data("kendoTimePicker").value(null);

    $("#txt_end").data("kendoDatePicker").value(tanggal_plan);
    $("#txt_start").data("kendoDatePicker").value(tanggal_plan);        

    var targetDate = new Date(tanggal_plan);
    maxDatePlan = kendo.date.addDays(targetDate, 1);

    if (plan_shift == "S2") {
        var maxDate = kendo.toString(kendo.parseDate(maxDatePlan), 'yyyy-MM-dd');

        $("#txt_start").kendoDatePicker({
            //value: new Date(tanggal_plan.split('-')[0], tanggal_plan.split('-')[1], tanggal_plan.split('-')[2]),
            dateInput: true,
            interval: 5,
            format: "yyyy-MM-dd",
            min: new Date(tanggal_plan.split('-')[0], (tanggal_plan.split('-')[1] - 1), tanggal_plan.split('-')[2]),
            max: new Date(maxDate.split('-')[0], (maxDate.split('-')[1] - 1), maxDate.split('-')[2])
        });

        $("#txt_start").closest("span.k-datepicker").width(161);

        $("#txt_end").kendoDatePicker({
            //value: new Date(tanggal_plan.split('-')[0], tanggal_plan.split('-')[1], tanggal_plan.split('-')[2]),
            dateInput: true,
            interval: 5,
            format: "yyyy-MM-dd",
            min: new Date(tanggal_plan.split('-')[0], (tanggal_plan.split('-')[1] - 1), tanggal_plan.split('-')[2]),
            max: new Date(maxDate.split('-')[0], (maxDate.split('-')[1] - 1), maxDate.split('-')[2])
        });

        $("#txt_end").closest("span.k-datepicker").width(161);
    }
    else {
        var timeStart = $("#time_start").data("kendoTimePicker");
        var timeEnd = $("#time_end").data("kendoTimePicker");

        timeStart.min("06:00");
        timeStart.max("18:00");

        timeEnd.min("06:00");
        timeEnd.max("18:00");

        $("#txt_start").kendoDatePicker({
            //value: new Date(tanggal_plan.split('-')[0], tanggal_plan.split('-')[1], tanggal_plan.split('-')[2]),
            dateInput: true,
            interval: 5,
            format: "yyyy-MM-dd",
            min: new Date(tanggal_plan.split('-')[0], (tanggal_plan.split('-')[1] - 1), tanggal_plan.split('-')[2]),
            max: new Date(tanggal_plan.split('-')[0], (tanggal_plan.split('-')[1] - 1), tanggal_plan.split('-')[2])
        });

        $("#txt_start").closest("span.k-datepicker").width(161);

        $("#txt_end").kendoDatePicker({
            //value: new Date(tanggal_plan.split('-')[0], tanggal_plan.split('-')[1], tanggal_plan.split('-')[2]),
            dateInput: true,
            interval: 5,
            format: "yyyy-MM-dd",
            min: new Date(tanggal_plan.split('-')[0], (tanggal_plan.split('-')[1] - 1), tanggal_plan.split('-')[2]),
            max: new Date(tanggal_plan.split('-')[0], (tanggal_plan.split('-')[1] - 1), tanggal_plan.split('-')[2])
        });

        $("#txt_end").closest("span.k-datepicker").width(161);
    }

    //if (plan_shift == "S1") {
        
    //}    
}

function btnL_submit_onclick() {
    var isValid = true;

    //VALIDASI jika start date lebih besar dari end date    
    var setStartDate = kendo.toString(kendo.parseDate($("#txt_start").val()), 'yyyy-MM-dd');
    var setEndDate = kendo.toString(kendo.parseDate($("#txt_end").val()), 'yyyy-MM-dd');    

    if (setStartDate > setEndDate) {
        alert("Start Date tidak boleh lebih besar dari End Date");
        isValid = false;
        return false;
    }

    //VALIDASI jika start dan end date sama namun time start nya lebih besar
    var setStartTime = $("#time_start").val();
    var setEndTime = $("#time_end").val();

    var splitStartTime = parseInt(setStartTime.split(":")[0]);
    var splitEndTime = parseInt(setEndTime.split(":")[0]);

    var start_time = splitStartTime < 10 ? ("0" + setStartTime) : setStartTime;
    var end_time = splitEndTime < 10 ? ("0" + setEndTime) : setEndTime; 

    if (setStartDate === setEndDate) {
        //if (Date.parseExact(setStartTime, "H:mm") > Date.parseExact(setEndTime, "H:mm")) {
        if (splitStartTime > splitEndTime) {
            alert("Start Time tidak boleh lebih besar dari End Time");
            isValid = false;
            return false;
        }
    }    

    //VALIDASI untuk Shift 2, tanggal Loader tidak boleh melebihi maxdate
    if (shiftPlan == "S2") {
        if ((Date.parse($("#txt_start").val()) > kendo.toString(kendo.parseDate(maxDatePlan), 'yyyy-MM-dd')) || (kendo.toString(kendo.parseDate($("#txt_end").val()), 'yyyy-MM-dd') > kendo.toString(kendo.parseDate(maxDatePlan), 'yyyy-MM-dd'))) {
            isValid = false;
            alert("Untuk Shift 2 tanggal Loader maksimal H+1 dari tanggal Planning")
            return false;
        }
    }
    //VALIDASI untuk shift 1
    if (shiftPlan == "S1") {
        if ((Date.parse($("#txt_start").val()) < Date.parse(tanggalPlan) || Date.parse($("#txt_start").val()) > Date.parse(tanggalPlan)) || ((Date.parse($("#txt_end").val()) < Date.parse(tanggalPlan) || Date.parse($("#txt_end").val()) > Date.parse(tanggalPlan)))) {
            isValid = false;
            alert("Untuk Shift 1 Tanggal Loader harus sama dengan Tanggal Planning");
            return false;
        }
    }    

    //CONCAT date and time loader
    var startDate = setStartDate + 'T' + start_time;
    var endDate = setEndDate + 'T' + end_time;

    if (isValid) {
        var input = {
            PUNIT_PLANNING_ID: idPlan_Detail,
            PUNIT_LOADER: $("#txt_loader").val(),
            PUNIT_STARTDATE: startDate,
            PUNIT_ENDDATE: endDate
        };

        console.log('isian input Loader', input);

        $.ajax({
            type: "POST",
            url: $("#urlPath").val() + "/Loader/CreateLoader",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(input),
            success: function (response) {
                if (response.status == true) {
                    alert(response.remark)
                    $("#gridData_Plan").data("kendoGrid").dataSource.read();
                    btnL_close_onclick();
                    //window.parent.$("#windowForAssign").data("kendoWindow").close()
                }
                else {
                    console.log(response);
                    alert("Error Message: " + response.remark);
                    $("#gridData_Plan").data("kendoGrid").dataSource.read();
                    btnL_close_onclick();
                }
            }
        })
    }    
}

function btn_editLoader(e) {
    console.log('run', e);
    var dataEdit = this.dataItem($(e.currentTarget).closest("tr"));

    idLoader = dataEdit.PUNIT_RAW_ID;

    var detailGridWrapper = this.wrapper;
    // GET PARENT ROW ELEMENT
    var parentRow = detailGridWrapper.closest("tr.k-detail-row").prev("tr");
    // GET PARENT GRID ELEMENT
    var parentGrid = parentRow.closest("[data-role=grid]").data("kendoGrid");
    // GET THE PARENT ROW MODEL
    var parentModel = parentGrid.dataItem(parentRow);

    var targetDate = new Date(parentModel.PLAN_TANGGAL);
    maxDatePlan = kendo.date.addDays(targetDate, 1);
    
    console.log('isi parent', parentModel);    

    var kendoWindowLoader = $("#windowLoader");
    var title = "Edit Loader";

    kendoWindowLoader.kendoWindow({
        width: "650px",
        modal: true,
        iframe: false,
        resizable: false,
        title: title,
        visible: false,
    });   

    var popupLoader = $("#windowLoader").data('kendoWindow');

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#urlPath").val() + "/Loader/GetLoaderEdit",
        data: JSON.stringify({ "idLoader": idLoader }),
        success: function (response) {
            if (response.Data != null) {
                var dt = response.Data;
                console.log('result edit Loader', dt);

                idPlan_Detail = dt.PUNIT_PLANNING_ID;
                rawId = dt.PUNIT_RAW_ID;

                debugger

                $("#txt_start").closest("span.k-datepicker").width(161);
                $("#txt_start").data("kendoDatePicker").value(null);
                $("#txt_start").data("kendoDatePicker").value(kendo.toString(kendo.parseDate(dt.PUNIT_STARTDATE), "yyyy-MM-dd"));

                $("#txt_end").closest("span.k-datepicker").width(161);
                $("#txt_end").data("kendoDatePicker").value(null);
                $("#txt_end").data("kendoDatePicker").value(kendo.toString(kendo.parseDate(dt.PUNIT_ENDDATE), "yyyy-MM-dd"));

                $("#time_start").data("kendoTimePicker").value(null);
                $("#time_start").data("kendoTimePicker").value(kendo.toString(kendo.parseDate(dt.PUNIT_STARTDATE), "HH:mm"));

                $("#time_end").data("kendoTimePicker").value(null);
                $("#time_end").data("kendoTimePicker").value(kendo.toString(kendo.parseDate(dt.PUNIT_ENDDATE), "HH:mm"));

                $("#txt_loader").val(dt.PUNIT_LOADER);

                $("#btn_updateL").show();
                $("#btn_submitL").hide();

                if (parentModel.PLAN_SHIFT == "S2") {
                    debugger
                    var maxDate = kendo.toString(kendo.parseDate(maxDatePlan), 'yyyy-MM-dd');
                    console.log('MIN', parentModel.PLAN_TANGGAL.split('-')[0], (parentModel.PLAN_TANGGAL.split('-')[1] - 1), parentModel.PLAN_TANGGAL.split('-')[2]);
                    console.log('MAX', maxDate.split('-')[0], (maxDate.split('-')[1] - 1), maxDate.split('-')[2]);

                    $("#txt_start").kendoDatePicker({
                        dateInput: true,
                        interval: 5,
                        format: "yyyy-MM-dd",
                        min: new Date(parentModel.PLAN_TANGGAL.split('-')[0], (parentModel.PLAN_TANGGAL.split('-')[1] - 1), parentModel.PLAN_TANGGAL.split('-')[2]),
                        max: new Date(maxDate.split('-')[0], (maxDate.split('-')[1] - 1), maxDate.split('-')[2])
                    });

                    $("#txt_start").closest("span.k-datepicker").width(161);

                    $("#txt_end").kendoDatePicker({
                        dateInput: true,
                        interval: 5,
                        format: "yyyy-MM-dd",
                        min: new Date(parentModel.PLAN_TANGGAL.split('-')[0], (parentModel.PLAN_TANGGAL.split('-')[1] - 1), parentModel.PLAN_TANGGAL.split('-')[2]),
                        max: new Date(maxDate.split('-')[0], (maxDate.split('-')[1] - 1), maxDate.split('-')[2])
                    });

                    $("#txt_end").closest("span.k-datepicker").width(161);
                }
                else {
                    debugger
                    var timeStart = $("#time_start").data("kendoTimePicker");
                    var timeEnd = $("#time_end").data("kendoTimePicker");

                    timeStart.min("06:00");
                    timeStart.max("18:00");

                    timeEnd.min("06:00");
                    timeEnd.max("18:00");

                    $("#txt_start").kendoDatePicker({
                        //value: new Date(tanggal_plan.split('-')[0], tanggal_plan.split('-')[1], tanggal_plan.split('-')[2]),
                        dateInput: true,
                        interval: 5,
                        format: "yyyy-MM-dd",
                        min: new Date(parentModel.PLAN_TANGGAL.split('-')[0], (parentModel.PLAN_TANGGAL.split('-')[1] - 1), parentModel.PLAN_TANGGAL.split('-')[2]),
                        max: new Date(parentModel.PLAN_TANGGAL.split('-')[0], (parentModel.PLAN_TANGGAL.split('-')[1] - 1), parentModel.PLAN_TANGGAL.split('-')[2])
                    });

                    $("#txt_start").closest("span.k-datepicker").width(161);

                    $("#txt_end").kendoDatePicker({
                        //value: new Date(tanggal_plan.split('-')[0], tanggal_plan.split('-')[1], tanggal_plan.split('-')[2]),
                        dateInput: true,
                        interval: 5,
                        format: "yyyy-MM-dd",
                        min: new Date(parentModel.PLAN_TANGGAL.split('-')[0], (parentModel.PLAN_TANGGAL.split('-')[1] - 1), parentModel.PLAN_TANGGAL.split('-')[2]),
                        max: new Date(parentModel.PLAN_TANGGAL.split('-')[0], (parentModel.PLAN_TANGGAL.split('-')[1] - 1), parentModel.PLAN_TANGGAL.split('-')[2])
                    });

                    $("#txt_end").closest("span.k-datepicker").width(161);
                }
            }
        },
    });

    popupLoader.open();
    popupLoader.center();
    return false;
}

function btnL_update_onclick() {
    var isValid = true;

    //VALIDASI jika start date lebih besar dari end date    
    var setStartDate = kendo.toString(kendo.parseDate($("#txt_start").val()), 'yyyy-MM-dd');
    var setEndDate = kendo.toString(kendo.parseDate($("#txt_end").val()), 'yyyy-MM-dd');

    if (setStartDate > setEndDate) {
        alert("Start Date tidak boleh lebih besar dari End Date");
        isValid = false;
        return false;
    }

    //VALIDASI jika start dan end date sama namun time start nya lebih besar
    var setStartTime = $("#time_start").val();
    var setEndTime = $("#time_end").val();

    var splitStartTime = parseInt(setStartTime.split(":")[0]);
    var splitEndTime = parseInt(setEndTime.split(":")[0]);

    var start_time = splitStartTime < 10 ? ("0" + setStartTime) : setStartTime;
    var end_time = splitEndTime < 10 ? ("0" + setEndTime) : setEndTime;

    if (setStartDate === setEndDate) {
        //if (Date.parseExact(setStartTime, "H:mm") > Date.parseExact(setEndTime, "H:mm")) {
        if (splitStartTime > splitEndTime) {
            alert("Start Time tidak boleh lebih besar dari End Time");
            isValid = false;
            return false;
        }
    }

    //VALIDASI untuk Shift 2, tanggal Loader tidak boleh melebihi maxdate
    if (shiftPlan == "S2") {
        if ((Date.parse($("#txt_start").val()) > kendo.toString(kendo.parseDate(maxDatePlan), 'yyyy-MM-dd')) || (kendo.toString(kendo.parseDate($("#txt_end").val()), 'yyyy-MM-dd') > kendo.toString(kendo.parseDate(maxDatePlan), 'yyyy-MM-dd'))) {
            isValid = false;
            alert("Untuk Shift 2 tanggal Loader maksimal H+1 dari tanggal Planning")
            return false;
        }
    }
    //VALIDASI untuk shift 1
    if (shiftPlan == "S1") {
        if ((Date.parse($("#txt_start").val()) < Date.parse(tanggalPlan) || Date.parse($("#txt_start").val()) > Date.parse(tanggalPlan)) || ((Date.parse($("#txt_end").val()) < Date.parse(tanggalPlan) || Date.parse($("#txt_end").val()) > Date.parse(tanggalPlan)))) {
            isValid = false;
            alert("Untuk Shift 1 Tanggal Loader harus sama dengan Tanggal Planning");
            return false;
        }
    }

    //CONCAT date and time loader
    var startDate = setStartDate + 'T' + start_time;
    var endDate = setEndDate + 'T' + end_time;

    //var startDate = kendo.toString(kendo.parseDate($("#txt_start").val()), "yyyy-MM-ddTHH:mm");
    //var endDate = kendo.toString(kendo.parseDate($("#txt_end").val()), "yyyy-MM-ddTHH:mm");

    if (isValid) {
        var update = {
            PUNIT_RAW_ID: rawId,
            PUNIT_PLANNING_ID: idPlan_Detail,
            PUNIT_LOADER: $("#txt_loader").val(),
            PUNIT_STARTDATE: startDate,
            PUNIT_ENDDATE: endDate
        };

        console.log('isian update Loader', update);

        $.ajax({
            type: "POST",
            url: $("#urlPath").val() + "/Loader/UpdateLoader",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(update),
            success: function (response) {
                if (response.status == true) {
                    alert(response.remark)
                    $("#gridData_Plan").data("kendoGrid").dataSource.read();
                    btnL_close_onclick();
                    //window.parent.$("#windowForAssign").data("kendoWindow").close()
                }
                else {
                    console.log(response);
                    alert("Error Message: " + response.remark);
                    $("#gridData_Plan").data("kendoGrid").dataSource.read();
                    btnL_close_onclick();
                }
            }
        })
    }
    
    btnL_close_onclick();
}

function btnL_close_onclick() {
    validatorLoader.hideMessages();

    debugger

    idPlan_Detail = '';
    tanggalPlan = '';
    maxDatePlan = '';
    shiftPlan = '';
    $("#txt_loader").val('');

    //$("#time_start").val('');
    //$("#time_end").val('');
    ////var todayDateLoader = kendo.toString(kendo.parseDate(new Date()), 'yyyy-MM-dd HH:mm');
    ////$("#txt_start").val(todayDateLoader);
    ////$("#txt_end").val(todayDateLoader);
    //$("#txt_start").data("kendoDatePicker").value(null);
    //$("#txt_end").data("kendoDatePicker").value(null);
    //$("#time_start").data("kendoTimePicker").value(null);
    //$("#time_end").data("kendoTimePicker").value(null);

    var kendoWindowLoader = $("#windowLoader").data("kendoWindow");
    kendoWindowLoader.refresh();

    window.parent.$("#windowLoader").data("kendoWindow").close();
}