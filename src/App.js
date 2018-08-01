import React, { Component } from 'react';
import Header from './components/Header';
import ActivityList from './views/ActivityList';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ActivityList />
      </div>
    );
  }
}

export default App;
