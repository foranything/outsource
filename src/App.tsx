import { User } from 'firebase/auth';
import React from 'react';
import './App.css';
import { Auth } from './firebase/auth';
import { DB } from './firebase/firestore';

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

  return (
    <div className="App">
      {user ? (
        <>
          `Logged In (${user.email})`
          <button onClick={getSource}>getDB</button>
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
