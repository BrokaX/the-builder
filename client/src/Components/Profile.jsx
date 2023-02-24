import React, { useEffect, useState } from "react";
import {
  getAllTemplatesById,
  deleteTemplate,
  updateUser,
  deleteUser,
} from "../apiHelpers";
import Canvas from "./Canvas";
export default function Profile() {
  const [template, setTemplate] = useState([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("details")));

  useEffect(() => {
    getAllTemplatesById()
      .then((data) => setTemplate(data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = async () => {
    try {
      await deleteTemplate(deleteItemId);
      const updatedTemplates = template.filter(
        (item) => item._id !== deleteItemId
      );
      setTemplate(updatedTemplates);
      setShowDeleteWarning(false);
      setMessage("Item deleted successfully.");
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteWarning = (itemId) => {
    setShowDeleteWarning(true);
    setDeleteItemId(itemId);
  };

  const handleCancelDelete = () => {
    setShowDeleteWarning(false);
  };
  setTimeout(() => setMessage(""), 3000);
  const handleUsernameChange = (event) => {
    setUser({ ...user, name: event.target.value });
  };

  const handleEmailChange = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  const handlePasswordChange = (event) => {
    setUser({ ...user, password: event.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUser(user.id);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenTemplate = async (template) => {
    try {
      const { html, css } = template;
      Canvas.setComponents(html);
      Canvas.setStyle(css);
    } catch (error) {
      console.error(error);
      
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const id = user.id;
        await deleteUser(id);
        localStorage.removeItem("details");
        localStorage.removeItem("user");
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  return (
    <div className="templates-container">
      <div className="profile-section">
        <div className="user-details">
          <h4>Edit your Details {user.name}</h4>
          <img
            className="profile-pic"
            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png"
            alt="Profile"
          />
          <div>
            <form className="profile-form" onSubmit={onSubmit}>
              <label htmlFor="username">Username</label>
              <input
                name="name"
                type="text"
                value={user.name}
                onChange={handleUsernameChange}
              />
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                value={user.email}
                onChange={handleEmailChange}
              />
              <button className="save-profile">Save</button>
            </form>

            <div>
              <input className="change-password"
                type="password"
                onChange={handlePasswordChange}
              />
              <button className="change-password">Change password</button>
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
          {message && <p className="delete-warning">{message}</p>}
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
                        alt="Business card"
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
                            onClick={handleOpenTemplate
                              }
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
