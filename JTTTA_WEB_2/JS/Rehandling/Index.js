
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

let interval;

$(document).ready(function () {

    $("#txt_tanggal").kendoDatePicker({
        value: new Date(),
        dateInput: true,
        format: "yyyy-MM-dd"
    });


    $("#txt_jam").kendoDropDownList({
        dataSource:
            [
                { text: "00", value: "00" },
                { text: "01", value: "01" },
                { text: "02", value: "02" },
                { text: "03", value: "03" },
                { text: "04", value: "04" },
                { text: "05", value: "05" },
                { text: "06", value: "06" },
                { text: "07", value: "07" },
                { text: "08", value: "08" },
                { text: "09", value: "09" },
                { text: "10", value: "10" },
                { text: "11", value: "11" },
                { text: "12", value: "12" },
                { text: "13", value: "13" },
                { text: "14", value: "14" },
                { text: "15", value: "15" },
                { text: "16", value: "16" },
                { text: "17", value: "17" },
                { text: "18", value: "18" },
                { text: "19", value: "19" },
                { text: "20", value: "20" },
                { text: "21", value: "21" },
                { text: "22", value: "22" },
                { text: "23", value: "23" },
                { text: "24", value: "24" }
            ]
        ,
        dataTextField: "text",
        dataValueField: "value"
    }).data("kendoDropDownList");


    $("#txt_menit").kendoDropDownList({
        dataSource:
            [
                { text: "00", value: "00" },
                { text: "04", value: "04" },
                { text: "05", value: "05" },
                { text: "06", value: "06" },
                { text: "07", value: "07" },
                { text: "08", value: "08" },
                { text: "09", value: "09" },
                { text: "10", value: "10" },
                { text: "11", value: "11" },
                { text: "12", value: "12" },
                { text: "13", value: "13" },
                { text: "14", value: "14" },
                { text: "15", value: "15" },
                { text: "16", value: "16" },
                { text: "17", value: "17" },
                { text: "18", value: "18" },
                { text: "19", value: "19" },
                { text: "20", value: "20" },
                { text: "21", value: "21" },
                { text: "22", value: "22" },
                { text: "23", value: "23" },
                { text: "24", value: "24" },
                { text: "25", value: "25" },
                { text: "26", value: "26" },
                { text: "27", value: "27" },
                { text: "28", value: "28" },
                { text: "29", value: "29" },
                { text: "30", value: "30" },
                { text: "31", value: "31" },
                { text: "32", value: "32" },
                { text: "33", value: "33" },
                { text: "34", value: "34" },
                { text: "35", value: "35" },
                { text: "36", value: "36" },
                { text: "37", value: "37" },
                { text: "38", value: "38" },
                { text: "39", value: "39" },
                { text: "40", value: "40" },
                { text: "41", value: "41" },
                { text: "42", value: "42" },
                { text: "43", value: "43" },
                { text: "44", value: "44" },
                { text: "45", value: "45" },
                { text: "46", value: "46" },
                { text: "47", value: "47" },
                { text: "48", value: "48" },
                { text: "49", value: "49" },
                { text: "50", value: "50" },
                { text: "51", value: "51" },
                { text: "52", value: "52" },
                { text: "53", value: "53" },
                { text: "54", value: "54" },
                { text: "55", value: "55" },
                { text: "56", value: "56" },
                { text: "57", value: "57" },
                { text: "58", value: "58" },
                { text: "59", value: "59" }

            ]
        ,
        dataTextField: "text",
        dataValueField: "value"
    }).data("kendoDropDownList");


    $("#txt_Unit").kendoDropDownList({
        dataSource: ds_unit,
        //height: 200,
        size: "large",
        filter: 'contains',
        dataTextField: "UNIT_NO",
        dataValueField: "UNIT_NO"
    }).data("kendoDropDownList");

   
    
    cekAktif();
   

    
   




});

function cekAktif() {
    //alert('masuk');
    if ($('#check').prop("checked")) {
        //setInterval(myTimer, 1000);

        interval = setInterval(myTimer, 1000);

    } else {
        clearInterval(interval);
    }

    //var checkBox = document.getElementById("myCheck");
    //var text = document.getElementById("text");
    //if (checkBox.checked == true) {
    //    text.style.display = "block";
    //} else {
    //    text.style.display = "none";
    //}
}



function myTimer() {

    if ($('#check').prop("checked")) {
        console.log('active');
    } else {
        console.log('not active');
    }

    const d = new Date();

    //var tanggal = d.getFullYear + '-' + d.getMonth + '-' + d.getDay

    //var datepicker = $("#txt_tanggal").data("kendoDatePicker");
    //datepicker.value(new Date(d.getFullYear, d.getMonth-1, d.getDay));

    if (d.toString('yyyy-MM-dd') != $("#txt_tanggal").val()) {

        $("#txt_tanggal").val(d.toString('yyyy-MM-dd'));

        
        //$("#txt_tanggal").value(new Date(d.getFullYear, d.getMonth - 1, d.getDay));
    }

    if (d.toString('HH') != $("#txt_jam").val()) {

        //$("#txt_jam").value();
        //$("#txt_jam").val(d.toString('HH'));
        $("#txt_jam").data("kendoDropDownList").value(d.toString('HH'));



    }


    if (d.toString('mm') != $("#txt_menit").val()) {

        //$("#txt_menit").val(d.toString('mm'));
        $("#txt_menit").data("kendoDropDownList").value(d.toString('mm'));



    }

    //console.log(d.toString('yyyy-MM-dd') + '---' + d.toString('HH') + ':' + d.toString('mm') + '----' + $("#txt_jam").val());

   
}


function load_Rom() {
    $.ajax({
        type: "POST",
        url: $("#urlPath").val() + "/Rehandling/updateBlokData",
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




