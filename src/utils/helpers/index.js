export const getTokenFromStorage = () => {
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);
  return token;
}