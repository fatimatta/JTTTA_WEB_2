



$(document).ready(function () {

    $("#txt_tanggal").kendoDatePicker({
        value: new Date(),
        dateInput: true,
        format: "yyyyMM",
        start: "year",
        depth: "year",
        format: "yyyyMM",


    });

    var tgl_param = $("#txt_tanggal").val();

    $("#judul").html("Review Produksi Bulan " + tgl_param + "");

    loadhourchart(tgl_param);
    loadchart_pit(tgl_param);
    loadchart_material(tgl_param);
    loadchart_destination(tgl_param);
    loadResume(tgl_param);




});

$(window).resize(function () {
    kendo.resize($("div.k-chart[data-role='chart']"));
});


function loadALlChart() {
    var tgl_param = $("#txt_tanggal").val();

    $("#judul").html("Review Produksi Bulan " + tgl_param + "");

    loadhourchart(tgl_param);
    loadchart_pit(tgl_param);
    loadchart_material(tgl_param);
    loadchart_destination(tgl_param);
    loadResume(tgl_param);
}


function loadResume(s_tanggal) {

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#urlPath").val() + "/Dashboard/getSumaryProduksi?s_tanggal=" + s_tanggal + "",
        //data: JSON.stringify(s_Employee),
        success: function (data) {
            console.log(data.Data[0])
            $("#dv_prod").html(data.Data[0]["JML_PROD"]);
            $("#dv_ritase").html(data.Data[0]["JML_RITASE"]);
            $("#dv_unit").html(data.Data[0]["JML_UNIT"]);
            $("#dv_avg").html(data.Data[0]["AVG_NETTO"]);

        }
    });


}





function loadhourchart(tgl_param) {

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: $("#urlPath").val() + "/Dashboard/getJTSmmProduksi_Monthly?s_tanggal=" + tgl_param + "",
                contentType: "application/json",
                type: "POST",
                cache: false
            }
        },
        schema: {
            data: "data",
            total: "total"
        }
    });


    //alert("loading");
    $("#dv_produksiperjam").kendoChart({
        dataSource: dataSource,

        //title: {
        //    text: ""
        //},
        chartArea: {
            height: 300,
            width: 900,
            background: "#2156c6"
        },
        legend: {
            position: "top",
            labels: {
                //background: "green",
                color: "white"
            }
        },
        seriesDefaults: {

            stack: true,
            //labels: {
            //    visible: "#if (value > 0) {# true #}else{# false #}#",
            //    //position: "insideEnd",
            //    background: "#000000",
            //    font: "12px sans-serif",
            //    format: "{0:n0}",
            //    color: "#FFFFFF",
            //    template: "#if (value > 0) {# #: value # #}#",
            //},
            //width: 90,

        },
        series: [{
            type: "column",
            field: "netto_s1",
            //categoryField: "tanggal_jam",
            name: "Produksi Shift 1 ",
            labels: {
                visible: true,
                position: "insideEnd",
                background: "#000000",
                font: "12px sans-serif",
                format: "{0:n0}",
                color: "#FFFFFF",
                //template: "#if (value > 0) {# #: value # #}#",
            }
            //width: 40
        },
        {
            type: "column",
            field: "netto_s2",
            //categoryField: "tanggal_jam",
            name: "Produksi shift 2 ",
            labels: {
                visible: true,
                //position: "top",
                background: "#000000",
                font: "12px sans-serif",
                format: "{0:n0}",
                color: "#FFFFFF",
                //template: "#if (value > 0) {# #: value # #}#",
            }
            //width: 40
        }
        ],
        seriesColors: ["#FFFFFF", "#ffd017", "#A05FCF", "#cccecc"],
        categoryAxis: {
            field: "trans_tgl_produksi",
            labels: {
                template: labelTemplate,
            },
            majorGridLines: {
                visible: false
            },
            color: "#FFFFFF",
            crosshair: {
                visible: true
            }
        },
        valueAxis: {
            //type: "log",
            min: 0,
            //max: 100,
            //labels: {
            //    format: "{0:n0}"
            //},
            majorGridLines: {
                visible: false
            },
            color: "#FFFFFF"
        },
        tooltip: {
            visible: true,
            shared: true,
            format: "N0",
            color: "#000000",
            background: "#FFFFFF"
        }
    });

    function labelTemplate(e) {

        var str = e.value;

        var jam = str.substring(str.length - (str.length - (str.length - 2)), str.length);

        return jam;
    }


    $("#dv_ritaseperjam").kendoChart({
        dataSource: dataSource,
        //title: {
        //    text: ""
        //},
        chartArea: {
            height: 300,
            width: 900,
            background: "#2156c6"
        },
        legend: {
            position: "top",
            labels: {
                //background: "green",
                color: "white"
            }
        },
        seriesDefaults: {

            stack: true,
            //labels: {
            //    visible: "#if (value > 0) {# true #}else{# false #}#",
            //    //position: "insideEnd",
            //    background: "#000000",
            //    font: "12px sans-serif",
            //    format: "{0:n0}",
            //    color: "#FFFFFF",
            //    template: "#if (value > 0) {# #: value # #}#",
            //},
            //width: 90,

        },
        series: [{
            type: "column",
            field: "jam_ritase_s1",
            //categoryField: "tanggal_jam",
            name: "Ritase Shift 1 ",
            labels: {
                visible: true,
                position: "insideEnd",
                background: "#000000",
                font: "12px sans-serif",
                format: "{0:n0}",
                color: "#FFFFFF",
                //template: "#if (value > 0) {# #: value # #}#",
            }

            //width: 40
        },
        {
            type: "column",
            field: "jam_ritase_s2",
            //categoryField: "tanggal_jam",
            name: "Ritase shift 2 ",
            labels: {
                visible: true,
                //position: "top",
                background: "#000000",
                font: "12px sans-serif",
                format: "{0:n0}",
                color: "#FFFFFF",
                //template: "#if (value > 0) {# #: value # #}#",
            }
            //width: 40
        }
        ],
        seriesColors: ["#FFFFFF", "#ffd017", "#A05FCF", "#cccecc"],
        categoryAxis: {
            field: "trans_tgl_produksi",
            labels: {
                template: labelTemplate,
            },
            majorGridLines: {
                visible: false
            },
            color: "#FFFFFF",
            crosshair: {
                visible: true
            }
        },
        valueAxis: {
            //type: "log",
            min: 0,
            //max: 100,
            //labels: {
            //    format: "{0:n0}"
            //},
            majorGridLines: {
                visible: false
            },
            color: "#FFFFFF"
        },
        tooltip: {
            visible: true,
            shared: true,
            format: "N0",
            color: "#000000",
            background: "#FFFFFF"
        }
    });
}



