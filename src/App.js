import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Landing from './views/Landing';
import Datasets from './views/Datasets';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/datasets" component={Datasets} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
