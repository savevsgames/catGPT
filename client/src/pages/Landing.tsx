// import React from "react";
import { Link } from "react-router-dom";

const catApiPhotos = [
  "assets/adoptMe.png",
  "assets/adoptMe.png",
  "https://placekitten.com/300/300",
  "https://placekitten.com/350/250",
];

// Create two random functions to generate random rotation and position for the cat photos
const randomRotation = () => Math.floor(Math.random() * 21) - 10; // Random angle between -10 and 10 degrees
const randomPosition = () => `${Math.floor(Math.random() * 80)}%`; // Random position between 0-80%

const Landing = () => {
  return (
    <div className="relative bg-yellow-100 min-h-screen p-10 flex justify-center items-center">
      <div className="relative w-full max-w-5xl h-[600px] bg-[#d7b899] rounded-lg shadow-lg overflow-hidden">
        {/* Render the cat photos randomly on the board */}
        {catApiPhotos.map((photo, index) => (
          <Link
            to="/Signup"
            className="p-4  flex flex-col items-center rounded-bl rounded-br"
          >
            <img
              key={index}
              src={photo}
              alt={`Cat`}
              className="absolute w-40 h-40 object-cover rounded shadow-lg"
              style={{
                transform: `rotate(${randomRotation()}deg)`,
                top: randomPosition(),
                left: randomPosition(),
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Landing;
