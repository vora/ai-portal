import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppEnv } from './env';

import Landing from './views/Landing';
import Login from './views/Login';
import Register from './views/Register';
import Resources from './views/Resources';

function App() {
  return (
    <div className="App">
      <AppEnv>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/resources" component={Resources} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </AppEnv>
    </div>
  );
}

export default App;
