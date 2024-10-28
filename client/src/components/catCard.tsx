import React from "react";
import { CatData } from "../interfaces/CatData";

interface CatCardProps {
  cat: CatData;
  isAvailable: boolean;
  onClick: () => void;
}

const CatCard: React.FC<CatCardProps> = ({ cat, isAvailable, onClick }) => {
  return (
    <div
      className="border-2 flex flex-col items-center p-4 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <img
        src={cat.avatar || "./assets/other/adoptMe.png"}
        alt={cat.name}
        className="w-30 h-30 object-cover rounded-md mb-2"
      />
      <h3 className="text-xl font-semibold">{cat.name}</h3>

      {isAvailable ? (
        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700">
          Adopt Me
        </button>
      ) : (
        <p className="text-gray-900">Mood: {cat.mood}</p>
      )}
    </div>
  );
};

export default CatCard;
