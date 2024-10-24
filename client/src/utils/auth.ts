import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // get the decoded token
    const decoded: JwtPayload = jwtDecode(this.getToken());
    return decoded;
  }
  loggedIn() {
    const token = this.getToken();
    return token;
  }

  isTokenExpired(token: string) {
    const decoded: JwtPayload = jwtDecode(token);
    if (decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    }
    return false;
  }

  getToken(): string {
    const loggedUser = localStorage.getItem("id_token") || "";
    return loggedUser;
  }

  login(Token: string) {
    localStorage.setItem("id_token", Token);
    // window.location.assign(`/home`);
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
