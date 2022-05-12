
var data_shift = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/Planning/GetShift",
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
            return kendo.stringify(data)
        }
    },
    schema: {
        data: "Data",
        total: "Total"
    },
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

$(document).ready(function () {
    $("#txt_shift").kendoDropDownList({
        optionLabel: "Select Shift",
        dataTextField: "SHIFT_NAME",
        dataValueField: "SHIFT_NAME",
        //height: 310,
        dataSource: data_shift
    }).data("kendoDropDownList");

    $("#txt_material").kendoDropDownList({
        optionLabel: "Select Material",
        dataTextField: "MATERIAL_NAME",
        dataValueField: "MATERIAL_NAME",
        //height: 310,
        dataSource: data_material
    }).data("kendoDropDownList");

    //$("#txt_rom").kendoDropDownList({
    //    optionLabel: "Select Rom",
    //    dataTextField: "ROM_NAME",
    //    dataValueField: "ROM_NAME",
    //    //height: 310,
    //    dataSource: data_rom
    //}).data("kendoDropDownList");

    $("#txt_rom").width(100).kendoDropDownList({
        optionLabel: "Select Rom",
        dataSource: data_rom,
        dataTextField: "ROM_NAME",
        dataValueField: "ROM_NAME",
    }).data("kendoDropDownList");

  
    $("#txt_tgl").kendoDatePicker({
        format: "yyyy-MM-dd",
        value: new Date(),
        dateInput: true
    });   

    $("#txt_start").kendoDateTimePicker({
        //format: "yyyy-MM-dd",
        value: new Date(),
        dateInput: true
    });   

    $("#txt_end").kendoDateTimePicker({
        //format: "yyyy-MM-dd",
        value: new Date(),
        dateInput: true
    });   

    $("#btn_update").hide();
    $("#btn_submit").show();

    if ($("#idData").val() != "") {
        loadEditData();
        $("#btn_update").show();
        $("#btn_submit").hide();
    }
});


function loadEditData() {
    var idData = $("#idData").val();

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#urlPath").val() + "/Planning/GetEditData",
        data: JSON.stringify({ "idData": idData }),
        success: function (response) {
            console.log('isi response', response);
            if (response.Data != null) {
                var dt = response.Data;
                
                var datepicker = $("#txt_tgl").data("kendoDatePicker");
                datepicker.enable(false);

                //var shiftDisable = $("#txt_shift").data("kendoDropDownList");
                //shiftDisable.enable(false);

                //$("#txt_shift").data("kendoDropDownList").value(dt.SHIFT_NAME);
                $("#txt_rom").data("kendoDropDownList").value(dt.ROM_NAME);
                $("#txt_material").data("kendoDropDownList").value(dt.MATERIAL_NAME);                
                $("#txt_tgl").data("kendoDatePicker").value(dt.Tanggal);
                $("#txt_seam").val(dt.Seam);
                $("#txt_block").val(dt.Block);
                $("#txt_strip").val(dt.Strip);
                $("#txt_elevasi").val(dt.Elevasi);
                $("#txt_inventory").val(dt.Inventory);

                $("#txt_tm").val(dt.Tm);
                $("#txt_im").val(dt.Im);
                $("#txt_ash").val(dt.Ash);
                $("#txt_vm").val(dt.Vm);
                $("#txt_fc").val(dt.Fc);
                $("#txt_ts").val(dt.Ts);
                $("#txt_cva").val(dt.Cva);
                $("#txt_cvd").val(dt.Cvd);
                $("#txt_rd").val(dt.Rd);
                $("#txt_hgi").val(dt.Hgi);
                $("#txt_csn").val(dt.Csn);
                $("#txt_is").val(dt.Is);
                $("#txt_mc").val(dt.Mc);
                $("#txt_md").val(dt.Md);
                $("#txt_ml").val(dt.Ml);
                $("#txt_ff").val(dt.Ff);
                $("#txt_so").val(dt.So);
                $("#txt_pr").val(dt.Pr);
            }
        }
    });
}

