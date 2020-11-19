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
  let setUser = (user) => {
    setKey('user', user);
    _setUser(user);
  };
  let logout = () => {
    setUser(null);
    setKey('token', '');
  };
  console.log(user);
  if (!window.contextFound) {
    API.get('/api/context').then(({ user, enums }) => {
      window.contextFound = true;
      if (user && user.id) {
        setUser(user);
      }
      _setEnums(enums);
    });
  }
  return (
    <AppContext.Provider
      value={{
        api: API,
        userID: user?.id,
        user: user,
        enums: enums,
        setUser: setUser,
        setKey: setKey,
        getKey: getKey,
        logout: logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppEnv = () => useContext(AppContext);
