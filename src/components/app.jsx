import React from 'react'
import Header from './header'
import Main from './main'

class App extends React.Component {
    render() {
        return (
            <div className="appContainer">
                <Header />
                <Main />
            </div>
        );
    }
}

export default App;
