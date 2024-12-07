import "./App.css";
import { startAuthFlow } from "@chaitanya-shahare/oauth2/lib/es6";
import { useEffect, useState } from "react";

export const client = {
  id: process.env.REACT_APP_CLIENT_ID,
  secret: process.env.REACT_APP_CLIENT_SECRET,
  redirectUri: "http://localhost:3000/callback",
  baseUrl: "https://dev-rv8klg4o854slkf4.us.auth0.com",
};

function App() {
  const handleLogin = () => {
    const authorizationURL = startAuthFlow(
      client,
      "offline_access openid profile email",
      "state"
    );
    window.location.href = authorizationURL;
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    fetch("https://dev-rv8klg4o854slkf4.us.auth0.com/v2/logout?federated", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        localStorage.clear();

        setIsAuthenticated(false);
        setUser(null);
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // console.log("accessToken", accessToken);
      fetch("https://dev-rv8klg4o854slkf4.us.auth0.com/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setUser(data);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error(error);
        });
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p> */}
        {isAuthenticated && user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}

        {isAuthenticated && user && (
          <div>
            <h1>Welcome {user.name}</h1>
            <p>Email: {user.email}</p>
          </div>
        )}
        {/* </p> */}
      </header>
    </div>
  );
}

export default App;
