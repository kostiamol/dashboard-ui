import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import DeviceSet from './devices/deviceSet'
import DeviceDetailedInfo from './devices/deviceDetailedInfo';

class Main extends React.Component {
    componentDidMount() {
        require('script-loader!./resources/js/libs/THREE.js');
        require('script-loader!./resources/js/libs/Reflector.js');
        require('script-loader!./resources/js/libs/stats.min.js');
        require('script-loader!./resources/js/libs/dat.gui.min.js');
        require('script-loader!./resources/js/libs/OrbitControls.js');
        require('script-loader!./resources/js/libs/MTLLoader.js');
        require('script-loader!./resources/js/libs/DDSLoader.js');
        require('script-loader!./resources/js/libs/OBJLoader.js');
        require('script-loader!./resources/js/globalVariables.js');
        require('script-loader!./resources/js/eventListeners.js');
        require('script-loader!./resources/js/lightAndCamera.js');
        require('script-loader!./resources/js/init.js');
        require('script-loader!./resources/js/modelLoader.jsx');
        require('script-loader!./resources/js/userEvents.js');
        require('script-loader!./resources/js/app.js');
        require('script-loader!./resources/js/gui.js');
        require('script-loader!./resources/js/threeMouse.js');
    }
    
    render() {
        return (
            <main>      
                <div id='workspace'></div>          
                <Switch>
                    <Route exact path='/' render={() => (
                        <Redirect to='/devices' />
                    )} />                   
                    <Route exact path='/devices' histoty={history} component={DeviceSet} />
                    {/* <Route path='/devices/:id' histoty={history} component={DeviceSet} /> */}
                    <Route path='/devices/:id' histoty={history} component={DeviceDetailedInfo} />
                </Switch>
            </main>
        );
    }
}

export default Main;
