import React, { useEffect, useState } from "react";
import loading from "../assets/loading.svg"

import { toast } from "react-toastify";

import {
  updateUser,
  deleteUser,
  updateUserPassword,
  getUser,
} from "../apiHelpers";
import TemplateList from "./TemplateList";

export default function Profile() {
  const id = JSON.parse(localStorage.getItem("details")).id;
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  //EXPERIMENT
  const [isPageLoad, setIsPageLoad] = useState(false);
  const fetchUser = async () => {
    try {
      const userDetails = await getUser(id);
      setUser(userDetails[0]);
      setIsPageLoad(true);
    } catch (error) {
      console.error(error);
      setIsPageLoad(true);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.onload = () => {
    fetchUser();
  };
  //Change User's profile PIC

  let pic;
  async function handleImageUpload(event) {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "qpidzcci");
    try {
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dgnjgjsto/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      pic = urlData.url.toString();
      setImageUrl(pic);
      console.log(pic);
    } catch (error) {}
  }




  const handleUsernameChange = (event) => {
    setUser({ ...user, name: event.target.value });
  };

  const handleEmailChange = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  const handlePasswordChange = (event) => {
    setUser({ ...user, password: event.target.value });
  };
  const handleImageChange = (event) => {
    setUser({ ...user, image: event.target.value });
  };

  //Change Password
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserPassword(user, { password: user.password });
      toast.success(`${res.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        style: { backgroundColor: "#1b3152", color: "#d7eefa" },
      });
    } catch (error) {
      toast.error(`${error.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        style: { backgroundColor: "#1b3152", color: "#d7eefa" },
      });
    }
  };

  //Update user's details
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(user, (user.image = imageUrl));
      toast.success(`${res.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        style: { backgroundColor: "#1b3152", color: "#d7eefa" },
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        style: { backgroundColor: "#1b3152", color: "#d7eefa" },
      });
    }
  };

  //Delete Account
  const handleDeleteUser = async () => {
    const result = await new Promise((resolve) => {
      const confirmation = window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );
      resolve(confirmation);
    });

    if (result) {
      try {
        const id = user._id;
        await deleteUser(id);
        localStorage.removeItem("details");
        localStorage.removeItem("user");
        toast.warning(`Your account has been deleted`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          style: { backgroundColor: "#1b3152", color: "#d7eefa" },
        });
      } catch (error) {
        toast.error(`${error.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          style: { backgroundColor: "#1b3152", color: "#d7eefa" },
        });
      }
    }
  };

  if (!isPageLoad) {
    return <div className="Loading templates-container"><div>Loading...</div><img src={loading} alt="" /></div>;
  }
  return (
    <div className="templates-container">
      
      <div className="profile-section">
        <div className="user-details">
          <div>
            <form className="profile-form" onSubmit={onSubmit}>
              <h4>Edit your Details {user.name}</h4>
              <div className="profile-pic-div">
                <img
                  className="profile-pic"
                  src={imageUrl !== "" ? imageUrl : user.image}
                  alt="Profile"
                  onClick={() => document.getElementById("fileInput").click()}
                  onChange={handleImageChange}
                />
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <label htmlFor="username">Username</label>
              <input
                name="name"
                type="text"
                value={user.name}
                onChange={handleUsernameChange}
                required
                minLength={3}
              />
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                value={user.email}
                onChange={handleEmailChange}
                required
              />
              <button className="save-profile">Save</button>
            </form>

            <div>
              <form onSubmit={resetPassword}>
                <input
                  name="password"
                  className="change-password"
                  type="password"
                  onChange={handlePasswordChange}
                  placeholder="Enter your new password"
                  required
                  minLength={8}
                />
                <button type="submit" className="change-password">
                  Change password
                </button>
              </form>
            </div>
          </div>
          <button className="delete-account" onClick={handleDeleteUser}>
            Delete Account
          </button>
        </div>
      </div>
      <TemplateList/>
    </div>
  );
}
