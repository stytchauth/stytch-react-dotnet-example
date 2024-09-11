import logo from './logo.svg';
import './App.css';
import SendOtpButton from './components/SendOtpButton'
import AuthenticateOtpButton from "./components/AuthenticateOtpButton";

function App() {
  return (
      <div>
        <SendOtpButton/>
        <AuthenticateOtpButton/>
      </div>
  );
}

export default App;
