import React, { useState, useEffect } from "react";
import { getUserIdFromToken } from "../utils/userToken";
import {
  retrieveUser,
  retrieveCatCount,
  retrieveUserCreatedAt,
  updateUserBio,
  updateUserPassword,
  updateUserUsername,
} from "../api/userAPI";
import { UserData } from "../interfaces/userData";

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [catCount, setCatCount] = useState(0);
  const [memberSince, setMemberSince] = useState<string>("");
  const [randomUserImage, setRandomUserImage] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<{ type: string; isOpen: boolean }>({ type: "", isOpen: false });
  const [modalInput, setModalInput] = useState({ password: "", confirmPassword: "", username: "", bio: "" });
  const [successModal, setSuccessModal] = useState<{ isOpen: boolean; message: string }>({ isOpen: false, message: "" });

  // Fetch user data on load
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
          setUserData(user);
          setCatCount(count);
          setMemberSince(createdAt.split(",")[0]);

          setRandomUserImage(`https://api.dicebear.com/6.x/avataaars/svg?seed=${userId}`);
        } catch (error) {
          setError("Failed to retrieve user data");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  // Handlers for updating specific fields
  const handlePasswordChange = async () => {
    const userId = getUserIdFromToken();
    if (!userId) return console.log("User ID not found");

    if (modalInput.password !== modalInput.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await updateUserPassword(userId, modalInput.password);
      setSuccessModal({ isOpen: true, message: "Password updated successfully" });
    } catch (error) {
      setSuccessModal({ isOpen: true, message: "Failed to update password" });
    } finally {
      setModal({ type: "", isOpen: false });
    }
  };

  const handleUsernameChange = async () => {
    const userId = getUserIdFromToken();
    const newUsername = modalInput.username;
    if (!userId) return console.log("User ID not found");

    try {
      await updateUserUsername(userId, newUsername);
      setUserData((prevData) => (prevData ? { ...prevData, username: newUsername } : null));
      setSuccessModal({ isOpen: true, message: "Username updated successfully" });
    } catch (error) {
      setSuccessModal({ isOpen: true, message: "Failed to update username" });
    } finally {
      setModal({ type: "", isOpen: false });
    }
  };

  const handleBioChange = async () => {
    const userId = getUserIdFromToken();
    const newBio = modalInput.bio;
    if (!userId) return console.log("User ID not found");

    try {
      await updateUserBio(userId, newBio);
      setUserData((prevData) => (prevData ? { ...prevData, bio: newBio } : null));
      setSuccessModal({ isOpen: true, message: "Bio updated successfully" });
    } catch (error) {
      setSuccessModal({ isOpen: true, message: "Failed to update bio" });
    } finally {
      setModal({ type: "", isOpen: false });
    }
  };

  const openModal = (type: string) => {
    setModalInput({ password: "", confirmPassword: "", username: "", bio: "" });
    setModal({ type, isOpen: true });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setModalInput({ ...modalInput, [e.target.name]: e.target.value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-6 rounded-lg bg-color_1">
      {/* Profile Details */}
      <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center">
        <img src={randomUserImage} alt="User Avatar" className="w-32 h-32 rounded-full mx-auto shadow-lg mb-4" />
        <h1 className="text-xl font-semibold">Hi, {userData?.username}</h1>
        <p><strong>Member Since:</strong> {memberSince}</p>
        <p><strong>Cats Owned:</strong> {catCount}</p>
      </div>

      <div className="space-y-4 mt-4 text-center">
        <button onClick={() => openModal("password")} className="px-4 py-2 bg-color_3 rounded-lg hover:bg-color_5 transition-colors">Change Password</button>
        <button onClick={() => openModal("bio")} className="px-4 py-2 bg-color_3 rounded-lg hover:bg-color_5 transition-colors">Change Bio</button>
        <button onClick={() => openModal("username")} className="px-4 py-2 bg-color_3 rounded-lg hover:bg-color_5 transition-colors">Change Username</button>
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-semibold mb-4 capitalize">Change {modal.type}</h2>
            {modal.type === "password" ? (
              <>
                <input type="password" name="password" placeholder="New Password" value={modalInput.password} onChange={handleInputChange} className="w-full mb-3 p-2 border rounded" />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={modalInput.confirmPassword} onChange={handleInputChange} className="w-full mb-3 p-2 border rounded" />
                <button onClick={handlePasswordChange} className="px-4 py-2 bg-color_3 text-white rounded-lg">Save</button>
              </>
            ) : modal.type === "username" ? (
              <>
                <input type="text" name="username" placeholder="New Username" value={modalInput.username} onChange={handleInputChange} className="w-full mb-3 p-2 border rounded" />
                <button onClick={handleUsernameChange} className="px-4 py-2 bg-color_3 text-white rounded-lg">Save</button>
              </>
            ) : (
              <>
                <textarea name="bio" placeholder="New Bio" value={modalInput.bio} onChange={handleInputChange} className="w-full mb-3 p-2 border rounded"></textarea>
                <button onClick={handleBioChange} className="px-4 py-2 bg-color_3 text-white rounded-lg">Save</button>
              </>
            )}
          </div>
        </div>
      )}

      {successModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Update Status</h2>
            <p>{successModal.message}</p>
            <button onClick={() => setSuccessModal({ isOpen: false, message: "" })} className="px-4 py-2 bg-color_3 text-white rounded-lg">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
