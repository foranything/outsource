import React from 'react';
import './App.css';
import { getSources } from './firebase/firestore';

function App() {
  const test = () => {
    getSources();
  };

  return (
    <div className="App">
      <button onClick={test}>test</button>
    </div>
  );
}

export default App;
