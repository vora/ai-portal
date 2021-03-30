import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppEnv } from './env';

import Landing from './views/Landing';
import Login from './views/Login';
import Register from './views/Register';
import AddResource from './views/AddResource';
import Admin from './views/Admin';
import ViewResource from './views/ViewResource';
import AddOrganization from './views/AddOrganization';
import ViewOrganization from './views/ViewOrganization';
import UserSettings from './views/UserSettings';
import Mod from './views/Mod';
import AddTopic from './views/AddTopic';
import Feedback from './views/Feedback';
import ResetPassword from './views/ResetPassword';
import Verify from './views/Verify';
import SearchResults from './views/SearchResults';
import FAQ from './views/Faq';
import Topics from './views/Topics';

function App() {
  return (
    <div className="App">
      <AppEnv>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/resources" component={SearchResults} />
            <Route exact path="/resources/create" component={AddResource} />
            <Route path="/resources/:resId" component={ViewResource} />
            {/* auth is just alias for login */}
            <Route path="/auth" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/admin" component={Admin} />
            <Route path="/settings" component={UserSettings} />
            <Route path="/mod" component={Mod} />
            <Route exact path="/organizations" component={SearchResults} />
            <Route
              exact
              path="/organizations/create"
              component={AddOrganization}
            />
            <Route
              exact
              path="/organizations/:orgId"
              component={ViewOrganization}
            />
            <Route exact path="/topics/create" component={AddTopic} />
            <Route exact path="/feedback" component={Feedback} />
            <Route exact path="/reset" component={ResetPassword} />
            <Route exact path="/verify" component={Verify} />
            <Route exact path="/topics" component={Topics} />
            <Route exact path="/faq" component={FAQ} />
          </Switch>
        </BrowserRouter>
      </AppEnv>
    </div>
  );
}

export default App;
