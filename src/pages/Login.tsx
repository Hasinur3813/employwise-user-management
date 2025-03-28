import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post<{ token: string }>(
        "https://reqres.in/api/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Succesfully Logged In");
      navigate("/users");
    } catch {
      setError("Invalid email or password");
      toast.error("Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Toaster />
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-center text-midnight mb-4">
          EmployWise Login
        </h2>
        {error && <p className="text-error text-sm text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-tahiti"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-tahiti"
        />
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-tahiti/50" : "bg-tahiti hover:bg-bermuda"
          } w-full text-lg cursor-pointer text-white py-2 rounded  transition`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
