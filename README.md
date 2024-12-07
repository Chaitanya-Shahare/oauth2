# OAuth 2.0 Client

## Introduction

This library provides a simple way to perform the OAuth 2.0 authorization flow in both server and browser environments.

## Installation

To install the library, clone the repository and install the dependencies:

```bash

git clone https://github.com/Chaitanya-Shahare/oauth2

cd oauth2

npm install
```

## Usage

### Start Authorization Flow

```jsx
import { startAuthFlow } from "./oauthClient";

const client = {
  id: "your-client-id",

  secret: "your-client-secret",

  redirectUri: "http://localhost:3000/callback",
};

const authUrl = startAuthFlow(client, "profile email", "random-state");

window.location.href = authUrl;
```

### Handle Callback

```js
import { handleCallback } from "./oauthClient";

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("code")) {
  const code = urlParams.get("code");

  handleCallback(client, { code })
    .then((tokenResponse) => {
      console.log("Token Response:", tokenResponse);
    })
    .catch((error) => {
      console.error("Error handling callback:", error);
    });
}
```

### Refresh Token

```js
import { refreshToken } from "./oauthClient";

refreshToken(client, "your-refresh-token")
  .then((tokenResponse) => {
    console.log("Token Response:", tokenResponse);
  })
  .catch((error) => {
    console.error("Error refreshing token:", error);
  });
```

## Demo Application

To run the demo application,

```sh
npm run compile
cd client-demo
npm i
npm start
```

- Click on login button

## License

This project is licensed under the MIT License.# oauth2
