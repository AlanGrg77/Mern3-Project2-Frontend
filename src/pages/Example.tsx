import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook"; // Adjust your hook path
import { fetchUsers } from "../store/example"; // Adjust your slice path
import { Status } from "../globals/types/authType";

const Example: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.example);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === Status.Loading) {
    return <div className="spinner border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>; // Replace with actual spinner
  }

  if (status === Status.Error) {
    return <div className="error">Error:</div>;
  }

  return (
    <div className="user-list">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {user.length > 0 ? (
        <ul className="list-disc pl-5">
          {user.map((u, index) => (
            <li key={index} className="mb-2">
              <strong>Username:</strong> {u.username || "N/A"} <br />
              <strong>Email:</strong> {u.email || "N/A"}
            </li>
          ))}
        </ul>
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
};

export default Example;
