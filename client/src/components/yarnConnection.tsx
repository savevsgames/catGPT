interface PercentCoordinate {
  left: number;
  top: number;
}

// The properties we get from the element
interface Props {
  startCoordinate: PercentCoordinate;
  endCoordinate: PercentCoordinate;
  segmentLength: number;
  yarnUrl: string;
}

const POLAROID_WIDTH = 160; // w-40 = 160px
const POLAROID_HEIGHT = 160; // h-40 = 160px
const PADDING = 16; // p-4 = 16px

const YarnConnection = (props: Props) => {
  // Top of the polaroid we start at, and we end at so that the yarn is aligned well
  const startCenter: PercentCoordinate = {
    left: props.startCoordinate.left + (POLAROID_WIDTH + PADDING * 2) / (window.innerWidth / 100) / 2,
    top: props.startCoordinate.top + (POLAROID_HEIGHT + PADDING * 2) / (window.innerHeight / 100) / 2 - 8
  };

  const endCenter = {
    left: props.endCoordinate.left + (POLAROID_WIDTH + PADDING * 2) / (window.innerWidth / 100) / 2,
    top: props.endCoordinate.top + (POLAROID_HEIGHT + PADDING * 2) / (window.innerHeight / 100) / 2 - 8
  };

  // Calculate the distance between centers
  const dx = (endCenter.left - startCenter.left) * window.innerWidth / 100;
  const dy = (endCenter.top - startCenter.top) * window.innerHeight / 100;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Calculate the angle between points
  const angle = Math.atan2(dy, dx);

  // Calculate number of segments needed
  const numberOfSegments = Math.ceil(distance / props.segmentLength);


  // Create array of segments
  const segments = Array.from({length: numberOfSegments}, (_, index) => {
    const segmentX = startCenter.left + (index * props.segmentLength * Math.cos(angle) / window.innerWidth * 100);
    const segmentY = startCenter.top + (index * props.segmentLength * Math.sin(angle) / window.innerHeight * 100);

    const bgColor = (index % 2 == 0) ? 'red' : "orange";

    return (
      // TODO: Replace with the yarn image once we have one
      <div
        key={index}
        className="absolute bg-red-500"
        style={{
          backgroundColor: `${bgColor}`,
          width: `${props.segmentLength}px`,
          paddingTop: '5px',
          transform: `rotate(${angle}rad)`,
          top: `${segmentY}%`,
          left: `${segmentX}%`,
          transformOrigin: 'left center',
          zIndex: 10, // Makes the yarn display above everything
        }}
      />
    );
  });

  return <>{segments}</>;
};

export default YarnConnection;