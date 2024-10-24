import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CatData } from '../interfaces/CatData';

const Cat: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cat } = location.state as {cat: CatData};

    const handleChatClick = () => {
        navigate('/Chat', { state: { cat }});
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex mb-6">
                <div className="w-1/4">
                    <img src={cat.avatar} alt={cat.name} className="w-full max-h-64 rounded-full shadow-lg mb-4 mr-2"/>
                    <div>
                        <h3 className="text-2xl font-smebold mb-2">{cat.name}</h3>
                        <p><strong>Mood:</strong> {cat.mood}</p>
                        <p><strong>Info 1:</strong> {cat.mood}</p>
                        <p><strong>Info 2:</strong> {cat.mood}</p>
                        <p><strong>Info 3:</strong> {cat.mood}</p>
                    </div>
                </div>
                <div className="w-3/4">
                    <img src="./assets/nooks/nook1.png" alt="Cat Nook" className="w-full max-h-64 rounded-lg shadow-lg"/>
                    <div className="mt-4 space-x-4">
                        <button className="py-2 px-4 rounded border border-color_1" onClick={handleChatClick}>Chat</button>
                        <button className="py-2 px-4 rounded border border-color_1">Play</button>
                        <button className="py-2 px-4 rounded border border-color_1">Feed</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cat;