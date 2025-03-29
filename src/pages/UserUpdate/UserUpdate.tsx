import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { User } from "../../type/UserType";
import useToken from "../../hooks/useToken";

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((response) => {
        setUser(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch user details.");
        setLoading(false);
      });
  }, [id, token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await axios.put(`https://reqres.in/api/users/${id}`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });

      toast.success("User updated successfully!");
      navigate("/users");
    } catch {
      setError("Failed to update user.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center ">
        <p className="text-center text-midnight text-2xl mb-10">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex justify-center ">
        <p className="text-center text-error text-2xl mb-10">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-midnight/50 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-midnight">
        Edit User
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="first_name"
            value={user?.first_name || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-tahiti"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={user?.last_name || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-tahiti"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user?.email || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-tahiti"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-400 cursor-pointer text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => navigate("/users")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-tahiti cursor-pointer text-white px-4 py-2 rounded hover:bg-bermuda"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
