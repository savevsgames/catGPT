import {Link} from "react-router-dom";


const randomRotation = () => Math.floor(Math.random() * 21) - 10; // Random angle between -10 and 10 degrees


interface Props {
  index: number;
  photoURL: string;
  topPercent: string | "50%";
  leftPercent: string | "50%";
}

function CatPolaroid(props: Props) {
  return (
    <Link
      to="/Signup"
      className="p-4  flex flex-col items-center rounded-bl rounded-br"
    >
      <img
        key={props.index}
        src={props.photoURL}
        alt={`Cat`}
        className="absolute w-40 h-40 object-cover rounded shadow-lg"
        style={{
          transform: `rotate(${randomRotation()}deg)`,
          top: props.topPercent,
          left: props.leftPercent,
          paddingRight: '10px',
          paddingLeft: '10px',
          paddingTop: '10px',
          paddingBottom: '45px',
          backgroundColor: `#FFF7ED`,
        }}
      />
    </Link>
  )
}

export default CatPolaroid;