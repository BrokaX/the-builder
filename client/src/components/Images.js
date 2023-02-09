import React from "react";

function Images() {
  const images = [
    "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_960_720.jpg",
    "https://cdn.pixabay.com/photo/2022/10/29/17/03/water-7555693_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_960_720.jpg",
    "https://cdn.pixabay.com/photo/2022/10/29/17/03/water-7555693_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_960_720.jpg",
    "https://cdn.pixabay.com/photo/2022/10/29/17/03/water-7555693_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_960_720.jpg",
  ];

  const onDragStart = (event, image) => {
    event.dataTransfer.setData("image", image);
  };

  return (
    <div className="For-images">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="Picked"
          onDragStart={(event) => onDragStart(event, image)}
        />
      ))}
    </div>
  );
}

export default Images;
