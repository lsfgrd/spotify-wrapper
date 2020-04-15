/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'node-fetch';
import { stubFetch } from './helpers/Stub.helper';
import { Auth } from '../src/Auth';

global.fetch = fetch;

describe('Auth', () => {
  describe('`getAuthToken` method', () => {
    const correctBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic fakeBase64Token`
      },
      body: 'grant_type=client_credentials'
    };
  
    beforeEach(() => {
      stubFetch();
      jest.spyOn((Auth as any), 'createAuthorizationToken').mockReturnValue('fakeBase64Token');
    });

    it('should execute fetch with the correct parameters', () => {
      Auth.getAuthToken();
      expect(global.fetch).toHaveBeenCalledWith('https://accounts.spotify.com/api/token', correctBody);
    });
  });
});