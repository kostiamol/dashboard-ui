import React from 'react';
import ReactDOM from 'react';

class DeviceSet extends React.Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                        </div>
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul class="nav navbar-nav">
                                <li>
                                    <a href="index.html">Devices</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div id="devices"></div>
            </div>
        );
    }
}

ReactDOM.render(<DeviceSet />, document.getElementById('root'));
