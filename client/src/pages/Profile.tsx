import React, { useState, useEffect } from "react";
import { getUserIdFromToken } from "../utils/userToken";
import {
  retrieveUser,
  retrieveCatCount,
  retrieveUserCreatedAt,
} from "../api/userAPI";
import { UserData } from "../interfaces/userData";
import { format } from "date-fns";

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [catCount, setCatCount] = useState(0);
  const [memberSince, setMemberSince] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const userId = getUserIdFromToken();
      if (userId) {
        try {
          const user = await retrieveUser(userId); // get user data
          console.log("User data from Profile page:", user);

          const count = await retrieveCatCount(userId); // get count of adopted cats
          console.log("User adopted cats count:", count);

          const createdAt = await retrieveUserCreatedAt(userId); // get member since date
          const createdAtFormatted = format(new Date(createdAt), "MMMM yyyy");

          console.log("Formatted Member Since:", createdAtFormatted);

          setUserData(user);

          setCatCount(count);

          setMemberSince(createdAtFormatted);
        } catch (error) {
          console.error("Error retrieving user data:", error);
        }
      }
    };

    fetchData();
  }, [userData, catCount, memberSince]); // no dependencies set yet

  // Additional effect to log updated state values after they've changed
  useEffect(() => {
    console.log("Updated userData:", userData);
    console.log("Updated catCount:", catCount);
    console.log("Updated memberSince:", memberSince);
  }, [userData, catCount, memberSince]);

  const handleChangePassword = () => {
    alert(`Password change!`);
  };

  const handleChangeBio = () => {
    console.log(`Bio change!`);
  };

  const handleChangeUsername = () => {
    console.log(`Username change!`);
  };

  return (
    <div className="container mx-auto p-6 rounded-lg bg-color_1">
      <div className="md:flex md:space-x-6">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <img
            src="https://picsum.photos/350/300" // Replace with user avatar if available
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
              <strong>Cats Owned:</strong> {catCount || "Loading..."}
            </p>
            <p>
              <strong>User Role:</strong> {userData?.userRole || "Loading..."}
            </p>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="p-6 rounded-lg shadow-lg mb-6 bg-color_2">
            <h1 className="text-2xl font-semibold mb-2">
              {userData?.username}
            </h1>
            <p>
              <strong>Bio:</strong> {userData?.bio}
            </p>
          </div>
          <div className="space-x-0 space-y-4 md:space-y-4 md:space-x-4">
            <button
              onClick={handleChangePassword}
              className="ml-2 px-4 py-2 bg-color_3 rounded-lg hover:bg-color_5 transition-colors md:w-auto"
            >
              Change Password
            </button>
            <button
              onClick={handleChangeBio}
              className="ml-2 px-4 py-2 bg-color_3 text-white rounded-lg hover:bg-color_5 transition-colors md:w-auto"
            >
              Change Bio
            </button>
            <button
              onClick={handleChangeUsername}
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
