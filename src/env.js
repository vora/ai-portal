import React, { createContext, useContext, useState } from 'react';
import API from './api';

export const AppContext = createContext();

let setKey = (key, value) => {
  localStorage.setItem('aiportal:' + key, JSON.stringify(value));
};

let getKey = (key) => {
  return JSON.parse(localStorage.getItem('aiportal:' + key));
};

export function AppEnv({ children }) {
  let [user, _setUser] = useState(getKey('user'));
  let [enums, _setEnums] = useState(getKey('enums'));
  let [api, setAPI] = useState({ ...API, refreshKey: 0 });
  let setUser = (user) => {
    setKey('user', user);
    _setUser(user);
  };
  // This will force any components that rely on an API call
  // to retrigger and refresh content.
  let refreshAPI = () => {
    console.log('Refreshing all remote data...');
    setAPI({ ...API, refreshKey: api.refreshKey++ });
  };
  let logout = () => {
    setUser(null);
    setKey('token', '');
    refreshAPI();
  };
  if (!window.contextFound) {
    API.get('/api/context').then(({ user, enums }) => {
      window.contextFound = true;
      if (user && user._id) {
        setUser(user);
      }
      _setEnums(enums);
    });
  }
  return (
    <AppContext.Provider
      value={{
        api: api,
        userID: user?._id,
        user: user,
        enums: enums,
        setUser: setUser,
        setKey: setKey,
        getKey: getKey,
        logout: logout,
        refresh: refreshAPI,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppEnv = () => useContext(AppContext);
