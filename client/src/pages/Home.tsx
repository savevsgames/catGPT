import React from 'react';
import { useNavigate } from 'react-router-dom'
import { CatData } from '../interfaces/CatData';

const CatCard: React.FC<{cat?: CatData}> = ({cat}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (cat) {
            navigate('/Cat', {state: { cat }});
        }
    };

    return (
        <div className="border-2 rounded-lg p-4 flex flex-col items-center cursor-pointer" onClick={handleClick}>
            {cat ? (
                <>
                <img
                    src={cat.avatar}
                    alt={cat.name}
                    className="w-30 h-30 object-cover rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">{cat.name}</h3>
                <p className="text-gray-900">Mood: {cat.mood}</p>    
                </>
            ) : (
                <div className="flex flex-col items-center">
                    <div>the cat api image</div>
                    <button className="py-2 px-4 rounded">
                        Adopt Me
                    </button>
                </div>
            )}
        </div>
    );
}; 

const Home: React.FC = () => {
    const cats: CatData[] = [
        {
            id: 1,
            name: 'Whiskers',
            avatar: './assets/adoptMe.png',
            skin: null,
            personality: null,
            mood: 5,
            deathFlag: null,
            isAlive: true,
            userId: 1,
        },
        {
            id: 2,
            name: 'Tom',
            avatar: './assets/adoptMe.png',
            skin: null,
            personality: null,
            mood: 5,
            deathFlag: null,
            isAlive: true,
            userId: 2,
        },
        {
            id: 3,
            name: 'Whiskers',
            avatar: './assets/adoptMe.png',
            skin: null,
            personality: null,
            mood: 5,
            deathFlag: null,
            isAlive: true,
            userId: 3,
        },
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Your Adopted Cats</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({length: 4}).map((_, index) => {
                    const cat = cats[index];
                    return (
                        <CatCard key={index} cat={cat}/>
                    );
                })}
            </div>
        </div>
    );
}; 

export default Home