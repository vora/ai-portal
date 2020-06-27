import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Landing from './views/Landing';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/" component={Landing} />
        </div>
      </Router>
    </div>
  );
}

export default App;
