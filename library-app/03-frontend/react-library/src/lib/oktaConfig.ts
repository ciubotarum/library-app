export const oktaConfig = {
    clientId: '0oafjjs8hwAYq6d5U5d7',
    issuer: 'https://dev-12964665.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}