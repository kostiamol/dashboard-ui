import React from 'react';
import { Link } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import FridgeDetailedInfo from './fridgeDetailedInfo'

class FridgeTile extends React.Component {

    render() {
        let timeStampTopCompart = this.props.topCompart[this.props.topCompart.length - 1].split(":")[0];
        let dateTopCompart = new Date(parseInt(timeStampTopCompart)).toLocaleString();
        let tempTopCompart = Number(this.props.topCompart[this.props.topCompart.length - 1].split(":")[1]).toFixed(1);

        console.log(tempTopCompart);

        let timeStampBotCompart = this.props.botCompart[this.props.botCompart.length - 1].split(":")[0]
        let dateBotCompart = new Date(parseInt(timeStampBotCompart)).toLocaleString()
        let tempBotCompart = Number(this.props.botCompart[this.props.botCompart.length - 1].split(":")[1]).toFixed(1);

        return (
            <div>
                <div className="info-card">
                    {/* <div className="front">
                        <img className="card-image" src="/style/imgs/fridge.ico" />
                    </div> */}
                    <div className="back">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Type:</td>
                                    <td>{this.props.type}</td>
                                </tr>
                                <tr>
                                    <td>Name:</td>
                                    <td>{this.props.name}</td>
                                </tr>
                                <tr>
                                    <td>Cam1Time:</td>
                                    <td>{dateTopCompart}</td>
                                </tr>
                                <tr>
                                    <td>Cam1Temp:</td>
                                    <td>{tempTopCompart}</td>
                                </tr>
                                <tr>
                                    <td>Cam2Time:</td>
                                    <td>{dateBotCompart}</td>
                                </tr>
                                <tr>
                                    <td>Cam2Temp:</td>
                                    <td>{tempBotCompart}</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <p>Type:{this.props.type}</p>
                        <p>Name:{this.props.name}</p>
                        <p>
                            "Cam1Time: "{dateTopCompart}<br></br>
                            "Cam1Temp: "{tempTopCompart}<br></br><br></br>
                            "Cam2Time: "{dateBotCompart}<br></br>
                            "Cam2Temp: "{tempBotCompart}
                        </p> */}
                        {/* <Link className="btn btn-basic" to={`/devices/${this.props.mac}`}>Detailed info</Link> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default FridgeTile;
