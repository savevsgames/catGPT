import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        //login call function
        setLoggedIn(true);
    };

    const handleLogout = () => {
        //logout function
        setLoggedIn(false);
    }
    return (
        <nav className="bg-stone-500 w-full flex p-4 top-0 left-0 rounded-tr rounded-tl">
            <div className="container mx-auto flex justify-between items-center">
                <Link to='/' className="flex items-center space-x-2">
                    <img src="/src/assets/logo.png" alt="Cat Logo" className="h-10 w-30"/>
                </Link>
                <div>
                    {loggedIn ? (
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>Logout</button>
                    ) : (
                        <button className="bg-yellow-500 text-black px-4 py-2 rounded" onClick={handleLogin}>Login</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;