function loadchart_pit(tgl_param) {


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: $("#urlPath").val() + "/Dashboard/getJTSmmProduksi_category?s_tanggal=" + tgl_param + "&s_cat=P",
                contentType: "application/json",
                type: "POST",
                cache: false
            }
        },
        schema: {
            data: "data",
            total: "total"
        }
    });



    $("#dv_perpit").kendoChart({
        dataSource: dataSource,
        //title: {
        //    text: ""
        //},
        legend: {
            //position: "right",
            offsetX: -30,
            labels: {
                //background: "green",
                font: "14px sans-serif bold",
                color: "white",
                template: "#: text # ( #: kendo.toString(value, 'n0') # )"
            }
        },
        chartArea: {
            height: 300,
            background: "#77ACF1"
        },
        seriesDefaults: {
            type: "pie",
            labels: {
                visible: true,
                format: "{0:n0}",
                font: "12px Arial, Helvetica,sans-serif"
            }
        },
        //zoomable: true,
        //seriesColors: ["#FFF323", "#FF5403", "#28A745", "#DC3545"],
        series: [
            {
                field: "NETTO",
                categoryField: "CATEGORY",
                autoFit: true
            }
        ],
        tooltip: {
            visible: true,
            //shared: true,
            template: "Pit : #= dataItem.CATEGORY # <br> Tonnage : #= dataItem.NETTO #",
            format: "{0:n0}",
            color: "black"
        }

    });




}



function loadchart_material(tgl_param) {

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: $("#urlPath").val() + "/Dashboard/getJTSmmProduksi_category?s_tanggal=" + tgl_param + "&s_cat=M",
                contentType: "application/json",
                type: "POST",
                cache: false
            }
        },
        schema: {
            data: "data",
            total: "total"
        }
    });

    $("#dv_permaterial").kendoChart({
        dataSource: dataSource,
        //title: {
        //    text: ""
        //},
        legend: {
            offsetX: -30,
            labels: {
                font: "14px sans-serif bold",
                color: "white",
                template: "#: text # ( #: kendo.toString(value, 'n0') # )"
            }
        },
        chartArea: {
            height: 300,
            background: "#77ACF1"
        },
        seriesDefaults: {
            type: "pie",
            labels: {
                visible: true,
                format: "{0:n0}",
                font: "12px Arial, Helvetica,sans-serif"
            }
        },
        //seriesColors: ["#FFF323", "#FF5403", "#28A745", "#DC3545"],
        series: [
            {
                field: "NETTO",
                categoryField: "CATEGORY",
                autoFit: true
            }
        ],
        tooltip: {
            visible: true,
            //shared: true,
            template: "Material : #= dataItem.CATEGORY # <br> Tonnage : #= dataItem.NETTO #",
            format: "{0:n0}",
            color: "black"
        }
    });



}




function loadchart_destination(tgl_param) {

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: $("#urlPath").val() + "/Dashboard/getJTSmmProduksi_category?s_tanggal=" + tgl_param + "&s_cat=D",
                contentType: "application/json",
                type: "POST",
                cache: false
            }
        },
        schema: {
            data: "data",
            total: "total"
        }
    });

    $("#dv_perdestination").kendoChart({
        dataSource: dataSource,
        //title: {
        //    text: ""
        //},
        legend: {
            offsetX: -30,
            labels: {
                font: "14px sans-serif bold",
                color: "white",
                template: "#: text # ( #: kendo.toString(value, 'n0') # )"
            }
        },
        chartArea: {
            height: 300,
            background: "#77ACF1"
        },
        seriesDefaults: {
            type: "pie",
            labels: {
                visible: true,
                format: "{0:n0}",
                font: "12px Arial, Helvetica,sans-serif"
            }
        },
        //seriesColors: ["#FFF323", "#FF5403", "#28A745", "#DC3545"],
        series: [
            {
                field: "NETTO",
                categoryField: "CATEGORY",
                autoFit: true
            }
        ],
        tooltip: {
            visible: true,
            //shared: true,
            template: "Destination : #= dataItem.CATEGORY # <br> Tonnage : #= dataItem.NETTO #",
            format: "{0:n0}",
            color: "black"
        }

    });


    //buildHtmlTable('#dv_tblperdestination', ds)

}


function buildHtmlTable(selector, db) {
    var columns = addAllColumnHeaders(db, selector);

    for (var i = 0; i < db.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = db[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $(selector).append(row$);
    }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $(selector).append(headerTr$);

    return columnSet;
}