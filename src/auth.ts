interface OAuthClient {
  id: string;
  secret: string;
  redirectUri: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export const startAuthFlow = (
  client: OAuthClient,
  scope: string,
  state: string
): string => {
  const baseUrl = "https://dev-rv8klg4o854slkf4.us.auth0.com";
  const params = new URLSearchParams({
    response_type: "code",
    client_id: client.id,
    redirect_uri: client.redirectUri,
    scope: scope,
    state: state,
  });

  return `${baseUrl}/authorize?${params.toString()}`;
};

export const handleCallback = async (
  client: OAuthClient,
  callbackParams: { code: string }
): Promise<TokenResponse> => {
  const tokenUrl = "https://dev-rv8klg4o854slkf4.us.auth0.com/oauth/token";
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: callbackParams.code,
    redirect_uri: client.redirectUri,
    client_id: client.id,
    client_secret: client.secret,
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    tokenType: data.token_type,
  };
};

export const refreshToken = async (
  client: OAuthClient,
  refreshToken: string
): Promise<TokenResponse> => {
  const tokenUrl = "https://dev-rv8klg4o854slkf4.us.auth0.com/oauth/token";
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: client.id,
    client_secret: client.secret,
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    tokenType: data.token_type,
  };
};
