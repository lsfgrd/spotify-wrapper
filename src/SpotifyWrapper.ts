import fetch from 'node-fetch';
import { ESearchType } from './enums/ESearchType';

global.fetch = fetch;
require('dotenv').config();

export class SpotifyWrapper {
  private url = `https://api.spotify.com/v1`;
  private token_url = `https://accounts.spotify.com/api/token`;

  public async genericSearch(query: string, queryType: string | string[]): Promise<Response> {
    const endpoint = 'search';
    query = query?.toLowerCase();

    const authToken = this.getAuthToken();

    const result = await global
      .fetch(`${this.url}/${endpoint}?q=${encodeURI(query)}&type=${encodeURI(queryType?.toString())}`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

    return result;
  }

  private async getAuthToken(): Promise<string> {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${this.createAuthorizationToken()}`
    };

    const body = 'grant_type=client_credentials';

    const response = global.fetch(this.token_url, {
      method: 'POST',
      headers,
      body
    });

    const data = await response;
    return data['access_token'];
  }

  private createAuthorizationToken(): string {
    return Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
  }

  public searchAlbums(query: string): Promise<Response> {
    return this.genericSearch(query, ESearchType.album);
  }

  public searchArtists(query: string): Promise<Response> {
    return this.genericSearch(query, ESearchType.artist);
  }

  public searchTracks(query: string): Promise<Response> {
    return this.genericSearch(query, ESearchType.track);
  }

  public searchPlaylists(query: string): Promise<Response> {
    return this.genericSearch(query, ESearchType.playlist);
  }

  public searchEpisodes(query: string): Promise<Response> {
    return this.genericSearch(query, ESearchType.episode);
  }

  public searchShows(query: string): Promise<Response> {
    return this.genericSearch(query, ESearchType.show);
  }
}

export const spotifyWrapper = new SpotifyWrapper();

// spotifyWrapper.searchAlbums('Frank Ocean')
//   .then(x => x.json())
//   .then(y => console.log(y));