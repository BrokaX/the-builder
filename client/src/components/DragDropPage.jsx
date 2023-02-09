import React, { useState } from "react";
import bg from "../Assets/bg.jpg";

const Element = ({ element, idx, handleDragStart }) => (
  <img
    src={element.src}
    alt={element.alt}
    onDragStart={(e) => handleDragStart(e, idx)}
    draggable
    style={{ width: "100px", height: "100px" }}
  />
);

const DropArea = ({ elements, handleDrop }) => (
  <div
    style={{
      width: "100%",
      height: "200px",
      border: "1px solid black",
    }}
    onDrop={handleDrop}
    onDragOver={(e) => e.preventDefault()}
  >
    Drop Images Here
  </div>
);

const DragDropPage = () => {
  const [elements, setElements] = React.useState([
    {
      id: 1,
      src: "https://www.vectorlogo.zone/logos/apache_ant/apache_ant-icon.svg",
      alt: "Image 1",
    },
    {
      id: 2,
      src: "https://www.vectorlogo.zone/logos/apache_ant/apache_ant-icon.svg",
      alt: "Image 2",
    },
    { id: 3, src: { bg }, alt: "Image 3" },
    { id: 4, src: "image4.jpg", alt: "Image 4" },
  ]);

  const handleDragStart = (e, idx) => {
    e.dataTransfer.setData("idx", idx);
  };

  const handleDrop = (e) => {
    const idx = e.dataTransfer.getData("idx");
    const draggedElement = elements[idx];
    const newElements = [...elements];
    newElements.splice(idx, 1);
    newElements.splice(e.target.id, 0, draggedElement);
    setElements(newElements);
  };

  const [imageLoadError, setImageLoadError] = useState(false);
  const onImageLoadError = () => {
    setImageLoadError(true);
  };

  return (
    <div className="Canvas-container">
      <h2>Drag and Drop Image Builder</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {elements.map((element, idx) => (
          <div>
            <Element
              key={element.id}
              element={element}
              idx={idx}
              handleDragStart={handleDragStart}
              src={element.src}
            />
          </div>
        ))}
      </div>
      <DropArea elements={elements} handleDrop={handleDrop} />
    </div>
  );
};

export default DragDropPage;
