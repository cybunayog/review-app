import { AsyncStorage } from 'react-native';

const BASE_URL = "http://192.168.1.67:3000";
const AUTH_TOKEN = 'ReviewApp::AUTH_TOKEN';

export const saveAuthToken = token => {
  if (!token) return AsyncStorage.removeItem(AUTH_TOKEN);

  return AsyncStorage.setItem(AUTH_TOKEN, token);
};

export const reviewApi = (path, options = {}) => {
  const completeOptions = {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${BASE_URL}/api${path}`, completeOptions).then(async res => {
    const responseJson = await res.json();

    if (res.ok) {
      return responseJson;
    }

    throw new Error(responseJson.error);
  });

}