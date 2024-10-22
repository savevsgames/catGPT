import {Link} from "react-router-dom";


const randomRotation = () => Math.floor(Math.random() * 21) - 10; // Random angle between -10 and 10 degrees
const randomPosition = () => `${Math.floor(Math.random() * 80)}%`; // Random position between 0-80%


interface Props {
    index: number;
    photoURL: string;
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
                    top: randomPosition(),
                    left: randomPosition(),
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