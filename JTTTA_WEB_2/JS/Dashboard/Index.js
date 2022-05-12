



$(document).ready(function () {

    $("#txt_tanggal").kendoDatePicker({
        value: new Date(),
        dateInput: true,
        format: "yyyyMMdd"
    });

    loadALlChart();





});

$(window).resize(function () {
    kendo.resize($("div.k-chart[data-role='chart']"));
});


function loadALlChart() {
    var tgl_param = $("#txt_tanggal").val();

    $("#judul").html("Review Produksi Tanggal " + loadDate(tgl_param) + "");

    $("#dv_detil").empty();

    loadhourchart(tgl_param);
    loadchart_pit(tgl_param);
    loadchart_material(tgl_param);
    loadchart_destination(tgl_param);
    loadResume(tgl_param);
    loadchart_unitPerf(tgl_param);
    loadchart_unitKontraktor(tgl_param);


}


function loadResume(s_tanggal) {

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#urlPath").val() + "/Dashboard/getSumaryProduksi?s_tanggal=" + s_tanggal + "",
        //data: JSON.stringify(s_Employee),
        success: function (data) {
            //console.log(data.Data[0])
            $("#dv_prod").html(data.Data[0]["JML_PROD"]);
            $("#dv_ritase").html(data.Data[0]["JML_RITASE"]);
            $("#dv_unit").html(data.Data[0]["JML_UNIT"]);
            $("#dv_avg").html(data.Data[0]["AVG_NETTO"]);
            $("#dv_netto_s1").html("SHIFT 1 : " + data.Data[0]["netto_s1"]);
            $("#dv_netto_s2").html("SHIFT 2 : " + data.Data[0]["netto_s2"]);
            $("#dv_ritase_s1").html("SHIFT 1 : " + data.Data[0]["ritase_s1"]);
            $("#dv_ritase_s2").html("SHIFT 2 : " + data.Data[0]["ritase_s2"]);

        }
    });


}





