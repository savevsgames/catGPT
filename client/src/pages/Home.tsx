import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CatData } from "../interfaces/CatData";
import { retrieveUser, retrieveUserCats } from "../api/userAPI";
import { useUser } from "../context/UserContext";
import Auth from "../utils/auth";
import { jwtDecode } from "jwt-decode";
import { useCatContext } from "../context/CatContext";

const CatCard: React.FC<{ cat?: CatData }> = ({ cat }) => {
  const { setSelectedCat } = useCatContext();
  const navigate = useNavigate();
  const handleClick = (cat: CatData) => {
    console.log(cat);
    setSelectedCat(cat);
    const catName = cat?.name.toLowerCase().replace(/\s+/g, "-");
    if (cat) {
      navigate(`/${catName}`, { state: { cat } });
    }
  };

  return (
    <div
      className="border-2 rounded-lg p-4 flex flex-col items-center cursor-pointer bg-color_2"
      onClick={() => handleClick(cat!)}
    >
      {cat ? (
        <>
          <img
            src={cat.avatar}
            alt={cat.name}
            className="object-contain rounded-full mb-4"
            style={{ width: "20rem", height: "20rem" }}
          />
          <h3 className="text-xl font-semibold">{cat.name}</h3>
          <p className="text-gray-900">Mood: {cat.mood}</p>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="p-4">the cat api image</div>
          <button className="ml-2 px-4 py-2 bg-color_3 text-white rounded-lg hover:bg-color_5 transition-colors">
            Adopt Me
          </button>
        </div>
      )}
    </div>
  );
};

const Home: React.FC = () => {
  const [cats, setCats] = useState<CatData[]>([]);
  const { setUser } = useUser();

  useEffect(() => {
    const fetchCatsAndUser = async () => {
      const catsArr = await retrieveUserCats();
      setCats(catsArr);

      const token = Auth.getToken();

      if (!token) {
        console.log("Unable to find token");
      } else {
        const userId: { id: number } = jwtDecode(token);
        const user = await retrieveUser(userId.id);
        setUser(user);
        console.log(user);
      }
    };
    fetchCatsAndUser();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-color_1 rounded-b-2xl">
      <h1 className="text-2xl font-bold mb-6">Your Adopted Cats</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => {
          const cat = cats[index];
          return <CatCard key={index} cat={cat} />;
        })}
      </div>
    </div>
  );
};

export default Home;
