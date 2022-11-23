import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./userSlice";

export const UserView = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      <h2>List of Users</h2>
      {users.loading && <div>Loading...</div>}
      {!users.loading && users.error ? <div>Error: {users.error}</div> : null}
      {!users.loading && users.data != null && users.data.length != 0 ? (
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
