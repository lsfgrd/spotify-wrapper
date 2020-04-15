/* eslint-disable @typescript-eslint/no-explicit-any */

import { search } from '../src/Search';
import fetch from 'node-fetch';
import { ESearchType } from '../src/enums/ESearchType';
import { Auth } from '../src/Auth';
import { stubFetch, stubAuthToken } from './helpers/Stub.helper';

global.fetch = fetch;

describe('The Spotify wrapper library', () => {
  beforeEach(() => {
    stubFetch();
    stubAuthToken();
  });

  afterEach(() => {
    global.fetch.mockClear();
    (Auth.getAuthToken as any).mockClear();
  });
  
  describe('`genericSearch` method', () => {
    it('should do one ajax request', () => {
      search.genericSearch(null, null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      // context: if only one type was passed
      search.genericSearch('Frank Ocean', ESearchType.artist);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.artist}`, expect.any(Object));

      search.genericSearch('The World Is a Beautiful Place & I Am No Longer Afraid to Die', ESearchType.album);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.album}`, expect.any(Object));

      // context: if more than one type was passed
      search.genericSearch('Frank Ocean', [ESearchType.artist, ESearchType.album]);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.artist},${ESearchType.album}`, expect.any(Object));

      search.genericSearch('The World Is a Beautiful Place & I Am No Longer Afraid to Die', [ESearchType.album, ESearchType.episode, ESearchType.track]);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.album},${ESearchType.episode},${ESearchType.track}`, expect.any(Object));
    });

    it('should return the JSON data from the promise', async () => {
      const artists = await search.genericSearch('Frank Ocean', ESearchType.artist);

      expect(artists).toMatchObject({
        'access_token': '123'
      });
    });
  });

  describe('`searchAlbums` method', () => {
    it('should do one ajax request', () => {
      search.searchAlbums(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      search.searchAlbums('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.album}`, expect.any(Object));

      search.searchAlbums('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.album}`, expect.any(Object));
    });
  });

  describe('`searchArtists` method', () => {
    it('should do an ajax request', () => {
      search.searchArtists(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      search.searchArtists('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.artist}`, expect.any(Object));

      search.searchArtists('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.artist}`, expect.any(Object));
    });
  });

  describe('`searchTracks` method', () => {
    it('should do an ajax request', () => {
      search.searchTracks(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      search.searchTracks('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.track}`, expect.any(Object));

      search.searchTracks('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.track}`, expect.any(Object));
    });
  });

  describe('`searchPlaylists` method', () => {
    it('should do an ajax request', () => {
      search.searchPlaylists(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      search.searchPlaylists('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.playlist}`, expect.any(Object));

      search.searchPlaylists('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.playlist}`, expect.any(Object));
    });
  });

  describe('`searchEpisodes` method', () => {
    it('should do an ajax request', () => {
      search.searchEpisodes(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      search.searchEpisodes('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.episode}`, expect.any(Object));

      search.searchEpisodes('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.episode}`, expect.any(Object));
    });
  });

  describe('`searchShows` method', () => {
    it('should do an ajax request', () => {
      search.searchShows(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      search.searchShows('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.show}`, expect.any(Object));

      search.searchShows('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.show}`, expect.any(Object));
    });
  });
});
