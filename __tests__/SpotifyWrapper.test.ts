/* eslint-disable @typescript-eslint/no-explicit-any */

import { spotifyWrapper } from '../src/SpotifyWrapper';
import fetch from 'node-fetch';
import { ESearchType } from '../src/enums/ESearchType';

global.fetch = fetch;

function stubFetch(): void {
  jest.spyOn(global, 'fetch').mockImplementation(() => new Promise(resolve => {
    resolve({
      'access_token': '123'
    });
  }));
}

function stubAuthToken(): void {
  jest.spyOn((spotifyWrapper as any), 'getAuthToken').mockImplementation(() => new Promise(resolve => {
    resolve('123');
  }));
}

describe('The Spotify wrapper library', () => {
  beforeEach(() => {
    stubFetch();
    stubAuthToken();
  });

  afterEach(() => {
    global.fetch.mockClear();
    (spotifyWrapper as any).getAuthToken.mockClear();
  });
  
  describe('`genericSearch` method', () => {
    it('should do one ajax request', () => {
      spotifyWrapper.genericSearch(null, null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      // context: if only one type was passed
      spotifyWrapper.genericSearch('Frank Ocean', ESearchType.artist);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.artist}`, expect.any(Object));

      spotifyWrapper.genericSearch('The World Is a Beautiful Place & I Am No Longer Afraid to Die', ESearchType.album);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.album}`, expect.any(Object));

      // context: if more than one type was passed
      spotifyWrapper.genericSearch('Frank Ocean', [ESearchType.artist, ESearchType.album]);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.artist},${ESearchType.album}`, expect.any(Object));

      spotifyWrapper.genericSearch('The World Is a Beautiful Place & I Am No Longer Afraid to Die', [ESearchType.album, ESearchType.episode, ESearchType.track]);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.album},${ESearchType.episode},${ESearchType.track}`, expect.any(Object));
    });

    it('should return the JSON data from the promise', async () => {
      const artists = await spotifyWrapper.genericSearch('Frank Ocean', ESearchType.artist);

      expect(artists).toMatchObject({
        'access_token': '123'
      });
    });
  });

  describe('`searchAlbums` method', () => {
    it('should do one ajax request', () => {
      spotifyWrapper.searchAlbums(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      spotifyWrapper.searchAlbums('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.album}`, expect.any(Object));

      spotifyWrapper.searchAlbums('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.album}`, expect.any(Object));
    });
  });

  describe('`searchArtists` method', () => {
    it('should do an ajax request', () => {
      spotifyWrapper.searchArtists(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      spotifyWrapper.searchArtists('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.artist}`, expect.any(Object));

      spotifyWrapper.searchArtists('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.artist}`, expect.any(Object));
    });
  });

  describe('`searchTracks` method', () => {
    it('should do an ajax request', () => {
      spotifyWrapper.searchTracks(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      spotifyWrapper.searchTracks('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.track}`, expect.any(Object));

      spotifyWrapper.searchTracks('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.track}`, expect.any(Object));
    });
  });

  describe('`searchPlaylists` method', () => {
    it('should do an ajax request', () => {
      spotifyWrapper.searchPlaylists(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      spotifyWrapper.searchPlaylists('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.playlist}`, expect.any(Object));

      spotifyWrapper.searchPlaylists('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.playlist}`, expect.any(Object));
    });
  });

  describe('`searchEpisodes` method', () => {
    it('should do an ajax request', () => {
      spotifyWrapper.searchEpisodes(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      spotifyWrapper.searchEpisodes('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.episode}`, expect.any(Object));

      spotifyWrapper.searchEpisodes('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.episode}`, expect.any(Object));
    });
  });

  describe('`searchShows` method', () => {
    it('should do an ajax request', () => {
      spotifyWrapper.searchShows(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      spotifyWrapper.searchShows('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.show}`, expect.any(Object));

      spotifyWrapper.searchShows('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.show}`, expect.any(Object));
    });
  });
});
