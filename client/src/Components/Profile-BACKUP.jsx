import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllTemplatesById,
  deleteTemplate,
  updateUser,
  deleteUser,
  updateUserPassword,
  getUser
} from "../apiHelpers";
import Canvas from "./Canvas";
export default function Profile() {
  const [template, setTemplate] = useState([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const id = JSON.parse(localStorage.getItem("details")).id
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("details")));
  const [imageUrl, setImageUrl] = useState(
    "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png"
  );
  const fetchUserDetails = async () => {
    try {
      const userDetails = await getUser(id);
     setUser(userDetails);
     console.log(userDetails) 
     return userDetails;
      
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  //Get All Website templates from Server
  useEffect(() => {
    getAllTemplatesById()
      .then((data) => setTemplate(data))
      .catch((error) => console.log(error));
  }, []);

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
      setImageUrl(pic)
      console.log("%%%%" + pic);
    } catch (error) {}
  }

  const handleDelete = async () => {
    try {
      await deleteTemplate(deleteItemId);
      const updatedTemplates = template.filter(
        (item) => item._id !== deleteItemId
      );
      setTemplate(updatedTemplates);
      setShowDeleteWarning(false);
      toast.success(`Template deleted successfully`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        style: { backgroundColor: "#1b3152", color: "#d7eefa" },
      });
    } catch (error) {
      toast.error(`Template not found`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        style: { backgroundColor: "#1b3152", color: "#d7eefa" },
      });
    }
  };
  const handleDeleteWarning = (itemId) => {
    setShowDeleteWarning(true);
    setDeleteItemId(itemId);
  };

  const handleCancelDelete = () => {
    setShowDeleteWarning(false);
  };

  const handleUsernameChange = (event) => {
    setUser({ ...user, name: event.target.value });
  };

  const handleEmailChange = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  const handlePasswordChange = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  //Change Password
  const resetPassword = async (e) => {
    e.preventDefault();
    const id = user;
    try {
      const res = await updateUserPassword(id);
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

    const id = user;
    try {
      const res = await updateUser(id);

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
        const id = user.id;
        await deleteUser(id);
        localStorage.removeItem("details");
        localStorage.removeItem("user");
        window.location.href = "/register";
      } catch (error) {
        toast.error(`${error.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          style: { backgroundColor: "#1b3152", color: "#d7eefa" },
        });
      }
    }
  };
  const handleOpenTemplate = async (template) => {
    try {
      const { html, css } = template;
      Canvas.setComponents(html);
      Canvas.setStyle(css);
    } catch (error) {
      toast.error(`${error.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        style: { backgroundColor: "#1b3152", color: "#d7eefa" },
      });
    }
  };

  return (
    <div className="templates-container">
      <div className="profile-section">
        <div className="user-details">
          <h4>Edit your Details {user.name}</h4>
          <img
            className="profile-pic"
            src={!user.image? imageUrl : user.image}
            alt="Profile"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />

          <div>
            <form className="profile-form" onSubmit={onSubmit}>
              <label htmlFor="username">Username</label>
              <input
                name="name"
                type="text"
                value={user.name}
                onChange={handleUsernameChange}
                required
                minLength={6}
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
      <div className="templates-section-wrapper">
        <div className="templates-section">
          {showDeleteWarning && (
            <div className="delete-warning">
              <p>Are you sure you want to delete this Template?</p>
              <button className="Yes-button confirm" onClick={handleDelete}>
                Yes
              </button>
              <button className="Yes-button deny" onClick={handleCancelDelete}>
                No
              </button>
            </div>
          )}
          {!template && <h1 className="delete-warning">Nothing to see here</h1>}
          {template &&
            template.map((item, index) => (
              <div
                className="Templates cards"
                id={template[index]._id}
                key={index}
              >
                <div className="cards">
                  {/** CARD **/}
                  <div>
                    <div className="card">
                      <img
                        src={template[index].image}
                        className="card__image"
                        alt="Template Cover"
                      />
                      <div className="card__overlay">
                        <div className="card__header">
                          <img
                            className="card__thumb"
                            src={template[index].image}
                            alt="Logo"
                          />
                          <div className="card__header-text">
                            <h3 className="card__title">
                              {template[index].title}
                            </h3>
                          </div>
                        </div>
                        <p className="card__description">
                          {template[index].description}
                        </p>
                        <div>
                          <button
                            className="template-edit"
                            onClick={handleOpenTemplate}
                          >
                            Edit
                          </button>
                          <button
                            className="template-delete"
                            onClick={() =>
                              handleDeleteWarning(template[index]._id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/** End of CARD **/}
                {/** CARD **/}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
