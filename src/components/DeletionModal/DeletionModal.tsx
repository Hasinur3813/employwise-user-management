import React from "react";
import { User } from "../../type/UserType";

interface ModalProps {
  selectedUser: User | null;
  setShowModal: (value: boolean) => void;
  handleDelete: () => void;
}

const DeletionModal: React.FC<ModalProps> = ({
  selectedUser,
  setShowModal,
  handleDelete,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
        <p>
          Are you sure you want to delete {selectedUser?.first_name}{" "}
          {selectedUser?.last_name}?
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            className="bg-gray-300 px-4 py-2 cursor-pointer rounded hover:bg-gray-400"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-error/80 text-white cursor-pointer px-4 py-2 rounded hover:bg-error"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletionModal;
