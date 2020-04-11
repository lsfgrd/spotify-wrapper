import { spotifyWrapper } from '../src/SpotifyWrapper';
import fetch from 'node-fetch';
import { ESearchType } from '../src/enums/ESearchType';

global.fetch = fetch;

function stubFetch(): void {
  jest.spyOn(global, 'fetch').mockImplementation(() => new Promise(resolve => {
    resolve({
      'body': 'json'
    });
  }));
}

describe('The Spotify wrapper library', () => {
  beforeEach(() => {
    stubFetch();
  });

  afterEach(() => {
    global.fetch.mockClear()
  });
  
  describe('`genericSearch` method', () => {
    it('should do one ajax request', () => {
      spotifyWrapper.genericSearch(null, null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      // context: if only one type was passed
      spotifyWrapper.genericSearch('Frank Ocean', ESearchType.artist);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.artist}`);

      spotifyWrapper.genericSearch('The World Is a Beautiful Place & I Am No Longer Afraid to Die', ESearchType.album);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.album}`);

      // context: if more than one type was passed
      spotifyWrapper.genericSearch('Frank Ocean', [ESearchType.artist, ESearchType.album]);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.artist},${ESearchType.album}`);

      spotifyWrapper.genericSearch('The World Is a Beautiful Place & I Am No Longer Afraid to Die', [ESearchType.album, ESearchType.episode, ESearchType.track]);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.album},${ESearchType.episode},${ESearchType.track}`);
    });

    it('should return the JSON data from the promise', async () => {
      const artists = await spotifyWrapper.genericSearch('Frank Ocean', ESearchType.artist);

      expect(artists).toMatchObject({
        'body': 'json'
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
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.album}`);

      spotifyWrapper.searchAlbums('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.album}`);
    });
  });

  describe('`searchArtists` method', () => {
    it('should do an ajax request', () => {
      spotifyWrapper.searchArtists(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      spotifyWrapper.searchArtists('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.artist}`);

      spotifyWrapper.searchArtists('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.artist}`);
    });
  });

  describe('`searchTracks` method', () => {
    it('should do an ajax request', () => {
      spotifyWrapper.searchTracks(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      spotifyWrapper.searchTracks('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.track}`);

      spotifyWrapper.searchTracks('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.track}`);
    });
  });

  describe('`searchPlaylists` method', () => {
    it('should do an ajax request', () => {
      spotifyWrapper.searchPlaylists(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      spotifyWrapper.searchPlaylists('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.playlist}`);

      spotifyWrapper.searchPlaylists('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.playlist}`);
    });
  });

  describe('`searchEpisodes` method', () => {
    it('should do an ajax request', () => {
      spotifyWrapper.searchEpisodes(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      spotifyWrapper.searchEpisodes('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.episode}`);

      spotifyWrapper.searchEpisodes('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.episode}`);
    });
  });

  describe('`searchShows` method', () => {
    it('should do an ajax request', () => {
      spotifyWrapper.searchShows(null);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {   
      spotifyWrapper.searchShows('Frank Ocean');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=frank%20ocean&type=${ESearchType.show}`);

      spotifyWrapper.searchShows('The World Is a Beautiful Place & I Am No Longer Afraid to Die');
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/search?q=the%20world%20is%20a%20beautiful%20place%20&%20i%20am%20no%20longer%20afraid%20to%20die&type=${ESearchType.show}`);
    });
  });
});
