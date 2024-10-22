import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../utils/auth'

function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false);

    const checkLoggedIn = () => {
        if (AuthService.loggedIn()) {
            setLoggedIn(true);
        }
    };

    useEffect(() => {
        checkLoggedIn();
    }, [loggedIn]);

    const handleLogout = () => {
        AuthService.logout();
        setLoggedIn(false);
    }

    return (
        <nav className="bg-stone-500 w-full flex p-4 top-0 left-0 rounded-tr rounded-tl">
            <div className="container mx-auto flex justify-between items-center">
                <Link to='/' className="flex items-center space-x-2">
                    <img src="assets/logo.png" alt="Cat Logo" className="h-10 w-30"/>
                </Link>
                <div>
                    {loggedIn ? (
                        <button className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleLogout}>Logout</button>
                    ) : (
                        <button className="bg-yellow-500 text-black px-4 py-2 rounded">Login</button>
                        // <button className="bg-yellow-500 text-black px-4 py-2 rounded" onClick={handleLogin}>Login</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;