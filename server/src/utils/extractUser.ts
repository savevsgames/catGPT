import jwtDecode, { JwtPayload } from 'jwt-decode';

// Define a custom payload type for your JWT structure
interface CustomJWTPayload extends JwtPayload {
  username: string;
  id: number;
}

// Function to extract the payload from the JWT token
export function extractJWTPayload(token: string): CustomJWTPayload | null {
  try {
    const decoded = jwtDecode<CustomJWTPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}