function loadhourchart(tgl_param) {

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: $("#urlPath").val() + "/Dashboard/getJTSmmProduksi_shiftly?s_tanggal=" + tgl_param + "",
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
            //width: 900,
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

            //stack: true,

        },
        series: [
            //{
            //    type: "line",
            //    field: "trans_netto",
            //    //categoryField: "tanggal_jam",
            //    name: "Produksi "
            //},
            {
                type: "line",
                field: "netto_s1",
                //categoryField: "jam_12",
                name: "Shift 1 ",
                labels: {
                    visible: true,
                    position: "right",
                    background: "#C7C7C7",
                    font: "12px sans-serif",
                    format: "{0:n0}",
                    color: "#ffd017",
                    template: "#if (value > 0) {# #: value # #}#",
                }
            }
            , {
                type: "line",
                field: "netto_s2",
                //categoryField: "jam_12",
                name: "Shift 2 ",
                labels: {
                    visible: true,
                    position: "bottom",
                    background: "#000000",
                    font: "12px sans-serif",
                    format: "{0:n0}",
                    color: "#FFFFFF",
                    template: "#if (value > 0) {# #: value # #}#",
                }
            }
        ],
        seriesColors: ["#FFFFFF", "#ffd017", "#A05FCF", "#cccecc"],
        categoryAxis: {
            field: "tanggal_jam",
            type: "Date",
            //labels: {
            //    template: labelTemplate,
            //},
            baseUnit: "hours",
            labels: {
                dateFormats: {
                    hours: "HH"
                }
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

        //var jam = str.substring(str.length - (str.length - (str.length - 5)), str.length - (str.length - (str.length - 3)));

        var jam = kendo.toString(kendo.parseDate(str), 'HH');

        //return ("#= kendo.toString(kendo.parseDate(e.value), 'dd-MM-yyyy HH:mm') #");

        return jam;
    }


    $("#dv_ritaseperjam").kendoChart({
        dataSource: dataSource,
        //title: {
        //    text: ""
        //},
        chartArea: {
            height: 300,
            //width: 900,
            background: "#2156c6"
        },
        legend: {
            position: "top",
            labels: {
                //background: "green",
                color: "white",

            }
        },
        seriesDefaults: {

            //stack: true,
            labels: {
                visible: "#if (value > 0) {# true #}else{# false #}#",
                //position: "insideEnd",
                background: "#000000",
                font: "12px sans-serif",
                format: "{0:n0}",
                color: "#FFFFFF",
                template: "#if (value > 0) {# #: value # #}#",
            },
        },
        series: [
            //    {
            //    type: "line",
            //    field: "jml_ritase",
            //    //categoryField: "jam_24",
            //    name: "Ritase "
            //}
            {
                type: "line",
                field: "jam_ritase_s1",
                //categoryField: "jam_12",
                name: "Shift 1 ",
                labels: {
                    visible: true,
                    position: "right",
                    background: "#C7C7C7",
                    font: "12px sans-serif",
                    format: "{0:n0}",
                    color: "#ffd017",
                    template: "#if (value > 0) {# #: value # #}#",
                }
            }
            , {
                type: "line",
                field: "jam_ritase_s2",
                //categoryField: "jam_12",
                name: "Shift 2 ",
                labels: {
                    visible: true,
                    position: "bottom",
                    background: "#000000",
                    font: "12px sans-serif",
                    format: "{0:n0}",
                    color: "#FFFFFF",
                    template: "#if (value > 0) {# #: value # #}#",
                }
            }
        ],
        seriesColors: ["#FFFFFF", "#ffd017", "#A05FCF", "#cccecc"],
        categoryAxis: {
            field: "tanggal_jam",
            type: "Date",
            //labels: {
            //    template: labelTemplate,
            //},
            baseUnit: "hours",
            labels: {
                dateFormats: {
                    hours: "HH"
                }
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


function loadDate(tgl) {

    var monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    var logTgl = tgl.substring(6) + " " + monthNames[parseInt(tgl.substring(4 , 6))-1] + " " + tgl.substring(0, 4)

    console.log(tgl.substring(4, 6));
    return logTgl;
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
        seriesClick: function (e) {
            scafolding_area(dataSource, 'P');
        },
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
        seriesClick: function (e) {
            scafolding_area(dataSource, 'M');
        },
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
        seriesClick: function (e) {
            scafolding_area(dataSource, 'D');
        },
        // seriesColors: ["#FFF323", "#FF5403", "#28A745", "#DC3545"],
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




    //buildHtmlTable('#dv_tblperdestination', ds)

}


function loadchart_unitPerf(tgl_param) {

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: $("#urlPath").val() + "/Dashboard/getJTSmmProduksi_category?s_tanggal=" + tgl_param + "&s_cat=U",
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

    $("#dv_unitprod").kendoChart({
        dataSource: dataSource,
        //title: {
        //    text: ""
        //},
        chartArea: {
            height: 300,
            background: "#77ACF1"
        },
        seriesDefaults: {
            type: "column",
            labels: {
                visible: true,
                format: "{0:n0}",
                font: "12px Arial, Helvetica,sans-serif"
            }
        },
        // seriesColors: ["#FFF323", "#FF5403", "#28A745", "#DC3545"],
        series: [
            {
                field: "NETTO",
                categoryField: "CATEGORY",
                autoFit: true
            }
        ],
        categoryAxis: {
            labels: {
                rotation: 270
            },
            majorGridLines: {
                visible: true
            },
            color: "#FFFFFF",
            crosshair: {
                visible: true
            }
        },
        valueAxis: {
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
            //shared: true,
            template: "No. Unit : #= dataItem.CATEGORY # <br> Tonnage : #= dataItem.NETTO #",
            format: "{0:n0}",
            color: "black"
        }

    });




    //buildHtmlTable('#dv_tblperdestination', ds)

}

function loadchart_unitKontraktor(tgl_param) {

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: $("#urlPath").val() + "/Dashboard/getJTSmmProduksi_category?s_tanggal=" + tgl_param + "&s_cat=K",
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

    $("#dv_kontraktor").kendoChart({
        dataSource: dataSource,
        //title: {
        //    text: ""
        //},
        chartArea: {
            height: 300,
            background: "#77ACF1"
        },
        seriesDefaults: {
            type: "column",
            labels: {
                visible: true,
                format: "{0:n0}",
                font: "12px Arial, Helvetica,sans-serif"
            }
        },
        // seriesColors: ["#FFF323", "#FF5403", "#28A745", "#DC3545"],
        series: [
            {
                field: "NETTO",
                categoryField: "CATEGORY",
                autoFit: true
            }
        ],
        categoryAxis: {

            majorGridLines: {
                visible: true
            },
            color: "#FFFFFF",
            crosshair: {
                visible: true
            }
        },
        valueAxis: {
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
            //shared: true,
            template: "Kontraktor : #= dataItem.CATEGORY # <br> Tonnage : #= dataItem.NETTO #",
            format: "{0:n0}",
            color: "black"
        }

    });




    //buildHtmlTable('#dv_tblperdestination', ds)

}


function closedetil() {
    $("#dv_detil").css({ "background-color": "#273745", "padding-top": "0px", "padding-bottom": "0px" });
    $("#dv_detil").empty();
}

function scafolding_area(dataSource, tipe) {

    $("#dv_detil").empty();
    $("#dv_detil").append(
        '<div class="col-xs-12"><ul class="nav navbar-right panel_toolbox">' +
        '    <li onclick="closedetil()"><a class="close-link"><i class="fa fa-close"></i></a></li>' +
        '</ul><div>'
    );

    $("#dv_detil").css({ "background-color": "#273745", "padding-top": "10px", "padding-bottom": "10px" });


    var lok = "";
    if (tipe == 'P') {
        lok = "Pit";
    } else if (tipe == "M") {
        lok = "Material";
    } else if (tipe == "D") {
        lok = "Destination";
    }

    dataSource.fetch().then(function () {
        var data = dataSource.data();

        var tgl_param = $("#txt_tanggal").val();

        //console.log(data.length);

        var i = 0;
        while (i < data.length) {

            $("#dv_detil").append(
                '<div class="col-md-4 col-xs-12 ">' +
                '<div class= "card col-xs-12 " style = "background:#17A2B8;border-radius: 5px;margin-top:3px" >' +
                '<div class="x_title text-white" style="color:#FFFFF">' +
                '<h2 style="font-weight:bold;color:#FFFFFF;">Tonnage By Block in ' + lok + ' ' + data[i].CATEGORY + '</h2>' +
                '<ul class="nav navbar-right panel_toolbox">' +
                '<li><a class="collapse-link"' +
                'data-toggle="collapse" href="#dv_' + data[i].CATEGORY.replace(/ /g, "_") + '" role="button" aria-expanded="false" aria-controls="dv_' + data[i].CATEGORY + '" ' +
                '><i class="fa fa-chevron-up"></i></a>' +
                '</li>' +
                '</ul>' +
                '<div class="clearfix" style="background:#17A2B8"></div> ' +
                '</div>' +
                '<div class="card-body"> ' +
                '<div class="x_content" id="dvid_' + data[i].CATEGORY.replace(" ", "_") + '"> ' +

                '<div id="dv_' + data[i].CATEGORY.replace(/ /g, "_") + '" style="height:300px" class="col-xs-12">' +

                '</div>' +

                '</div>' +
                '</div>' +
                '</div > ' +
                '</div >'
            );


            loadchart_summaryDetil('dv_' + data[i].CATEGORY.replace(/ /g, "_").replace("  ", "_") + '', tipe, data[i].CATEGORY, tgl_param);

            i = i + 1;
        }

        i = 0;

        //while (i < data.length) {

        //    //console.log('' + data[i].CATEGORY);
        //    loadchart_summaryDetil('dv_' + data[i].CATEGORY + '', tipe, data[i].CATEGORY, tgl_param);

        //    i = i + 1;
        //}


    });

}


function loadchart_summaryDetil(area, tipe, param, tgl_param) {

    //console.log(area);

    var lok = "";
    if (tipe == 'P') {
        lok = "Pit";
    } else if (tipe == "M") {
        lok = "Material";
    } else if (tipe == "D") {
        lok = "Destination";
    }

    var tgl_param = $("#txt_tanggal").val();

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: $("#urlPath").val() + "/Dashboard/getJTSmmProduksi_summaryDetil?s_tipe=" + tipe + "&s_param=" + param + "&s_tgl_param=" + tgl_param + "",
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

    $("#" + area + "").kendoChart({
        dataSource: dataSource,
        //title: {
        //    text: ""
        //},
        legend: {
            position: "top",
            labels: {
                font: "14px sans-serif bold",
                color: "white",
                // template: "#: text # ( #: kendo.toString(value, 'n0') # )"
            }
        },
        chartArea: {
            height: 300,
            background: "#17A2B8"
        },
        seriesDefaults: {
            type: "column",
            labels: {
                visible: true,
                format: "{0:n0}",
                font: "12px Arial, Helvetica,sans-serif"
            }
        },
        // seriesColors: ["#FFF323", "#FF5403", "#28A745", "#DC3545"],
        series: [
            {
                field: "netto",
                categoryField: "blok",
                autoFit: true
            }
        ],
        categoryAxis: {
            majorGridLines: {
                visible: true
            },
            color: "#FFFFFF",
            crosshair: {
                visible: true
            }
        },
        valueAxis: {
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
            //shared: true,
            template: "Blok : #= dataItem.blok # <br> Tonnage : #= dataItem.netto #",
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