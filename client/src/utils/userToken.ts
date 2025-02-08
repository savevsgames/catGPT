import Auth from './auth';
import { jwtDecode } from 'jwt-decode';

// get the user id from the token
export const getUserIdFromToken = () => {
  const token = Auth.getToken();
  if (!token) {
    return null;
  }
  const decoded: { id: number } = jwtDecode(token);
  return decoded.id;
};
