import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllTemplatesById, deleteTemplate } from "../apiHelpers";

const TemplateList = ({ html, css }) => {
  const navigate = useNavigate();
  const [template, setTemplate] = useState([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // Fetch templates from server
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

  const handleOpenTemplate = (template) => {
    navigate("/builder", { state: { html: template.html, css: template.css } });
  };

  return (
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
                        <div
                          dangerouslySetInnerHTML={{
                            __html: template[index].html,
                          }}
                        ></div>
                        <div>
                          <button
                            className="template-edit"
                            onClick={() => handleOpenTemplate(template[index])}
                          >
                            Edit
                          </button>
                        </div>
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
  );
};

export default TemplateList;
