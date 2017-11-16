import React from 'react';
import FridgeDetailedInfo from './fridgeDetailedInfo.jsx';

class DeviceDetailedInfo extends React.Component {
    state = {
        devicesCount: 0,        
        devices: {}
    };

    componentDidMount() {
        axios.get('/devices')
            .then(function (response) {
                parsedDevices = JSON.parse(response);
                console.log("devices: ", parsedDevices);  
                console.log("devices count: ", parsedDevices.length);                                
                this.setState(
                    {devices: parsedDevices},
                    {devicesCount: parsedDevices.length}
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    createDeviceCard = (device) => {
        switch (device.type) {
            case 'fridge': {
                return <FridgeCard
                    type={device.type}
                    name={device.name}
                    mac={device.mac}
                    topCompart={device.topCompart}
                    botCompart={device.botCompart}
                />
            }
        }
    }
    
    render() {
        return (
            <div>               
                <div id="container" className="container">
                    <div id="row" className="row">
                        {this.state.devices.map((device) =>
                            this.createDeviceCard(device)
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default DeviceDetailedInfo;
