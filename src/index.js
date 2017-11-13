import React from 'react';
import ReactDOM from 'react-dom';
import DeviceSet from './components/deviceSet.jsx';

class App extends React.Component {
  render() {
    return (
      <div>        
        <DeviceSet />
      </div>
    );
  }
}

ReactDOM.render(
  <App />, 
  document.getElementById('main')
);
