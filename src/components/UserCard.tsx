import React from "react";
import { Link } from "react-router";
import { User } from "../type/UserType";

interface UserCardProps {
  user: User;
  confirmDelete: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, confirmDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <img
        src={user.avatar}
        alt={user.first_name}
        className="w-24 h-24 mx-auto rounded-full mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">
        {user.first_name} {user.last_name}
      </h3>
      <p className="text-gray-600">{user.email}</p>
      <div className="mt-4 flex justify-center gap-3">
        <Link to={`/users/${user.id}`}>
          <button className="bg-tahiti cursor-pointer text-white px-4 py-2 rounded hover:bg-bermuda">
            Edit
          </button>
        </Link>
        <button
          className="bg-error cursor-pointer text-white px-4 py-2 rounded hover:bg-error/80"
          onClick={() => confirmDelete(user)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
