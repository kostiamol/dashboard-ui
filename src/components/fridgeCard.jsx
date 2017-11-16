import React from 'react';

class FridgeCard extends React.Component {
    onShowDetailedInfo = () => {
        window.location = '/devices/' + this.props.mac;
    }

    render() {
        let timeStampTopCompart = this.props.topCompart[this.props.topCompart.length - 1].split(":")[0]
        let dateTopCompart = new Date(parseInt(timeStampTopCompart)).toLocaleString()
        let tempTopCompart = this.props.topCompart[this.props.topCompart.length - 1].split(":")[1]
        
        let timeStampBotCompart = this.props.botCompart[this.props.botCompart.length - 1].split(":")[0]
        let dateBotCompart = new Date(parseInt(timeStampBotCompart)).toLocaleString()
        let tempBotCompart = this.props.botCompart[this.props.botCompart.length - 1].split(":")[1]
        
        return (
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
                    <button type="button" className="btn btn-basic" onClick={this.onShowDetailedInfo}>Detailed info</button>
                </div>
            </div>
        );
    }
}

export default FridgeCard;
