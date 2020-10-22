import { AsyncStorage } from 'react-native';
import { navigate } from 'review/App/util/NavigationService';

const BASE_URL = "http://localhost:3000";
const AUTH_TOKEN = 'ReviewApp::AUTH_TOKEN';
const ACCESS_TOKEN = 'ReviewApp::ACCESS_TOKEN';

export const saveAuthToken = token => {
  if (!token) return AsyncStorage.removeItem(AUTH_TOKEN);

  return AsyncStorage.setItem(AUTH_TOKEN, token);
};

export const hasAuthToken = () => {
  return AsyncStorage.getItem(AUTH_TOKEN).then(token => {
    if (token) return true;

    return false;
  })
};

// GOOGLE AUTH STUFF
export const saveAccessToken = token => {
  if (!token) return AsyncStorage.removeItem(ACCESS_TOKEN);

  return AsyncStorage.setItem(ACCESS_TOKEN, token);
};

export const removeAccessToken = () => {
  return AsyncStorage.removeItem(ACCESS_TOKEN);
};

export const reviewApi = (path, options = {}) => {
  return AsyncStorage.getItem(AUTH_TOKEN)
    .then(token => {
      const completeOptions = {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json'
        }
      };
      
      // Verifying authorization
      if (token) completeOptions.headers.authorization = `Bearer ${token}`;
  
      return fetch(`${BASE_URL}/api${path}`, completeOptions).then(async res => {
        const responseJson = await res.json();

        if (res.ok) return responseJson;
      
        if (res.status === 401) {
          navigate('Auth');
          saveAuthToken();
        }


        throw new Error(responseJson.error);
      });
  })
  

}
