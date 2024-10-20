class AuthService {
    
    loggedIn() {
        const token = this.getToken();
        return token;
    }

    getToken(): string {
        const loggedUser = localStorage.getItem('cat_token') || '';
        return loggedUser;
    }

    login(catToken: string) {
        localStorage.setItem('cat_token', catToken);
        window.location.assign(`/Profile`);
    }

    logout() {
        localStorage.removeItem('cat_token');
        window.location.assign('/');
    }
}

export default new AuthService();