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
    debugger
    $("#txt_jt").kendoDropDownList({
        dataSource: ds_jt,
        dataTextField: "JT_KODE",
        dataValueField: "JT_KODE"
    }).data("kendoDropDownList");

    $("#txt_jam_timbang").kendoDateTimePicker({
        timeFormat: "HH:mm",
        format: "yyyy-MM-dd HH:mm",
        value: new Date(),
        dateInput: true
    });

    $("#txt_no_unit").kendoDropDownList({
        dataSource: ds_unit,
        dataTextField: "UNIT_NO",
        dataValueField: "UNIT_NO"
    }).data("kendoDropDownList");

    $("#txt_pit").kendoDropDownList({
        dataSource: ds_pit,
        dataTextField: "PIT_NAME",
        dataValueField: "PIT_CODE"
    }).data("kendoDropDownList");


    $("#txt_raw").kendoDropDownList({
        dataSource: ds_material,
        dataTextField: "MATERIAL_NAME",
        dataValueField: "MATERIAL_CODE"
    }).data("kendoDropDownList");

    $("#txt_destination").kendoDropDownList({
        dataSource: ds_destination,
        dataTextField: "DEST_NAME",
        dataValueField: "DEST_CODE"
    }).data("kendoDropDownList");

    $("#txt_condition").kendoDropDownList({
        dataSource: ds_condition,
        dataTextField: "COND_NAME",
        dataValueField: "COND_CODE"
    }).data("kendoDropDownList");

    $("#txt_condition").kendoDropDownList({
        dataSource: ds_condition,
        dataTextField: "COND_NAME",
        dataValueField: "COND_CODE"
    }).data("kendoDropDownList");


});


function btn_submit_onclick() {
    var _list = {
        TRANS_PIT: $("#txt_pit").val(),
        TRANS_BLOCK: $("#txt_block").val(),
        TRANS_ELEVASI: $("#txt_elevasi").val(),
        TRANS_SEAM: $("#txt_seam").val(),
        TRANS_RAW: $("#txt_raw").val(),
        TRANS_EXCAVATOR: $("#txt_excavator").val(),
        TRANS_DESTINATION: $("#txt_destination").val(),
        TRANS_CONDITION: $("#txt_condition").val(),
        TRANS_NO_UNIT: $("#txt_no_unit").val(),
        TRANS_JT_NAME: $("#txt_jt").val(),
        TRANS_DATETIME: $("#txt_jam_timbang").val(),
        TRANS_OPERATOR: $("#txt_operator").val(),
        
    }
    var _param = {
        s_trans: _list
    }


    $.ajax({
        type: "POST",
        url: $("#urlPath").val() + "/TransaksiJTSMM/insertTransaction",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(_param),
        success: function (response) {
            if (response.status == true) {
                alert(response.remark)
                console.log(JSON.stringify(_param));
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



//-----end function