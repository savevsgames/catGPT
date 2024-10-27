import React, { useState, useEffect } from "react";
import { getUserIdFromToken } from "../utils/userToken";
import {
  retrieveUser,
  retrieveCatCount,
  retrieveUserCreatedAt,
  // updateUserBio,
  updateUserPassword,
  // updateUserUsername,
} from "../api/userAPI";
import { UserData } from "../interfaces/userData";

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [catCount, setCatCount] = useState(0);
  const [memberSince, setMemberSince] = useState<string>("");
  const [randomUserImage, setRandomUserImage] = useState<string>(""); // State for random user image
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect to load the user;s data
  useEffect(() => {
    const fetchData = async () => {
      const userId = getUserIdFromToken();
      if (userId) {
        try {
          setLoading(true);
          setError(null);

          const user = await retrieveUser(userId);
          const count = await retrieveCatCount(userId);
          const createdAt = await retrieveUserCreatedAt(userId);
          const createdAtFormatted = createdAt.split(",")[0];

          setUserData(user);
          setCatCount(count);
          setMemberSince(createdAtFormatted);

          const style = "avataaars"; // Customize as needed
          setRandomUserImage(
            `https://api.dicebear.com/6.x/${style}/svg?seed=${userId}`
          );
        } catch (error) {
          console.error("Error retrieving user data:", error);
          setError("Failed to retrieve user data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  // function to handlePassword Change
  const handlePasswordChange = async () => {
    const userId = getUserIdFromToken();
    const newPassword = prompt("Enter your new password");
    if (!userId) {
      return console.log("userId not found");
    }
    if (newPassword) {
      try {
        await updateUserPassword(userId, newPassword);
        setUserData((prevData) =>
          prevData ? { ...prevData, password: newPassword } : null
        );
        alert("Password updated successfully");
      } catch (error) {
        console.error("error updating password", error);
        alert("Failed to update password");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 rounded-lg bg-color_1">
      <div className="md:flex md:space-x-6">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <img
            src={randomUserImage} // Use the fetched random user image
            alt="User Avatar"
            className="w-full h-auto rounded-lg shadow-lg mb-4"
          />
          <div className="p-4 rounded-lg shadow bg-color_2">
            <p>
              <strong>Yarn:</strong> {userData?.yarn}
            </p>
            <p>
              <strong>Member Since:</strong> {memberSince || "Loading..."}
            </p>
            <p>
              <strong>Cats Owned:</strong> {catCount}
            </p>
            <p>
              <strong>User Role:</strong> {userData?.userRole || "Loading..."}
            </p>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="p-6 rounded-lg shadow-lg mb-6 bg-color_2">
            <h1 className="text-2xl font-semibold mb-2">
              Hi {userData?.username}
            </h1>
            <p>
              <strong>Bio:</strong> {userData?.bio}
            </p>
          </div>
          <div className="space-x-0 space-y-4 md:space-y-4 md:space-x-4">
            <button
              onClick={handlePasswordChange}
              className="ml-2 px-4 py-2 bg-color_3 rounded-lg hover:bg-color_5 transition-colors md:w-auto"
            >
              Change Password
            </button>
            <button
              onClick={() => console.log("Bio change!")}
              className="ml-2 px-4 py-2 bg-color_3 text-white rounded-lg hover:bg-color_5 transition-colors md:w-auto"
            >
              Change Bio
            </button>
            <button
              onClick={() => console.log("Username change!")}
              className="ml-2 px-4 py-2 bg-color_3 text-white rounded-lg hover:bg-color_5 transition-colors md:w-auto"
            >
              Change Username
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
