import React, { useState } from "react";
import { Resizable } from "react-resizable";

function Canvas() {
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  const onDrop = (event) => {
    console.log(event.dataTransfer.getData("image"));
    setImage(event.dataTransfer.getData("image"));
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onResize = (event, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  const onDelete = () => {
    setImage(null);
  };

  return (
    <div
      className="Canvas-container"
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{}}
    >
      {image ? (
        <Resizable
          width={width}
          height={height}
          onResize={onResize}
          style={{
            display: "inline-block",
            position: "absolute",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: `100%`,
              height:`100%`,
            }}
          ></div>
        </Resizable>
      ) : (
        "Drop Image Here"
      )}
      <br />
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default Canvas;
