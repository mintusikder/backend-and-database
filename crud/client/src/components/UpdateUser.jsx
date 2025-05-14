import React from "react";
import { useLoaderData } from "react-router";

const UpdateUser = () => {
  const user = useLoaderData();
  console.log(user);
  const handelUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const updaterUser ={name,email}
    console.log(updaterUser);
    //update user info database
    fetch(`http://localhost:3000/users/${user._id}`, {
      method: "PUT",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(updaterUser)
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.modifiedCount){
          console.log("After update data", data);
        }
      });
  };
  return (
    <div>
      <form onSubmit={handelUpdate} action="">
        <input type="text" defaultValue={user.name} name="name" /> <br />
        <input type="email" defaultValue={user.email} name="email" /> <br />
        <input type="submit" value="Update user" />
      </form>
    </div>
  );
};

export default UpdateUser;
