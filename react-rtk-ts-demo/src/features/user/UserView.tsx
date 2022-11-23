import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./userSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

export const UserView = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      <h2>List of Users</h2>
      {users.isLoading && <div>Loading...</div>}
      {!users.isLoading && users.error ? <div>Error: {users.error}</div> : null}
      {!users.isLoading && users.data != null && users.data.length != 0 ? (
        <ul>
          {users.data.map((user) => (
            <li
              style={{ textAlign: "left", paddingLeft: "10px" }}
              key={user.id}
            >
              {user.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
