import React from "react";
import { useState } from "react";
import { use } from "react";

const Users = ({ userPromise }) => {
  const loaddedUser = use(userPromise);
  const [users, setUser] = useState(loaddedUser);
  console.log(users);
  const handelUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };
    console.log(user);

    // create user with server
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data upter post", data);
        const newUser = [...users, data];
        setUser(newUser);
        e.target.reset();
      });
  };
  return (
    <div>
      <form onSubmit={handelUser} action="">
        <input name="name" type="text" /> <br />
        <input name="email" type="email" /> <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {users.map((user) => (
          <p>{user.email}</p>
        ))}
      </div>
    </div>
  );
};

export default Users;
