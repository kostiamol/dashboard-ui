import React from 'react';
import Websocket from 'react-websocket';
import * as helpers from '../../../helpers/helpers';

class FridgeDetailedInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showStreamData: false,
            fridgeDataList: []
        }

        this.onUpdate = this.onUpdate.bind(this);         
        this.onTurnedOn = this.onTurnedOn.bind(this);
        this.onStreamOn = this.onStreamOn.bind(this);
        this.handleData = this.handleData.bind(this);
    }    

    setDevMeta = (meta) => {
        document.getElementById('devType').value = meta.type;
        document.getElementById('devName').value = meta.name;
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
            this.props.mac,
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

    handleData(data) {
        var fridgeData = JSON.parse(data);
        fridgeDataList.push(fridgeData);
    }

    render() {
        return (
            <div>
                <Websocket url={'ws://localhost:3546/devices/' + this.props.mac} onMessage={this.handleData} />
                <div className="container">
                    <h2>Detailed device info</h2>
                    <form className="form-horizontal">
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Basic device info</h4>
                                <div className="form-group">
                                    <label htmlFor="turnedOnBtn" className="col-sm-4 control-label">State</label>
                                    <div className="col-sm-8">
                                        <button type="button" className="btn btn-success" id="turnedOnBtn" onClick={this.onTurnedOn}></button>
                                    </div>
                                </div>
                                <fieldset disabled>
                                    <div className="form-group">
                                        <label htmlFor="devType" className="col-sm-4 control-label">Type</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="devType" className="form-control" value="" readOnly/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="devName" className="col-sm-4 control-label">Name</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="devName" className="form-control" value="type" readOnly/>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="col-md-6">
                                <h4>Configuration</h4>
                                <div className="form-group">
                                    <label htmlFor="collectFreq" className="col-sm-4 control-label">Data collection interval (ms)</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="collectFreq" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="sendFreq" className="col-sm-4 control-label">Data sending interval (ms)</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="sendFreq" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="updateBtn" className="col-sm-4 control-label">Update</label>
                                    <div className="col-sm-8">
                                        <button type="button" className="btn btn-success" id="updateBtn" onClick={this.onUpdate}></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4>Line chart</h4>
                        <div className="form-group">
                            <label htmlFor="streamOnBtn" className="col-sm-2 control-label">Data stream</label>
                            <div className="col-sm-10">
                                <button type="button" className="btn btn-success" id="streamOnBtn" onClick={this.onStreamOn}></button>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="container" styles={{height: '400px', minWidth: '310px'}}>
                </div>
            </div>
        );
    }
}

export default FridgeDetailedInfo;
