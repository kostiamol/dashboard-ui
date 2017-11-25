import React from 'react';
import axios from 'axios';
import FridgeDetailedInfo from './fridge/fridgeDetailedInfo';

class DeviceDetailedInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            meta: {},
            data: {},
            config: {},
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id
        axios.get('http://localhost:3301/devices/' + id + '/data')
            .then(({ data }) => {
                console.dir(data)
                this.state = {
                    meta: device.meta,
                    data: device.data,
                }
                console.dir(device)
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:3301/devices/' + id + '/config')
            .then(({ data }) => {
                console.dir(data)
                this.state = {
                    config: devConfig
                }
                console.dir(device)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    showDetailedInfo() {
        switch (this.state.meta.type) {
            case 'fridge': {
                return <FridgeDetailedInfo />
            }
        }
    }

    render() {
        return (
            <div>
                {this.showDetailedInfo(this.props.type)}
            </div>
        );
    }
}

export default DeviceDetailedInfo;
