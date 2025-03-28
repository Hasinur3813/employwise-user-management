import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import UserCard from "../../components/UserCard";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchUsers(page);
  }, [navigate, page]);

  const fetchUsers = (pageNumber: number) => {
    setLoading(true);
    axios
      .get(`https://reqres.in/api/users?page=${pageNumber}`)
      .then((response) => {
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
        setLoading(false);
        console.log(response.data);
      })
      .catch(() => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch(() => {
        setError("Failed to delete user");
      });
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-user/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
        Users List
      </h2>
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`mx-2 px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700 px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`mx-2 px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
