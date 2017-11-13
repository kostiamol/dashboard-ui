import React from 'react';

class FridgeCard extends React.Component {
    constructor(props) {
        super(props);
        this.onShowDetailedData = this.onShowDetailedInfo.bind(this);
    }

    onShowDetailedInfo() {
        window.location = "fridge.html?type=" + this.props.type + "&name="
            + this.props.name + "&mac=" + this.props.mac;
    }

    render() {
        return (
            <div class="info-card">
                <div class="front">
                    <img class="card-image" src="/style/imgs/fridge.ico" />
                </div>
                <div class="back">
                    <p>Type:{this.props.type}</p>
                    <p>Name:{this.props.name}</p>
                    <p>
                        "Cam1Time: "{new Date(parseInt(this.props.topCompart[0])).toLocaleString()}<br></br>
                        "Cam1Temp: "{this.props.topCompart[1]}<br></br><br></br>
                        "Cam2Time: "{new Date(parseInt(this.props.botCompart[0])).toLocaleString()}<br></br>
                        "Cam2Temp: "{this.props.botCompart[1]}
                    </p>
                    <button type="button" class="btn btn-basic" onClick={this.onShowDetailedInfo}>Detailed info</button>
                </div>
            </div>
        );
    }
}

export default FridgeCard;
