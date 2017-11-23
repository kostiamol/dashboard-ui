import React from 'react';
import { Link } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import FridgeDetailedInfo from './fridgeDetailedInfo'

class FridgeTile extends React.Component {

    render() {
        let timeStampTopCompart = this.props.topCompart[this.props.topCompart.length - 1].split(":")[0]
        let dateTopCompart = new Date(parseInt(timeStampTopCompart)).toLocaleString()
        let tempTopCompart = this.props.topCompart[this.props.topCompart.length - 1].split(":")[1]

        let timeStampBotCompart = this.props.botCompart[this.props.botCompart.length - 1].split(":")[0]
        let dateBotCompart = new Date(parseInt(timeStampBotCompart)).toLocaleString()
        let tempBotCompart = this.props.botCompart[this.props.botCompart.length - 1].split(":")[1]

        return (
            <div>
                <div className="info-card">
                    <div className="front">
                        <img className="card-image" src="/style/imgs/fridge.ico" />
                    </div>
                    <div className="back">
                        <p>Type:{this.props.type}</p>
                        <p>Name:{this.props.name}</p>
                        <p>
                            "Cam1Time: "{dateTopCompart}<br></br>
                            "Cam1Temp: "{tempTopCompart}<br></br><br></br>
                            "Cam2Time: "{dateBotCompart}<br></br>
                            "Cam2Temp: "{tempBotCompart}
                        </p>
                        <Link className="btn btn-basic" to={`/devices/${this.props.mac}`}>Detailed info</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default FridgeTile;
