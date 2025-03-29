import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import UserCard from "../../components/UserCard";
import toast from "react-hot-toast";
import { User } from "../../type/UserType";
import DeletionModal from "../../components/DeletionModal/DeletionModal";
import useToken from "../../hooks/useToken";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { token, removeToken } = useToken();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchUsers(page);
  }, [navigate, page, token]);

  const fetchUsers = (pageNumber: number) => {
    setLoading(true);
    axios
      .get(`https://reqres.in/api/users?page=${pageNumber}`)
      .then((response) => {
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  };
  const confirmDelete = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete: () => void = () => {
    if (!token) {
      toast.error("Token is expired or invalid token");
      navigate("/");
      return;
    }
    if (selectedUser) {
      axios
        .delete(`https://reqres.in/api/users/${selectedUser.id}`)
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== selectedUser.id)
          );
          setShowModal(false);
          setSelectedUser(null);
          toast.success("The user is deleted!");
        })
        .catch(() => {
          setError("Failed to delete user");
          setShowModal(false);
          toast.error("Something went wrong!");
        });
    }
  };

  const handleLogout: () => void = () => {
    removeToken();
    toast.success("Succesfully logged out!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center text-midnight">
          Users List
        </h2>
        <button
          onClick={handleLogout}
          className="bg-error/90 text-white hover:bg-error text-lg font-semibold px-4 py-1 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-error">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} confirmDelete={confirmDelete} />
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`mx-2 px-4 py-2 rounded cursor-pointer ${
            page === 1 ? "bg-gray-300" : "bg-tahiti text-white hover:bg-bermuda"
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
          className={`mx-2 px-4 py-2 rounded cursor-pointer ${
            page === totalPages
              ? "bg-gray-300"
              : "bg-tahiti text-white hover:bg-bermuda"
          }`}
        >
          Next
        </button>
      </div>

      {showModal && (
        <DeletionModal
          selectedUser={selectedUser}
          setShowModal={setShowModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Users;
