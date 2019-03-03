import React, { Component } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import PendingOperations from './components/PendingOperations/PendingOperations';
import WebglDisplay from './components/WebglDisplay/WebglDisplay';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <WebglDisplay />
        <PendingOperations />
      </div>
    );
  }
}

export default App;
