import React from 'react';
import { CatProp } from '../interfaces/CatProp';


const CatCard: React.FC<CatProp> = ({cat, AdoptClick}) => {
    return (
        <div className="border-2 flex flex-col items-center">
        {cat ? (
            <>
                <img
                    src={cat.avatar}
                    alt={cat.name}
                    className="w-30 h-30 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold">{cat.name}</h3>
                <h3 className="text-xl font-semibold">Mood {cat.mood}</h3>
            </>
        ) : (
            <div className="flex flex-col items-center">
                <button className="rounded"
                onClick={AdoptClick}
            >
                Adopt Me
            </button>
            </div>
        )}
        </div>
    );
};

export default CatCard;