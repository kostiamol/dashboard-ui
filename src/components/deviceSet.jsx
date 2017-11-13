import React from 'react';
import Navigation from './components/navigation.jsx';
import FridgeCard from './components/fridgeCard.jsx';

class DeviceSet extends React.Component {
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
                <Navigation />
                <div id="container" class="container">
                    <div id="row" class="row">
                        {this.state.devices.map((device) =>
                            this.createDeviceCard(device)
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default DeviceSet;
