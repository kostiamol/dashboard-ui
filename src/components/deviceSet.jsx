import React from 'react';
import axios from 'axios';
import FridgeCard from './fridgeCard.jsx';

class DeviceSet extends React.Component {
    state = {
        devicesCount: 0,
        devices: []
    };

    componentDidMount() {
        this.receiveParams();
    }

    receiveParams = () => {
        axios.get('http://localhost:3301/devices')
            .then(({ data }) => {
                this.setState(
                    {
                        devices: data,
                        devicesCount: data.length
                    }
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    newDeviceCard = (device) => {
        switch (device.meta.type) {
            case 'fridge': {
                return <FridgeCard
                    type={device.meta.type}
                    name={device.meta.name}
                    mac={device.meta.mac}
                    topCompart={device.data.TopCompart}
                    botCompart={device.data.BotCompart}
                />
            }
        }
    }

    render() {
        return (
            <div>
                <div id="container" className="container">
                    <div id="row" className="row">
                        {this.state.devices.map(device =>
                            this.newDeviceCard(device)
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default DeviceSet;
