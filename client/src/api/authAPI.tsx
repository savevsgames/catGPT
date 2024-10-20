import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {

    try {

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/jason'
            },
            body: JSON.stringify(userInfo)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Error: ${error.message}`);
        }

        const data = await response.json();
        return data;

    } catch (err) {
        
        console.log('Error logging in: ', err);
        return Promise.reject('Could not log in');
    }
}

export { login };