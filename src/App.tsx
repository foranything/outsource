import { User } from 'firebase/auth';
import React from 'react';
import './App.css';
import { Auth } from './firebase/auth';
import { DB } from './firebase/firestore';
import axios from 'axios';

function App() {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const login = async () => {
    const credential = await Auth.handleGoogleLogin();
    const user = credential.user;
    if (user) setUser(user);
  };

  const getSource = async () => {
    DB.getSources();
  };

  const crawling = async () => {
    const result = await axios.get(
      'https://asia-northeast3-outsource-c82d3.cloudfunctions.net/crawl'
    );
    console.log(result);
  };

  const ping = async () => {
    const result = await axios.get(
      'https://asia-northeast3-outsource-c82d3.cloudfunctions.net/ping'
    );
    console.log(result);
  };

  return (
    <div className="App">
      {user ? (
        <>
          `Logged In (${user.email})`
          <button onClick={getSource}>getDB</button>
          <button onClick={crawling}>crawling</button>
          <button onClick={ping}>ping</button>
        </>
      ) : (
        <>
          <button onClick={login}>login</button>
        </>
      )}
    </div>
  );
}

export default App;
