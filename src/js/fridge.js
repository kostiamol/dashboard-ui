import * as helpers from 'helpers';

function setDevDataFields(obj) {
    document.getElementById('devType').value = obj["meta"]["type"];
    document.getElementById('devName').value = obj["meta"]["name"];
}

function printFridgeDataChart(obj) {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    Highcharts.stockChart('container', {
        chart: {
            events: {
                load: function () {
                    let seriesTopCompart = this.series[0];
                    let seriesBotCompart = this.series[1];
                    let timerForRepaint = 50;
                    let repaint = function (fridge) {
                        for (key in fridge.data.BotCompart) {
                            let time = parseInt(key);
                            let temp = parseFloat(fridge.data.BotCompart[key]);
                            seriesBotCompart.addPoint([time, temp], true, true);
                        }
                        for (key in fridge.data.TopCompart) {
                            let time = parseInt(key);
                            let temp = parseFloat(fridge.data.TopCompart[key]);
                            seriesTopCompart.addPoint([time, temp], true, true);
                        }
                    };

                    let timerId = setInterval(function () {
                        if (showStreamData === true) {
                            let fridgeData = fridgeDataList.shift()
                            if (fridgeData !== undefined) {
                                repaint(fridgeData)
                            }
                        }
                    }, timerForRepaint)
                }
            }
        },

        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },

        exporting: {
            enabled: false
        },

        series: [{
            name: 'TopCompart',
            data: (function () {
                let data = [];
                for (let i = 0; i < obj["data"]["TopCompart"].length; ++i) {
                    data.push({
                        x: parseInt(obj["data"]["TopCompart"][i].split(':')[0]),
                        y: parseFloat(obj["data"]["TopCompart"][i].split(':')[1])
                    });
                }
                return data;
            }())
        }, {
            name: 'BotCompart',
            data: (function () {
                let data = [];
                for (let i = 0; i < obj["data"]["BotCompart"].length; ++i) {
                    data.push({
                        x: parseInt(obj["data"]["BotCompart"][i].split(':')[0]),
                        y: parseFloat(obj["data"]["BotCompart"][i].split(':')[1])
                    });
                }
                return data;
            }())
        }]
    })
}

let showStreamData = false;

$(document).ready(function () {
    let urlParams = helpers.parseURLParams(window.location.href);

    $.get("/devices/id/data" + "?mac=" + urlParams["mac"] + "&type=" + urlParams["type"] + "&name=" + urlParams["name"], function (data) {
        let obj = JSON.parse(data);
        setDevDataFields(obj);
        printFridgeDataChart(obj);
    });

    $.get("/devices/" + urlParams["mac"] + "/config?mac=" + urlParams["mac"] + "&type=" + urlParams["type"] + "&name=" + urlParams["name"], function (data) {
        let obj = JSON.parse(data);
        setDevConfigFields(obj);
    });

    document.getElementById("turnedOnBtn").onclick = function () {
        let value = this.innerHTML;
        if (value === "On") {
            sendDevConfigTurnedOn(
                urlParams["mac"],
                false
            );
            this.innerHTML = "Off";
            this.className = "btn btn-danger";
        } else {
            sendDevConfigTurnedOn(
                urlParams["mac"],
                true
            );
            this.innerHTML = "On";
            this.className = "btn btn-success";
        }
    };

    document.getElementById("updateBtn").onclick = function () {
        helpers.psendDevConfigFreq(
            urlParams["mac"],
            parseInt(document.getElementById('collectFreq').value),
            parseInt(document.getElementById('sendFreq').value)
        );
    };

    document.getElementById("streamOnBtn").onclick = function () {
        let value = this.innerHTML;
        if (value === "On") {
            /*helpers.psendDevDataStreamOn(
                urlParams["mac"],
                false
            );*/
            showStreamData = false;
            this.innerHTML = "Off";
            this.className = "btn btn-danger";
        } else {
            /*helpers.psendDevDataStreamOn(
                urlParams["mac"],
                true
            );*/
            showStreamData = true;
            this.innerHTML = "On";
            this.className = "btn btn-success";
        }
    };
});
