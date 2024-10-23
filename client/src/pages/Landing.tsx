import CatPolaroid from "../components/catPolaroid.tsx";
import YarnConnection from "../components/yarnConnection.tsx";


const Landing = () => {
  // The array of pictures
  const catApiPhotos = [
    "https://picsum.photos/350/300",
    "https://picsum.photos/350/300",
    "https://picsum.photos/300/300",
    "https://picsum.photos/350/300",
    "https://picsum.photos/350/300",
    "https://picsum.photos/350/300",
    "https://picsum.photos/300/300",
    "https://picsum.photos/350/300",
  ];

  // TODO: Make the pictures more evenly spread out, rather than this basic random positioning
  const randomPosition = () => Math.floor(Math.random() * 80);
  // Making a set of coordinates for each picture in the picture array
  const catApiPercentCoordinates = catApiPhotos.map(() => ({
    top: randomPosition(),
    left: randomPosition()
  }));

  return (
    <div className="relative bg-yellow-100 min-h-screen p-10 flex justify-center items-center">
      <div className="relative w-full max-w-5xl h-[600px] bg-[#d7b899] rounded-lg shadow-lg overflow-hidden">
        {/* Render yarn connections */}
        {catApiPercentCoordinates.map((coordinate, index) => {
          const nextCoordinate = catApiPercentCoordinates[(index + 1) % catApiPercentCoordinates.length];
          return (
            <YarnConnection
              key={index}
              startCoordinate={coordinate}
              endCoordinate={nextCoordinate}
              segmentLength={10}
              // TODO: Find a picture for yarn
              yarnUrl=""
            />
          );
        })}

        {/* Render the cat photos */}
        {catApiPhotos.map((photo, index) => (
          <div key={index}>
            <CatPolaroid
              index={index}
              photoURL={photo}
              topPercent={`${catApiPercentCoordinates[index].top}%`}
              leftPercent={`${catApiPercentCoordinates[index].left}%`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;