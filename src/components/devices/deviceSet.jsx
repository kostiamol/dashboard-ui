import React from 'react';
import axios from 'axios';
import FridgeTile from './fridge/fridgeTile';

class DeviceSet extends React.Component {
    state = {
        devicesCount: 0,
        devices: []
    };

    componentDidMount() {
        axios.get('http://localhost:3301/devices')
        .then(({ data }) => {
            this.setState({
                    devices: data,
                    devicesCount: data.length
                });
        })
        .catch(function (error) {
            console.log(error);
        });
        global.reactHistory = this.props.history;
        console.log(this);
    }   

    showDeviceTile = (device) => {
        switch (device.meta.type) {
            case 'fridge': {
                return <FridgeTile
                    key={device.meta.mac}
                    type={device.meta.type}
                    name={device.meta.name}
                    mac={device.meta.mac}
                    topCompart={device.data.TopCompart}
                    botCompart={device.data.BotCompart}
                />;
            }
            default:
                console.error("unknown device type");
        }
    }

    render() {
        return (
            <div>
                <div id="containerTile">
                    <div id="row" className="row">
                        {this.state.devices.map(device =>
                            this.showDeviceTile(device)
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default DeviceSet;
