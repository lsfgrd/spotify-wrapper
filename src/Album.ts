import fetch from 'node-fetch';
import { Auth } from './Auth';
import { Response } from './models/Response';

global.fetch = fetch;

export class Album {
  private url = 'https://api.spotify.com/v1/albums';

  public async getAlbum(albumId: string): Promise<Response> {
    const result = await global.fetch(`${this.url}/${albumId}`, this.getRequestOptions());
    return result;
  }

  public async getAlbumTracks(albumId: string): Promise<Response> {
    const result = await global.fetch(`${this.url}/${albumId}/tracks`, this.getRequestOptions());
    return result;
  }

  private async getRequestOptions(): Promise<Record<string, Record<string, string>>> {
    const authToken = await Auth.getAuthToken();

    return {
      headers: { 'Authorization': `Bearer ${authToken}` },
    };
  }
}

export const album = new Album();