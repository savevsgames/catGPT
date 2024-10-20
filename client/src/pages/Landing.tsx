import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
    return (
        <div className='bg-gray-400 min-h-screen'>
            <Link to="/Signup" className='p-4  flex flex-col items-center rounded-bl rounded-br'>
                <h1 className='text-5xl pt-6'>Please adopt me</h1>
                <a className='p-3'>click/tap here to start your journey as my new pawrent</a>
                <img src='src/assets/adoptMe.png' className="h-1/2 w-1/2"></img>
            </Link>
        </div>
    );
};

export default Landing;