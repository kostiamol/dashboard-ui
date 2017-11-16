import React from 'react';
import * as helpers from '../helpers/helpers';

class FridgeDetailedInfo extends React.Component {
    constructor(props) {
        super(props);

        var url = window.location.href.split("/");
        var urlParams = parseURLParams(window.location.href);
        var domain = url[2].split(":");

        var fridgeDataList = [];
        var webSocket = new WebSocket("ws://" + domain[0] + ":3546" + "/devices/" + String(urlParams["mac"]));
        webSocket.onmessage = function (event) {
            var incomingMessage = event.data;
            var fridgeData = JSON.parse(incomingMessage);
            fridgeDataList.push(fridgeData);
        };

        this.onTurnedOn = this.onTurnedOn.bind(this);
        this.onUpdateOn = this.onUpdateOn.bind(this);
        this.onStreamOn = this.onStreamOn.bind(this);
        
        this.state = {
            showStreamData: false,
        }
    }

    componentDidMount() {
        let urlParams = helpers.parseURLParams(window.location.href);

        axios.get("/devices/id/data" + "?mac=" + urlParams["mac"] + "&type=" + urlParams["type"] + "&name=" + urlParams["name"])
            .then(function (response) {
                let fridge = JSON.parse(response);
                setDevDataFields(obj);
                printFridgeDataChart(fridge);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("/devices/" + urlParams["mac"] + "/config?mac=" + urlParams["mac"] + "&type=" + urlParams["type"] + "&name=" + urlParams["name"])
            .then(function (response) {
                let config = JSON.parse(response);
                setDevConfigFields(config);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setDevDataFields = (fridge) =>{
        document.getElementById('devType').value = fridge["meta"]["type"];
        document.getElementById('devName').value = fridge["meta"]["name"];
    }

    printFridgeDataChart = (fridge) => {
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
                    for (let i = 0; i < fridge["data"]["TopCompart"].length; ++i) {
                        data.push({
                            x: parseInt(fridge["data"]["TopCompart"][i].split(':')[0]),
                            y: parseFloat(fridge["data"]["TopCompart"][i].split(':')[1])
                        });
                    }
                    return data;
                }())
            }, {
                name: 'BotCompart',
                data: (function () {
                    let data = [];
                    for (let i = 0; i < fridge["data"]["BotCompart"].length; ++i) {
                        data.push({
                            x: parseInt(fridge["data"]["BotCompart"][i].split(':')[0]),
                            y: parseFloat(fridge["data"]["BotCompart"][i].split(':')[1])
                        });
                    }
                    return data;
                }())
            }]
        })
    }

    onTurnedOn() {
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
    }

    onUpdate() {
        helpers.sendDevConfigFreq(
            urlParams["mac"],
            parseInt(document.getElementById('collectFreq').value),
            parseInt(document.getElementById('sendFreq').value)
        );
    }

    onStreamOn() {
        let value = this.innerHTML;
        if (value === "On") {
            /*helpers.sendDevDataStreamOn(
                urlParams["mac"],
                false
            );*/
            showStreamData = false;
            this.innerHTML = "Off";
            this.className = "btn btn-danger";
        } else {
            /*helpers.sendDevDataStreamOn(
                urlParams["mac"],
                true
            );*/
            showStreamData = true;
            this.innerHTML = "On";
            this.className = "btn btn-success";
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h2>Detailed device info</h2>
                    <form className="form-horizontal">
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Basic device info</h4>
                                <div className="form-group">
                                    <label for="turnedOnBtn" className="col-sm-4 control-label">State</label>
                                    <div className="col-sm-8">
                                        <button type="button" className="btn btn-success" id="turnedOnBtn" onClick={this.onTurnedOn}></button>
                                    </div>
                                </div>
                                <fieldset disabled>
                                    <div className="form-group">
                                        <label for="devType" className="col-sm-4 control-label">Type</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="devType" className="form-control" value="" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="devName" className="col-sm-4 control-label">Name</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="devName" className="form-control" value="type" />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="col-md-6">
                                <h4>Configuration</h4>
                                <div className="form-group">
                                    <label for="collectFreq" className="col-sm-4 control-label">Data collection interval (ms)</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="collectFreq" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="sendFreq" className="col-sm-4 control-label">Data sending interval (ms)</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="sendFreq" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="updateBtn" className="col-sm-4 control-label">Update</label>
                                    <div className="col-sm-8">
                                        <button type="button" className="btn btn-success" id="updateBtn" onClick={this.onUpdate}></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4>Line chart</h4>
                        <div className="form-group">
                            <label for="streamOnBtn" className="col-sm-2 control-label">Data stream</label>
                            <div className="col-sm-10">
                                <button type="button" className="btn btn-success" id="streamOnBtn" onClick={this.onStreamOn}></button>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="container" style="height: 400px; min-width: 310px">
                </div>
            </div>
        );
    }
}

export default FridgeDetailedInfo;
