import fetch from 'node-fetch';

global.fetch = fetch;
require('dotenv').config();

export class Auth {
  private static url = `https://accounts.spotify.com/api/token`;

  public static async getAuthToken(): Promise<string> {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${this.createAuthorizationToken()}`
    };

    const body = 'grant_type=client_credentials';

    const response = global.fetch(this.url, {
      method: 'POST',
      headers,
      body
    });

    const data = await response;
    return data['access_token'];
  }

  private static createAuthorizationToken(): string {
    return Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
  }
}
