import fetch from 'node-fetch';
import { ESearchType } from './enums/ESearchType';
import { Auth } from './Auth';

global.fetch = fetch;

export class Search {
  private url = `https://api.spotify.com/v1`;

  public async genericSearch(query: string, queryType: string | string[]): Promise<Response> {
    const endpoint = 'search';
    query = query?.toLowerCase();

    const authToken = Auth.getAuthToken();

    const result = await global
      .fetch(`${this.url}/${endpoint}?q=${encodeURI(query)}&type=${encodeURI(queryType?.toString())}`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

    return result;
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

export const search = new Search();

// spotifyWrapper.searchAlbums('Frank Ocean')
//   .then(x => x.json())
//   .then(y => console.log(y));