function btn_submit_onclick() {
    var input = {
        Tanggal: $("#txt_tgl").val(),
        //SHIFT_NAME: $("#txt_shift").val(),
        Seam: $("#txt_seam").val(),
        Block: $("#txt_block").val(),
        Strip: $("#txt_strip").val(),
        Elevasi: $("#txt_elevasi").val(),
        MATERIAL_NAME: $("#txt_material").val(),
        ROM_NAME: $("#txt_rom").val(),
        Inventory: $("#txt_inventory").val(),
        Ash: $("#txt_ash").val(),
        Tm: $("#txt_tm").val(),
        Im: $("#txt_im").val(),
        Vm: $("#txt_vm").val(),
        Fc: $("#txt_fc").val(),
        Ts: $("#txt_ts").val(),
        Cva: $("#txt_cva").val(),
        Cvd: $("#txt_cvd").val(),
        Rd: $("#txt_rd").val(),
        Hgi: $("#txt_hgi").val(),
        Csn: $("#txt_csn").val(),
        Is: $("#txt_is").val(),
        Mc: $("#txt_mc").val(),
        Md: $("#txt_md").val(),
        Ml: $("#txt_ml").val(),
        Ff: $("#txt_ff").val(),
        So: $("#txt_so").val(),
        Pr: $("#txt_pr").val(),
    };

    console.log('input param', input);

    $.ajax({
        type: "POST",
        url: $("#urlPath").val() + "/Planning/CreatePlan",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(input),
        success: function (response) {
            if (response.status == true) {
                alert(response.remark)
                //console.log(JSON.stringify(_param));
                window.parent.$("#dv_add").data("kendoWindow").close()
            }
            else {
                console.log(response);
                alert("Error Message: " + response.remark);
                $("#gridData").data("kendoGrid").dataSource.read();
            }
        }
    })
}

function btn_update_onclick() {
    var editData = {
        Tanggal: $("#txt_tgl").val(),
        SHIFT_NAME: $("#txt_shift").val(),
        Id: $("#idData").val(),
        Seam: $("#txt_seam").val(),
        Block: $("#txt_block").val(),
        Strip: $("#txt_strip").val(),
        Elevasi: $("#txt_elevasi").val(),
        MATERIAL_NAME: $("#txt_material").val(),
        ROM_NAME: $("#txt_rom").val(),
        Inventory: $("#txt_inventory").val(),
        Ash: $("#txt_ash").val(),
        Tm: $("#txt_tm").val(),
        Im: $("#txt_im").val(),
        Vm: $("#txt_vm").val(),
        Fc: $("#txt_fc").val(),
        Ts: $("#txt_ts").val(),
        Cva: $("#txt_cva").val(),
        Cvd: $("#txt_cvd").val(),
        Rd: $("#txt_rd").val(),
        Hgi: $("#txt_hgi").val(),
        Csn: $("#txt_csn").val(),
        Is: $("#txt_is").val(),
        Mc: $("#txt_mc").val(),
        Md: $("#txt_md").val(),
        Ml: $("#txt_ml").val(),
        Ff: $("#txt_ff").val(),
        So: $("#txt_so").val(),
        Pr: $("#txt_pr").val(),
    };

    console.log('edit param', editData);

    $.ajax({
        type: "POST",
        url: $("#urlPath").val() + "/Planning/UpdatePlan",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(editData),
        success: function (response) {
            if (response.status == true) {
                alert(response.remark)
                //console.log(JSON.stringify(_param));
                window.parent.$("#dv_add").data("kendoWindow").close()
            }
            else {
                console.log(response);
                alert("Error Message: " + response.remark);
                $("#gridData").data("kendoGrid").dataSource.read();
            }
        }
    })
}

function btn_close_onclick() {
    window.parent.$("#dv_add").data("kendoWindow").close();
}