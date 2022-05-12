$(document).ready(function () {
    $("#txt_material").kendoDropDownList({
        optionLabel: "Select Material",
        dataTextField: "MATERIAL_NAME",
        dataValueField: "MATERIAL_NAME",
        //height: 310,
        dataSource: data_material
    }).data("kendoDropDownList");

    $("#txt_rom").kendoDropDownList({
        optionLabel: "Select Rom",
        dataTextField: "ROM_NAME",
        dataValueField: "ROM_NAME",
        //height: 310,
        dataSource: data_rom
    }).data("kendoDropDownList");

    $("#txt_tgl").kendoDatePicker({
        format: "yyyy-MM-dd",
        value: new Date(),
        dateInput: true
    });
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

//var data_rom = [
//    { id: 1, ROM_NAME: "FRESH" },
//    { id: 2, ROM_NAME: "COLD" },
//    { id: 3, ROM_NAME: "WARM" }
//];

function btn_submit_onclick() {
    var input = {
        Tanggal: $("#txt_tgl").val(),
        ROM_NAME: $("#txt_rom").val(),
        MATERIAL_NAME: $("#txt_material").val(),     
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

    console.log('param create quality', input);

    $.ajax({
        type: "POST",
        url: $("#urlPath").val() + "/BA_Quality/CreateQuality",
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
                //$("#gridData").data("kendoGrid").dataSource.read();
            }
        }
    })
}

function btn_close_onclick() {
    window.parent.$("#dv_add").data("kendoWindow").close();
}