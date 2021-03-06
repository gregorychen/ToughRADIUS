if (!window.toughradius.admin.dashboard)
    toughradius.admin.dashboard={};

toughradius.admin.dashboard.UiCpuUseChart = function (uid) {
    return {
        id: uid,
        view: "highcharts",
        credits: {enabled: false},
        chart: {
            type: 'solidgauge',
            events: {
                load: function () {
                    toughradius.admin.dashboard.updateCpuUseChart(uid);
                }
            }
        },
        title: null,
        pane: {
            center: ['50%', '85%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        tooltip: {
            enabled: false
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                y: -70,
                text: 'CPU使用率(%)'
            },
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            labels: {
                y: 16
            }
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{}]
    }
};

toughradius.admin.dashboard.UiMemUseChart = function (uid) {
    return {
        id: uid,
        view: "highcharts",
        credits: {enabled: false},
        chart: {
            type: 'solidgauge',
            events: {
                load: function () {
                    toughradius.admin.dashboard.updateMemUseChart(uid);
                }
            }
        },
        title: "内存使用率",
        pane: {
            center: ['50%', '85%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        tooltip: {
            enabled: false
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                 y: -70,
                text: '内存使用率(%)'
            },
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            labels: {
                y: 16
            }
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{}]
    }
};


toughradius.admin.dashboard.UiDiskUseChart = function (uid) {
    return {
        id: uid,
        view: "highcharts",
        credits: {enabled: false},
        chart: {
            type: 'solidgauge',
            events: {
                load: function () {
                    toughradius.admin.dashboard.updateDiskUseChart(uid);
                }
            }
        },
        title: "磁盘使用率",
        pane: {
            center: ['50%', '85%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        tooltip: {
            enabled: false
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                 y: -70,
                text: '磁盘使用率(%)'
            },
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            labels: {
                y: 16
            }
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{}]
    }
};



toughradius.admin.dashboard.MsgStatChart = function (session,uid, infoid) {
    return {
        id: uid,
        view: "highcharts",
        height:270,
        credits: {enabled: false},
        chart: {
            height:270,
            type: 'areaspline',
            events: {
                load: function () {
                    toughradius.admin.dashboard.updateMsgChart(session, uid, infoid);
                }
            }
        },
        title: "",
        colors:['#00cca0', '#0080ff', '#ccae00','#cc0b2a'],
        xAxis: {type: 'datetime',tickInterval : 60*1000},
        yAxis: {title: {text: '消息量'},
            labels: {formatter: function() {return this.value;}}
        },
        tooltip: {shared: true},
        plotOptions: {areaspline: {
            stacking: 'normal',
            marker: {enabled: false,symbol: 'circle',radius: 2,states: {hover: {enabled: true}}},
            fillOpacity: 0.2
        }},
        series: [{},{},{},{}]
    }
};

toughradius.admin.dashboard.updateMsgChart = function (session,uid, infoid) {
    webix.ajax().get('/admin/radius/stat',{}).then(function (result) {
        var data = result.json();
            try {
                var authReqStat = {name:'认证请求',data:data.authReqStat};
                var authRespStat = {name:'认证响应',data:data.authRespStat};
                var acctReqStat = {name:'计费请求',data:data.acctReqStat};
                var acctRespStat = {name:'计费响应',data:data.acctRespStat};
                // var req_bytesStat = {name:'请求流量',data:data.req_bytesStat};
                // var resp_bytesStat = {name:'响应流量',data:data.resp_bytesStat};
                $$(uid).parse([authReqStat,authRespStat,acctReqStat,acctRespStat]);
                webix.ui(toughradius.admin.dashboard.msgstatInfos(session,infoid,data),$$(infoid));
//                $$(infoid).refresh();
            } catch(e){
                console.log(e);
            }
    }).fail(function (xhr) {
        webix.message({type: 'error', text: "加载数据失败:"+xhr.statusText,expire:700});
    });
};

/**
 * 更新CPU性能数据
 */
toughradius.admin.dashboard.updateCpuUseChart = function (uid) {
    webix.ajax().get('/admin/dashboard/cpuuse',{}).then(function (result) {
        var resp = result.json();
        if(resp.code===1){
            webix.message({type:'error', text:resp.msg,expire:700});
        }else{
            try {
               $$(uid).parse([{name:"使用率",data:[resp.data]}]);
            } catch(e){
                console.log(e);
            }
        }
    }).fail(function (xhr) {
        webix.message({type: 'error', text: "加载数据失败:"+xhr.statusText,expire:700});
    });
};
/**
 * 更新内存百分比数据
 */
toughradius.admin.dashboard.updateMemUseChart = function (uid) {
    webix.ajax().get('/admin/dashboard/memuse',{}).then(function (result) {
        var resp = result.json();
        if(resp.code===1){
            webix.message({type:'error', text:resp.msg,expire:700});
        }else{
            try {
               $$(uid).parse([{name:"使用率",data:[resp.data]}]);
            } catch(e){
                console.log(e);
            }
        }
    }).fail(function (xhr) {
        webix.message({type: 'error', text: "加载数据失败:"+xhr.statusText,expire:700});
    });
};

