import React from 'react';
import axios from 'axios';
import Websocket from 'react-websocket';

class FridgeDetailedInfo extends React.Component {
    state = {
        dataSeries: [],
        collectFreq: 0,
        sendFreq: 0,
        turnedOn: false,
        streamOn: false,
    }

    componentDidMount() {
        this.printFridgeDataSeriesChart(this.props.data);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            collectFreq: newProps.config.collectFreq,
            sendFreq: newProps.config.sendFreq,
            turnedOn: newProps.config.turnedOn,
        })
    };

    printFridgeDataSeriesChart = (fridgeData) => {
        const active = this.state.streamOn;
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

    handleTurnedOn = () => {
        this.setState({ turnedOn: !this.state.turnedOn }, () => {
            axios.patch('http://localhost:3301/devices/' + this.props.id + '/config', {
                mac: this.props.meta.mac,
                "data": {
                    turnedOn: this.state.turnedOn
                }
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

    handleUpdate = () => {
        axios.patch('http://localhost:3301/devices/' + this.props.id + '/config', {
            mac: this.props.meta.mac,
            "data": {
                collectFreq: this.state.collectFreq,
                sendFreq: this.state.sendFreq,
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleStreamOn = () => {
        this.setState({ streamOn: !this.state.streamOn });
    }

    handleCollectFreq = (event) => {
        this.setState({ collectFreq: event.target.value });
    }

    handleSendFreq = (event) => {
        this.setState({ sendFreq: event.target.value });
    }

    handleWSMessages = (msg) => {
        console.dir(msg.data);
        this.setState({
            dataSeries: dataSeries.push(msg.data)
        });
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Websocket url={'ws://localhost:3546/devices/' + this.props.id} onMessage={this.handleWSMessages} />
                <div className="container">
                    <h2>Detailed device info</h2>
                    <form className="form-horizontal">
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Basic device info</h4>
                                <div className="form-group">
                                    <label htmlFor="turnedOnBtn" className="col-sm-4 control-label">State</label>
                                    <div className="col-sm-8">
                                        <button type="button" id="turnedOnBtn" onClick={this.handleTurnedOn} className={this.state.turnedOn ? "btn btn-success" : "btn btn-danger"}>{this.state.turnedOn ? "On" : "Off"}</button>
                                    </div>
                                </div>
                                <fieldset disabled>
                                    <div className="form-group">
                                        <label htmlFor="devType" className="col-sm-4 control-label">Type</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="devType" className="form-control" readOnly value={this.props.meta.type} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="devName" className="col-sm-4 control-label">Name</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="devName" className="form-control" readOnly value={this.props.meta.name} />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="col-md-6">
                                <h4>Configuration</h4>
                                <div className="form-group">
                                    <label htmlFor="collectFreq" className="col-sm-4 control-label">Data collection interval (ms)</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="collectFreq" className="form-control" onChange={this.handleCollectFreq} value={this.state.collectFreq} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="sendFreq" className="col-sm-4 control-label">Data sending interval (ms)</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="sendFreq" className="form-control" onChange={this.handleSendFreq} value={this.state.sendFreq} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="updateBtn" className="col-sm-4 control-label"></label>
                                    <div className="col-sm-8">
                                        <button type="button" className="btn btn-success" id="updateBtn" onClick={this.handleUpdate}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4>Line chart</h4>
                        <div className="form-group">
                            <label htmlFor="streamOnBtn" className="col-sm-2 control-label">Data stream</label>
                            <div className="col-sm-10">
                                <button type="button" id="streamOnBtn" onClick={this.handleStreamOn} className={this.state.streamOn ? "btn btn-success" : "btn btn-danger"}>{this.state.streamOn ? "On" : "Off"}</button>
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
