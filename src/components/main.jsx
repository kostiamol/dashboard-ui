import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import DeviceSet from './devices/deviceSet'
import DeviceDetailedInfo from './devices/deviceDetailedInfo';

class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' render={() => (
                        <Redirect to='/devices' />
                    )} />                    
                    <Route exact path='/devices' component={DeviceSet} />
                    <Route path='/devices/:id' component={DeviceDetailedInfo} />
                </Switch>
            </main>
        );
    }
}

export default Main;
