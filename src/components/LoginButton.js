import React from 'react';
import { Button } from '../ant';
import { useHistory } from 'react-router';
import { useAppEnv } from './../env';

export default function LoginButton() {
  let history = useHistory();
  let { user, logout } = useAppEnv();
  if (user) {
    return (
      <div>
        <Button type="primary" onClick={() => history.push('/settings')}>
          Account
        </Button>
        {user.role === 'admin' && (
          <Button
            style={{ marginLeft: '10px' }}
            type="danger"
            onClick={() => history.push('/admin')}
          >
            Admin
          </Button>
        )}
        {user.role === 'mod' && (
          <Button
            style={{ marginLeft: '10px' }}
            type="danger"
            onClick={() => history.push('/mod')}
          >
            Moderation
          </Button>
        )}
        <Button style={{ marginLeft: '10px' }} onClick={logout}>
          Logout
        </Button>
      </div>
    );
  }
  return (
    <div>
      <Button type="primary" onClick={() => history.push('/login')}>
        Login
      </Button>
      <Button
        style={{ marginLeft: '10px' }}
        onClick={() => history.push('/register')}
      >
        Create Account
      </Button>
    </div>
  );
}
