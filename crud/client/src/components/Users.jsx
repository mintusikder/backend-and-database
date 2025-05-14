import { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ usersPromise }) => {
  const loaddedUser = use(usersPromise);
  const [users, setUsers] = useState(loaddedUser);
  console.log(loaddedUser);
  const handelAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };
    console.log(newUser);

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After create user data", data);
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);
          alert("user added successful");
          e.target.reset();
        }
      });
  };

  const handelUserDelete = (id) => {
    console.log("delete this user", id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const remaining = users.filter((user) => user._id !== id);
          setUsers(remaining);
          console.log("After delete", data);
        }
      });
  };
  return (
    <div>
      {/* add user */}
      <div>
        <form onSubmit={handelAddUser} action="">
          <input type="text" name="name" /> <br />
          <input type="email" name="email" /> <br />
          <input type="submit" value="Add User" />
        </form>
      </div>
      {/* show user */}
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {" "}
            {user.name} : {user.email}
            <Link to={`/users/${user._id}`}>Details</Link>
            <Link to={`/update/${user._id}`}>Edit</Link>
            <button onClick={() => handelUserDelete(user._id)}>X</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
