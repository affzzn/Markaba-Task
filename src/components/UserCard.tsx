import React from "react";
import { type User } from "../context/types";

interface Props {
  user: User;
  onLogout: () => void;
}

const UserCard: React.FC<Props> = ({ user, onLogout }) => {
  return (
    <div className="bg-gray-800 text-white px-8 py-4 rounded shadow-md w-full max-w-3xl mx-auto text-center">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL ?? ""}
            alt="Profile"
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-full"
          />
          <div className="text-left">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-300">{user.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserCard;