toughradius.admin.dashboard.updateDiskUseChart = function (uid) {
    webix.ajax().get('/admin/dashboard/diskuse',{}).then(function (result) {
        var resp = result.json();
        if(resp.code===1){
            webix.message({type:'error', text:resp.msg,expire:700});
        }else{
            try {
               $$(uid).parse([{name:"使用率",data:[resp.data]}]);
            } catch(e){
                console.log(e);
            }
        }
    }).fail(function (xhr) {
        webix.message({type: 'error', text: "加载数据失败:"+xhr.statusText,expire:700});
    });
};


toughradius.admin.dashboard.basicInfo = function(session){
    return {
        // view:"portlet",
        icon:false,
        body:{
            borderless:true,
            css:"panel-box",
            rows:[
                {
                    view: "toolbar",
                    cols: [
                        { view: "label", label: " <i class='fa fa-info-circle'></i> 系统信息", css:"dash-title", inputWidth: 150, align: "left" },
                        {},
                    ]
                },
                {
                    padding: 10,
                    cols: [
                        { view: "text", name: "oprname", label: "当前操作员", css: "nborder-input", value: session.username, readonly: true },
                        { view: "text", name: "logintime", label: "登录时间", css: "nborder-input", value: session.lastLogin, readonly: true },

                    ]
                },
                {
                    hidden:session.level!=='super',
                    padding: 10,
                    cols: [
                        { view: "text", name: "ipaddr", label: "登录IP地址", css: "nborder-input", value: session.ipaddr, readonly: true },
                        { view: "text", name: "version", label: "系统版本", css: "nborder-input", value: session.version, readonly: true },
                    ]
                }
            ]
        }
    };



};

toughradius.admin.dashboard.msgstatInfos = function(session,uid,statdata){
    return {
        id: uid,
        borderless: true,
        css: "panel-box",
        rows: [
            {
                view: "toolbar",
                cols: [
                    {view: "label", label: "认证记账统计", inputWidth: 150, align: "left"},
                    {},
                ]
            },
            {
                cols: [
                    {
                        padding: 10,
                        rows: [
                            {
                                view: "text",
                                name: "auth_req",
                                label: "认证请求",
                                labelWidth:100,
                                css: "nborder-input",
                                value: statdata.authReq,
                                readonly: true
                            },
                            {
                                view: "text",
                                name: "auth_accept",
                                label: "认证成功",
                                labelWidth:100,
                                css: "nborder-input",
                                value: statdata.authAccept,
                                readonly: true
                            },
                            {
                                view: "text",
                                name: "auth_reject",
                                label: "认证拒绝/延迟",
                                labelWidth:100,
                                css: "nborder-input",
                                value: statdata.authReject+"/"+(statdata.authRejectDelay||0),
                                readonly: true
                            },
                            {
                                view: "text",
                                name: "auth_drop",
                                label: "认证丢弃",
                                labelWidth:100,
                                css: "nborder-input",
                                value: statdata.authDrop,
                                readonly: true
                            },
                            {
                                view: "text",
                                name: "last_max_req",
                                label: "请求峰值",
                                labelWidth:100,
                                css: "nborder-input",
                                value: statdata.lastMaxReq + "  发生在 " + statdata.lastMaxReqDate,
                                readonly: true
                            },
                        ]
                    },
                    {
                        padding: 10,
                        rows: [
                            {
                                view: "text",
                                name: "acct_start",
                                label: "记账开始",
                                labelWidth:100,
                                css: "nborder-input",
                                value: statdata.acctStart,
                                readonly: true
                            },
                            {
                                view: "text",
                                name: "acct_stop",
                                label: "记账结束",
                                labelWidth:100,
                                css: "nborder-input",
                                value: statdata.acctStop,
                                readonly: true
                            },
                            {
                                view: "text",
                                name: "acct_update",
                                label: "记账更新",
                                labelWidth:100,
                                css: "nborder-input",
                                value: statdata.acctUpdate,
                                readonly: true
                            },
                            {
                                view: "text",
                                name: "acct_drop",
                                label: "记账丢弃",
                                labelWidth:100,
                                css: "nborder-input",
                                value: statdata.acctDrop,
                                readonly: true
                            },
                            {
                                view: "text",
                                name: "last_max_resp",
                                label: "响应峰值",
                                labelWidth:100,
                                css: "nborder-input",
                                value: statdata.lastMaxResp + "  发生在 " + statdata.lastMaxRespDate,
                                readonly: true
                            },
                        ]
                    },
                    {
                        padding: 10,
                        rows: [
                            {
                                view: "text",
                                name: "acct_req",
                                label: "记账请求",
                                labelWidth:100,
                                css: "nborder-input",
                                value: statdata.acctReq,
                                readonly: true
                            },
                            {
                                view: "text",
                                name: "acct_resp",
                                label: "记账响应",
                                labelWidth:100,
                                css: "nborder-input",
                                value: statdata.acctResp,
                                readonly: true
                            },
                            {
                                view: "text",
                                name: "req_bytes",
                                label: "请求流量",
                                labelWidth:100,
                                css: "nborder-input",
                                value: bytesToSize(statdata.reqBytes),
                                readonly: true
                            },
                            {
                                view: "text",
                                name: "resp_bytes",
                                label: "响应流量",
                                labelWidth:100,
                                css: "nborder-input",
                                value: bytesToSize(statdata.respBytes),
                                readonly: true
                            },
                            {
                                view: "text",
                                name: "last_max_req_bytes",
                                label: "请求流量峰值",
                                labelWidth:100,
                                css: "nborder-input",
                                value: bytesToSize(statdata.lastMaxReqBytes) + "  发生在 " + statdata.lastMaxReqBytesDate,
                                readonly: true
                            },
                        ]
                    }
                ]
            }
        ]
    }

};

