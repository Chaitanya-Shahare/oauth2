import logo from "./logo.svg";
import "./App.css";
import { startAuthFlow } from "@chaitanya-shahare/oauth2/lib/es6";

export const client = {
  id: "wT8ia20IVDShhEOiju1lkbdJXgbbkikm",
  secret: "bb2RsGWEd5w1SUcRAYEnSkuvAhLZZZvhtFmbjPF9ciOAzW6nkisqJVp9VjkFRdHV",
  redirectUri: "http://localhost:3000/callback",
};
function App() {
  const handleOnClick = () => {
    const authorizationURL = startAuthFlow(client, "profile email", "state");
    window.location.href = authorizationURL;
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p> */}
        <button onClick={handleOnClick}>Login</button>
        {/* </p> */}
      </header>
    </div>
  );
}

export default App;
