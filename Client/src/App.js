import logo from './logo.svg';
import './App.css';
import SendOtpButton from './components/SendOtpButton'
import AuthenticateOtpButton from "./components/AuthenticateOtpButton";
import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <React.StrictMode>
      <div>
        <LoginPage/>
      </div>
    </React.StrictMode>
  );
}

export default App;
