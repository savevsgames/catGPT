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
        <div className="container mx-auto p-6 bg-color_1 rounded-b-2xl">
            <div className="flex mb-6">
                <div className="w-1/4 bg-color_2 rounded-lg p-4 mr-3">
                    <img src={cat.avatar} alt={cat.name} className="w-full max-h-64 rounded-full shadow-lg mb-4 mr-2 bg-color_1"/>
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
                        <button className="ml-2 px-4 py-2 bg-color_3 text-white rounded-lg hover:bg-color_5 transition-colors" onClick={handleChatClick}>Chat</button>
                        {/* <button className="ml-2 px-4 py-2 bg-color_3 text-white rounded-lg hover:bg-color_5 transition-colors">Play</button>
                        <button className="ml-2 px-4 py-2 bg-color_3 text-white rounded-lg hover:bg-color_5 transition-colors">Feed</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cat;