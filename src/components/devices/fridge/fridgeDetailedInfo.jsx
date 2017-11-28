import React from 'react';
import axios from 'axios';
import Websocket from 'react-websocket';
import * as helpers from '../../../helpers/helpers';

class FridgeDetailedInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showStreamData: false,
            dataSeries: []
        };
    }

    componentDidMount() {
        document.getElementById('devType').value = this.props.meta.type;
        document.getElementById('devName').value = this.props.meta.name;
        if (this.props.config.turnedOn) {
            document.getElementById('turnedOnBtn').innerHTML = "On";
            document.getElementById('turnedOnBtn').className = "btn btn-success";
        } else {
            document.getElementById('turnedOnBtn').innerHTML = "Off";
            document.getElementById('turnedOnBtn').className = "btn btn-danger";
        }

        document.getElementById('collectFreq').value = this.props.config.collectFreq;
        document.getElementById('sendFreq').value = this.props.config.sendFreq;
        if (this.props.config.streamOn) {
            document.getElementById('streamOnBtn').innerHTML = "On";
            document.getElementById('streamOnBtn').className = "btn btn-success";
        } else {
            document.getElementById('streamOnBtn').innerHTML = "Off";
            document.getElementById('streamOnBtn').className = "btn btn-danger";
        }

        this.printFridgeDataSeriesChart(this.props.data);
    }

    printFridgeDataSeriesChart = (fridgeData) => {
        const active = this.state.showStreamData;
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
                            for (key in fridgeData.BotCompart) {
                                let time = parseInt(key);
                                let temp = parseFloat(fridgeData.BotCompart[key]);
                                seriesBotCompart.addPoint([time, temp], true, true);
                            }
                            for (key in fridgeData.TopCompart) {
                                let time = parseInt(key);
                                let temp = parseFloat(fridgeData.TopCompart[key]);
                                seriesTopCompart.addPoint([time, temp], true, true);
                            }
                        };

                        let timerId = setInterval(() => {
                            if (active) {
                                let datum = this.state.dataSeries.shift()
                                if (datum !== undefined) {
                                    repaint(datum)
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
                    for (let i = 0; i < fridgeData.TopCompart.length; ++i) {
                        data.push({
                            x: parseInt(fridgeData.TopCompart[i].split(':')[0]),
                            y: parseFloat(fridgeData.TopCompart[i].split(':')[1])
                        });
                    }
                    return data;
                }())
            }, {
                name: 'BotCompart',
                data: (function () {
                    let data = [];
                    for (let i = 0; i < fridgeData.BotCompart.length; ++i) {
                        data.push({
                            x: parseInt(fridgeData.BotCompart[i].split(':')[0]),
                            y: parseFloat(fridgeData.BotCompart[i].split(':')[1])
                        });
                    }
                    return data;
                }())
            }]
        })
    }

    onTurnedOn = () => {
        let value = this.innerHTML;
        if (value === "On") {
            sendDevConfigTurnedOn(
                this.props.meta.mac,
                false
            );
            this.innerHTML = "Off";
            this.className = "btn btn-danger";
        } else {
            sendDevConfigTurnedOn(
                this.props.meta.mac,
                true
            );
            this.innerHTML = "On";
            this.className = "btn btn-success";
        }
    }

    onUpdate = () => {       
        axios.patch('/devices/' + this.props.match.params.id + '/config', {
            collectFreq: parseInt(document.getElementById('collectFreq').value),
            sendFreq: parseInt(document.getElementById('sendFreq').value),
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    onStreamOn = () => {
        let value = this.innerHTML;
        if (value === "On") {
            /*helpers.sendDevDataStreamOn(
                urlParams["mac"],
                false
            );*/
            this.setState({
                showStreamData: false
            });
            this.innerHTML = "Off";
            this.className = "btn btn-danger";
        } else {
            /*helpers.sendDevDataStreamOn(
                urlParams["mac"],
                true
            );*/
            this.setState({
                showStreamData: true
            });
            this.innerHTML = "On";
            this.className = "btn btn-success";
        }
    }

    handleWSMessages = (msg) => {
        console.dir(msg.data);
        this.setState({
            dataSeries: dataSeries.push(msg.data)
        });
    }

    render() {
        return (
            <div>
                <Websocket url={'ws://localhost:3546/devices/' + this.props.meta.mac} onMessage={this.handleWSMessages} />
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
                                            <input type="text" id="devType" className="form-control" readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="devName" className="col-sm-4 control-label">Name</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="devName" className="form-control" readOnly />
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
                                    <label htmlFor="updateBtn" className="col-sm-4 control-label"></label>
                                    <div className="col-sm-8">
                                        <button type="button" className="btn btn-success" id="updateBtn" onClick={this.onUpdate}>Update</button>
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
                <div id="container" styles={{ height: '400px', minWidth: '310px' }}>
                </div>
            </div>
        );
    }
}

export default FridgeDetailedInfo;
