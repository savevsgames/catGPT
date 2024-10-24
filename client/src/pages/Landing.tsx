import CatPolaroid from "../components/catPolaroid.tsx";
import YarnConnection from "../components/yarnConnection.tsx";

const Landing = () => {
  // The array of pictures
  const catApiPhotos = [
    "https://picsum.photos/350/300",
    "https://picsum.photos/450/300",
    "https://picsum.photos/300/300",
    "https://picsum.photos/350/400",
    "https://picsum.photos/350/300",
    "https://picsum.photos/350/300",
    "https://picsum.photos/300/300",
    "https://picsum.photos/350/300",
  ];

  const catApiPhotos4 = catApiPhotos.slice(0, 4)

  // Making a set of coordinates for each picture in the picture array
  const randomPosition = (index: number) => {
    const edgeLimit = (value: number) => Math.min(Math.max(value,20),80);
    const randomCoord = () => Math.random() * 60 -5;
    const row = Math.floor(index / 2);
    const col = index % 2;

    return {
      top: edgeLimit(randomCoord() + row * 50),
      left: edgeLimit(randomCoord() + col * 50),
    }
  }
  const catApiPercentCoordinates = catApiPhotos.map((_, index) => randomPosition(index));

  return (
    <div className="relative bg-yellow-100 min-h-screen p-10 flex justify-center items-center">
      <div className="relative w-full max-w-5xl h-[600px] bg-color_1 rounded-lg shadow-lg overflow-hidden">
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
        {catApiPhotos4.map((photo, index) => (
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
