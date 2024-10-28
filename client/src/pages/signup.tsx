import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpData } from "../interfaces/SignUpData";
import AuthService from "../utils/auth";
import { signup } from "../api/authAPI";
import { useLoggedIn } from "../context/LoggedInContext";

const Signup: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setLoggedIn } = useLoggedIn();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPass: "",
    bio: "",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPass) {
      alert("Password does not match, please try again.");
      return;
    }

    setError(null);
    setLoading(true);

    const newUser: SignUpData = {
      username: form.username,
      email: form.email,
      password: form.password,
      bio: form.bio,
    };

    try {
      const data = await signup(newUser);
      setError("");
      AuthService.login(data.token);
      // if successful navigate to login page
      setLoggedIn(true);
      navigate("/home");
    } catch (err) {
      console.error("Signup failed", err);
      setError("Failed to sign up, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-color_2 p-4 min-h-screen flex flex-col items-center rounded-bl rounded-br">
      <div className="bg-color_1 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl mb-6">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md flex flex-col space-y-4"
        >
          <div>
            <label className="block text-lg mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="sample@email.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 border text-color_1 rounded bg-color_2"
            />
          </div>
          <div>
            <label className="block text-lg mb-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="yourUsername"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full p-2 border text-color_1 rounded bg-color_2"
            />
          </div>
          <div>
            <label className="block text-lg mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-2 border text-color_1 rounded bg-color_2"
            />
          </div>
          <div>
            <label className="block text-lg mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPass"
              placeholder="re-type password"
              value={form.confirmPass}
              onChange={handleChange}
              required
              className="w-full p-2 border text-color_1 rounded bg-color_2"
            />
          </div>
          <div>
            <label className="block text-lg mb-2">
              Bio (200 characters max)
            </label>
            <textarea
              name="bio"
              placeholder="tell us a little about yourself"
              value={form.bio}
              onChange={handleChange}
              maxLength={200}
              className="w-full p-2 border text-color_1 rounded bg-color_2"
            />
          </div>
          {error && <p className="text-white">{error}</p>}
          <button
            type="submit"
            className={`bg-color_3 px-6 py-2 rounded-lg hover:bg-color_5 transition-colors ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Start Adopting"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;


