import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DeviceSet from './deviceSet'

class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={DeviceSet} />
                    <Route path='/devices' component={DeviceSet} />
                </Switch>
            </main>
        );
    }
}

export default Main;