toughradius.admin.dashboard.loadPage = function(session){
    toughradius.admin.methods.setToolbar("dashboard","控制面板","dashboard");
    var cpuchartUid = "toughradius.admin.dashboard.cpuchart_viewid." + webix.uid();
    var memchartUid = "toughradius.admin.dashboard.memchart_viewid." + webix.uid();
    var diskchartUid = "toughradius.admin.dashboard.diskchart_viewid." + webix.uid();
    var msgstatchartid = "toughradius.admin.dashboard.msgstatchart_viewid." + webix.uid();
    var msgstatInfoid = "toughradius.admin.dashboard.msgstatinfo_viewid." + webix.uid();
    var uptimeid = "toughradius.admin.dashboard.uptime.label";
    webix.ui({
        id:toughradius.admin.panelId,
        css:"main-panel",padding:5,
        rows:[
            {
                view:"scrollview",
                css:"dashboard",
                scroll:'y',
                body:{
                    type:"wide",
                    rows: [
                        toughradius.admin.dashboard.basicInfo(session),
                        // {height:10},
                        {
                            // view: "portlet",
                            icon: false,
                            borderless:true,
                            css:"panel-box",
                            rows:[
                                {
                                    view: "toolbar",
                                    height:40,
                                    cols: [
                                        {id:uptimeid,view:"label", height:33,paddingX:20, borderless: true, label:"", css:"dash-title"},
                                        {},
                                        {
                                            view: "button",
                                            label: "刷新",
                                            type: "icon",
                                            icon: "refresh",
                                            // borderless: true,
                                            width: 60,
                                            click: function () {
                                                toughradius.admin.dashboard.updateCpuUseChart(cpuchartUid);
                                                toughradius.admin.dashboard.updateMemUseChart(memchartUid);
                                                toughradius.admin.dashboard.updateDiskUseChart(memchartUid);
                                                webix.ajax().get('/admin/dashboard/uptime',{}).then(function (result) {
                                                    $$(uptimeid).define("template",  result.text());
                                                    $$(uptimeid).refresh();
                                                });
                                            }
                                        }
                                    ]
                                },
                                {
                                    height:180,
                                    cols:[
                                        toughradius.admin.dashboard.UiCpuUseChart(cpuchartUid),
                                        toughradius.admin.dashboard.UiMemUseChart(memchartUid),
                                        toughradius.admin.dashboard.UiDiskUseChart(diskchartUid)
                                    ]
                                }
                            ]
                        },
                        // {height:10},
                        {
                            // view: "portlet",
                            icon: false,
                            borderless:true,
                            css:"panel-box",
                            rows:[
                                {
                                    view: "toolbar",
                                    cols: [
                                        {view:"label", label:" <i class='fa fa-line-chart'></i> 15分钟消息统计 刷新间隔：60妙",css:"dash-title", width: 240},
                                        {},
                                        {
                                            view: "button",
                                            label: "刷新",
                                            type: "icon",
                                            icon: "refresh",
                                            borderless: true,
                                            width:60,
                                            click: function () {
                                                toughradius.admin.dashboard.updateMsgChart(session,msgstatchartid,msgstatInfoid);
                                            }
                                        }
                                    ]
                                },
                                {
                                    rows:[
                                        toughradius.admin.dashboard.MsgStatChart(session,msgstatchartid,msgstatInfoid),
                                        {id:msgstatInfoid}
                                    ]
                                }
                            ]
                        },
                        // {height:10},
                    ]
                }
            }
        ]
    },$$(toughradius.admin.pageId),$$(toughradius.admin.panelId));
    webix.ajax().get('/admin/dashboard/uptime',{}).then(function (result) {
        $$(uptimeid).define("template",result.text());
        $$(uptimeid).refresh();
    });

    //定时刷新消息统计
    if(toughradius.admin.dashboard.msgRefershTimer){
        clearInterval(toughradius.admin.dashboard.msgRefershTimer);
    }
    var reffunc = function(){
        toughradius.admin.dashboard.updateMsgChart(session, msgstatchartid,msgstatInfoid);
    };
    toughradius.admin.dashboard.msgRefershTimer = setInterval(reffunc,60*1000)

};
