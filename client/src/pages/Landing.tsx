import CatPolaroid from "../components/catPolaroid.tsx";

const catApiPhotos = [
  "https://picsum.photos/350/300",
  "https://picsum.photos/350/300",
  "https://picsum.photos/300/300",
  "https://picsum.photos/350/300",
];

const Landing = () => {
  return (
    <div className="relative bg-yellow-100 min-h-screen p-10 flex justify-center items-center">
      <div className="relative w-full max-w-5xl h-[600px] bg-[#d7b899] rounded-lg shadow-lg overflow-hidden">
        {/* Render the cat photos randomly on the board */}
        {catApiPhotos.map((photo, index) => (
          <CatPolaroid index={index} photoURL={photo} />
        ))}
      </div>
    </div>
  );
};

export default Landing;
