import { useState } from 'react';
import { getTokenFromStorage } from '../helpers/index';

export default function useToken() {
  
  const [token, setToken] = useState(getTokenFromStorage());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
  
}