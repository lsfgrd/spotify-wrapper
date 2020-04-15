import { Auth } from '../../src/Auth';

export function stubFetch(): void {
  jest.spyOn(global, 'fetch').mockImplementation(() => new Promise(resolve => {
    resolve({
      'access_token': '123'
    });
  }));
}

export function stubAuthToken(): void {
  jest.spyOn(Auth, 'getAuthToken').mockImplementation(() => new Promise(resolve => {
    resolve('123');
  }));
}