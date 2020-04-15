/* eslint-disable @typescript-eslint/no-explicit-any */

import { album } from '../src/Album';
import { stubFetch, stubAuthToken } from './helpers/Stub.helper';
import { Auth } from '../src/Auth';
import fetch from 'node-fetch';

global.fetch = fetch;

describe('Album', () => {
  const anyObject = expect.any(Object);
  const albumId1 = '0sNOF9WDwhWunNAHPD3Baj';
  const albumId2 = '0sLDP9WOhtWunJJSHPD3Bzc';

  beforeEach(() => {
    stubFetch();
    stubAuthToken();
  });

  afterEach(() => {
    global.fetch.mockClear();
    (Auth.getAuthToken as any).mockClear();
  });

  describe('`getAlbum` method', () => {
    it('should do one ajax request', () => {
      album.getAlbum(albumId1);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fetch the correct URL', () => {
      album.getAlbum(albumId1);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/albums/${albumId1}`, anyObject);

      album.getAlbum(albumId2);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/albums/${albumId2}`, anyObject);
    });

    it('should return the JSON data from the promise', async () => {
      const artists = await album.getAlbum(albumId1);

      expect(artists).toMatchObject({
        'access_token': '123'
      });
    });
  });

  describe('`getAlbumTracks` method', () => {
    it('should fetch the correct URL', () => {
      album.getAlbumTracks(albumId1);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/albums/${albumId1}/tracks`, anyObject);

      album.getAlbumTracks(albumId2);
      expect(global.fetch).toHaveBeenCalledWith(`https://api.spotify.com/v1/albums/${albumId2}/tracks`, anyObject);
    });

    it('should return the JSON data from the promise', async () => {
      const artists = await album.getAlbumTracks(albumId1);

      expect(artists).toMatchObject({
        'access_token': '123'
      });
    });
  });
});