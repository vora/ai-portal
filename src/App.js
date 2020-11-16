import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppEnv } from './env';

import Landing from './views/Landing';
import Login from './views/Login';
import Register from './views/Register';
import Resources from './views/Resources';
import AddResources from './views/AddResource';
import Admin from './views/Admin';
import ViewResource from './views/ViewResource';
import AddOrganization from './views/AddOrganization';
import UserSettings from './views/UserSettings';

function App() {
  return (
    <div className="App">
      <AppEnv>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/resources" component={Resources} />
            <Route exact path="/resources/example" component={ViewResource} />
            <Route exact path="/resources/create" component={AddResources} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/admin" component={Admin} />
            <Route path="/settings" component={UserSettings} />
            <Route
              exact
              path="/organizations/create"
              component={AddOrganization}
            />
          </Switch>
        </BrowserRouter>
      </AppEnv>
    </div>
  );
}

export default App;
