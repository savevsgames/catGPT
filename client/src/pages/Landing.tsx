import CatPolaroid from "../components/catPolaroid.tsx";
import YarnConnection from "../components/yarnConnection.tsx";

const Landing = () => {
  // The array of pictures
  const catApiPhotos = [
    "https://picsum.photos/350/300",
    "https://picsum.photos/450/300",
    "https://picsum.photos/300/300",
    "https://picsum.photos/350/400",
  ];

  const corkboardBackground = "./assets/other/CorkBoard.png";
  const adoptionBanner = "./assets/other/CATGPT-AdoptionBanner.png";

  const catApiPhotos4 = catApiPhotos.slice(0, 4);

  // Making a set of coordinates for each picture in the picture array
  const randomPosition = (index: number) => {
    const edgeLimit = (value: number) => Math.min(Math.max(value, 20), 80);
    const randomCoord = () => Math.random() * 60 - 5;
    const row = Math.floor(index / 2);
    const col = index % 2;

    return {
      top: edgeLimit(randomCoord() + row * 50),
      left: edgeLimit(randomCoord() + col * 50),
    };
  };
  const catApiPercentCoordinates = catApiPhotos.map((_, index) =>
    randomPosition(index)
  );

  return (
    <div className="relative bg-color_1 min-h-screen p-4 gap-4 flex justify-start items-center -z-30 flex-col">
      <img
        src={adoptionBanner}
        alt="Banner - Cat GPT Adoption Board"
        className="max-w-5xl margin-auto"
      />
      <div className="relative w-full max-w-5xl h-[600px] bg-color_1 rounded-lg -z-20">
        <img
          src={corkboardBackground}
          className="w-full h-full -z-10 relative"
          alt="Corkboard"
        />
        {/* Render yarn connections */}
        {catApiPercentCoordinates.map((coordinate, index) => {
          const nextCoordinate =
            catApiPercentCoordinates[
              (index + 1) % catApiPercentCoordinates.length
            ];
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
