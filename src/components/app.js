import React, { Component } from 'react';
import Map from '../containers/map';

class App extends Component {
  render() {  
    return (
      <div className="App">
          <Map showAutoCompleteInput="true"  />
      </div>
    );
  }
}

export default App;
