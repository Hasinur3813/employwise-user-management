import React from "react";

interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  handleDelete,
  handleEdit,
}) => {
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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleEdit(user.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => handleDelete(user.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
