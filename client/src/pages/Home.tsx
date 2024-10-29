import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CatData } from "../interfaces/CatData";
import { retrieveUserCats } from "../api/userAPI"; 
import Auth from "../utils/auth"; // Import your AuthService
import { useCatContext } from "../context/CatContext";
import CatCard from "../components/catCard";
import { getUserIdFromToken } from "../utils/userToken";

const Home: React.FC = () => {
  const [adoptableCats, setAdoptableCats] = useState<CatData[]>([]);
  const [userCats, setUserCats] = useState<CatData[]>([]);
  const { setSelectedCat } = useCatContext();
  const navigate = useNavigate();

  // Fetch cats and user data when the component mounts
  useEffect(() => {
    const fetchCatsAndUser = async () => {
      try {
        const userId = getUserIdFromToken();
        console.log("User ID: ", userId);
        // Fetch adoptable cats
        const adoptableResponse = await fetch(
          `./api/users/adoptablecats?userId=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Auth.getToken()}`,
            },
          }
        );
        console.log(
          `Fetching from: ./api/users/adoptablecats?userId=${userId}`
        );
        console.log("Response from /adoptablecats req: ", adoptableResponse);
        if (!adoptableResponse.ok) {
          throw new Error(
            `Failed to fetch adoptable cats: ${adoptableResponse.statusText}`
          );
        }

        const adoptable = await adoptableResponse.json();
        setAdoptableCats(adoptable);
               
        // Fetch user's adopted cats and set them
        const ownedCats = await retrieveUserCats();
        setUserCats(ownedCats);
      } catch (error) {
        console.error("Failed to fetch cats:", error);
      }
    };

    fetchCatsAndUser(); // Trigger the fetch function
  }, []);

  // Handle cat adoption
  const handleAdopt = async (cat: CatData) => {
    console.log(cat);
    try {
      const token = Auth.getToken(); // Ensure token is available
      const userId = getUserIdFromToken();

      const response = await fetch("/api/cats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token in header
        },
        body: JSON.stringify({
          ...cat,
          userId,
        }),
      });
      console.log("User ", userId, " is Adopting cat: ", cat, "token: ", token);

      if (!response.ok) {
        throw new Error("Failed to adopt cat");
      }

      console.log("Cat adopted successfully");
      // window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error("Error adopting cat:", error);
    }
  };

  // Handle navigation to cat details page
  const handleCat = (cat: CatData) => {
    setSelectedCat(cat);
    const catName = cat.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/${catName}`, { state: { cat } });
  };

  return (
    <div className="container mx-auto p-6 bg-color_1 rounded-b-2xl">
      <h1 className="text-2xl font-bold mb-6">Your Adopted Cats</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {userCats.map((cat) => (
          <CatCard
            key={cat.id}
            cat={cat}
            isAvailable={false}
            onClick={() => handleCat(cat)}
          />
        ))}
        {adoptableCats.map((cat) => (
          <CatCard
            key={cat.id}
            cat={cat}
            isAvailable={true}
            onClick={() => handleAdopt(cat)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
