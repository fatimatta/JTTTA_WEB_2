$(document).ready(function () {
    loadPlanScheduler();
});

var data_material = new kendo.data.DataSource({
    type: "json",
    transport: {
        read: {
            url: $("#urlPath").val() + "/PlanSchedule/GetMaterial",
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

function loadPlanScheduler() {
    $("#scheduler").kendoScheduler({
        //date: new Date(),
        date: new Date("2013/6/13"),
        startTime: new Date("2013/6/6 06:00"),
        endTime: new Date("2013/6/6 06:00"),
        height: 600,
        views: [
            "day",
            { type: "workWeek", selected: true },
            "week",
            "month",
            "year",
            "agenda",
            {
                type: "timeline",
                eventHeight: 50
            }
        ],
        editable: {
            template: $("#customEditorTemplate").html(),
        },
        eventTemplate: $("#event-template").html(),
        edit: function (e) {
            var event = e.event;
            this.one("save", function () {
                //alert(event.title);
                //window.alert("HALOOOOOOOO");
                var input = {
                    PLAN_START_TIME: $("#txt_start").val(),
                    PLAN_END_TIME: $("#txt_end").val(),
                    PLAN_SEAM: document.getElementsByName("txt_seam")[0].value,
                    PLAN_BLOCK: document.getElementsByName("txt_block")[0].value,
                    PLAN_STRIP: document.getElementsByName("txt_strip")[0].value,
                    PLAN_ELEVASI: document.getElementsByName("txt_elevasi")[0].value,
                    PLAN_INVENTORY: document.getElementsByName("txt_inven")[0].value,
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
                    url: $("#urlPath").val() + "/PlanSchedule/CreatePlanSchedule",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(input),
                    success: function (response) {
                        if (response.status == true) {
                            alert(response.remark)
                            //console.log(JSON.stringify(_param));
                            //window.parent.$("#dv_add").data("kendoWindow").close()
                        }
                        else {
                            console.log(response);
                            alert("Error Message: " + response.remark);
                            //$("#gridData").data("kendoGrid").dataSource.read();
                        }
                    }
                })
            });

            $("#txt_mat").kendoDropDownList({
                optionLabel: "Select Material",
                dataTextField: "MATERIAL_NAME",
                dataValueField: "MATERIAL_NAME",
                //height: 310,
                dataSource: data_material
            }).data("kendoDropDownList");

            $("#txt_dest").width(100).kendoDropDownList({
                optionLabel: "Select Desination",
                dataSource: data_rom,
                dataTextField: "ROM_NAME",
                dataValueField: "ROM_NAME",
            }).data("kendoDropDownList");
        },
        timezone: "Etc/UTC",
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: $("#urlPath").val() + "/PlanSchedule/GetPlanData",
                    dataType: "json",
                    //url: $("#urlPath").val() + "/Planning/GetPlan",
                    contentType: "application/json",
                    type: "POST",
                    //cache: false
                    complete: function (data) {
                        debugger
                        window.alert("data!!!");
                        console.log('isi data', data);
                        //if (data.status) {
                        //    var grid = $("#gridData_Plan").data("kendoGrid");
                        //    grid.refresh();
                        //    alert("data berhasil dihapus");
                        //    $("#gridData_Plan").data("kendoGrid").dataSource.read();
                        //} else {
                        //    alert(data.remarks);
                        //}
                    }
                },
                //update: {
                //    url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                //    dataType: "jsonp"
                //},
                //create: {
                //    url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
                //    dataType: "jsonp"
                //},
                //destroy: {
                //    url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
                //    dataType: "jsonp"
                //},
                parameterMap: function (options, operation) {
                    return JSON.stringify(options);
                    //if (operation !== "read" && options.models) {
                    //    return { models: kendo.stringify(options.models) };
                    //}
                    //if (operation === "read") {
                    //    window.alert("seneeehh");
                    //    console.log('1', JSON.stringify(options));
                    //    console.log('2', operation);
                    //    //var values = data.calendarIds.split(','),
                    //    //return JSON.stringify(values);
                    //}
                    //if (operation !== "read" && options.models) {
                    //    return { models: kendo.stringify(options.models) };
                    //}
                    //return JSON.stringify(options);
                }
            },
            schema: {
                model: {
                    id: "PLAN_ID",
                    fields: {
                        PLAN_ID: { from: "PLAN_ID", type: "string" },
                        //PLAN_START_TIME: { from: "PLAN_START_TIME", type: "date" },
                        //PLAN_END_TIME: { from: "PLAN_END_TIME", type: "date" },
                        PLAN_INVENTORY: { from: "PLAN_INVENTORY", type: "string" },
                        PLAN_SEAM: { from: "PLAN_SEAM", type: "string" },
                        PLAN_BLOCK: { from: "PLAN_BLOCK", type: "string" },
                        PLAN_STRIP: { from: "PLAN_STRIP", type: "string" },
                        PLAN_ELEVASI: { from: "PLAN_ELEVASI", type: "string" },
                        PLAN_MATERIAL: { from: "PLAN_MATERIAL", type: "string" },
                        PLAN_DEST: { from: "PLAN_DEST", type: "string" },
                        PLAN_ASH: { from: "PLAN_ASH", type: "number" },
                        PLAN_TM: { from: "PLAN_TM", type: "number" },
                        PLAN_IM: { from: "PLAN_IM", type: "number" },
                        PLAN_VM: { from: "PLAN_VM", type: "number" },
                        PLAN_FC: { from: "PLAN_FC", type: "number" },
                        PLAN_TS: { from: "PLAN_TS", type: "number" },
                        PLAN_CVA: { from: "PLAN_CVA", type: "number" },
                        PLAN_CVD: { from: "PLAN_CVD", type: "number" },
                        PLAN_RD: { from: "PLAN_RD", type: "number" },
                        PLAN_HGI: { from: "PLAN_HGI", type: "number" },
                        PLAN_CSN: { from: "PLAN_CSN", type: "number" },
                        PLAN_IS: { from: "PLAN_IS", type: "number" },
                        PLAN_MC: { from: "PLAN_MC", type: "number" },
                        PLAN_MD: { from: "PLAN_MD", type: "number" },
                        PLAN_ML: { from: "PLAN_ML", type: "number" },
                        PLAN_FF: { from: "PLAN_FF", type: "number" },
                        PLAN_SO: { from: "PLAN_SO", type: "number" },
                        PLAN_PR: { from: "PLAN_PR", type: "number" },
                        startTimezone: { from: "" },
                        endTimezone: { from: "" },
                    }
                },
                //data: "Data"
            },
            //filter: {
            //    logic: "or",
            //    filters: [
            //        { field: "planId", operator: "eq", value: 1 },
            //        { field: "planId", operator: "eq", value: 2 }
            //    ]
            //}
        },
        //dataSource: {
        //    batch: true,
        //    transport: {
        //        read: {
        //            url: "https://demos.telerik.com/kendo-ui/service/tasks",
        //            dataType: "json",
        //            complete: function (data) {
        //                debugger
        //                window.alert("data!!!");
        //                console.log('isi data', data);
        //                //if (data.status) {
        //                //    var grid = $("#gridData_Plan").data("kendoGrid");
        //                //    grid.refresh();
        //                //    alert("data berhasil dihapus");
        //                //    $("#gridData_Plan").data("kendoGrid").dataSource.read();
        //                //} else {
        //                //    alert(data.remarks);
        //                //}
        //            }
        //        },
        //        update: {
        //            url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
        //            dataType: "jsonp"
        //        },
        //        create: {
        //            url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
        //            dataType: "jsonp"
        //        },
        //        destroy: {
        //            url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
        //            dataType: "jsonp"
        //        },
        //        parameterMap: function (options, operation) {
        //            if (operation !== "read" && options.models) {
        //                return { models: kendo.stringify(options.models) };
        //            }
        //        }
        //    },
        //    schema: {
        //        model: {
        //            id: "taskId",
        //            fields: {
        //                taskId: { from: "TaskID", type: "number" },
        //                title: { from: "Title", defaultValue: "No title", validation: { required: true } },
        //                start: { type: "date", from: "Start" },
        //                end: { type: "date", from: "End" },
        //                startTimezone: { from: "StartTimezone" },
        //                endTimezone: { from: "EndTimezone" },
        //                description: { from: "Description" },
        //                recurrenceId: { from: "RecurrenceID" },
        //                recurrenceRule: { from: "RecurrenceRule" },
        //                recurrenceException: { from: "RecurrenceException" },
        //                ownerId: { from: "OwnerID", defaultValue: 1 },
        //                isAllDay: { type: "boolean", from: "IsAllDay" }
        //            }
        //        }
        //    },
        //    filter: {
        //        logic: "or",
        //        filters: [
        //            { field: "ownerId", operator: "eq", value: 1 },
        //            { field: "ownerId", operator: "eq", value: 2 }
        //        ]
        //    }
        //},
        //resources: [
        //    {
        //        field: "ownerId",
        //        title: "Owner",
        //        dataSource: [
        //            { text: "Alex", value: 1, color: "#f8a398" },
        //            { text: "Bob", value: 2, color: "#51a0ed" },
        //            { text: "Charlie", value: 3, color: "#56ca85" }
        //        ]
        //    }
        //]
    });

    $("#people :checkbox").change(function (e) {
        var checked = $.map($("#people :checked"), function (checkbox) {
            return parseInt($(checkbox).val());
        });

        var scheduler = $("#scheduler").data("kendoScheduler");

        scheduler.dataSource.filter({
            operator: function (task) {
                return $.inArray(task.ownerId, checked) >= 0;
            }
        });
    });
}

function btn_submit_onclick() {
    window.alert("halo");
}

function btn_close_onclick() {
    $("#example").data("kendoWindow").close();
}