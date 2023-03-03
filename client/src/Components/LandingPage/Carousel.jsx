import React, { useState, useEffect } from "react";
import builder1 from "../../assets/landing/builder1.png";
import builder2 from "../../assets/landing/builder2.png";
import builder3 from "../../assets/landing/builder3.png";
import builder4 from "../../assets/landing/builder4.png";
import builder5 from "../../assets/landing/builder5.png";
import "./Carousel.css";

const Carousel = () => {
  const [active, setActive] = useState(0);
  const [items, setItems] = useState([
    {
      pos: -2,
      content: (
        <img
          className="carousel__item-img"
          src={builder1}
          alt="builder preview"
        />
      ),
      title: "Hello 1",
    },
    {
      pos: -1,
      content: (
        <img
          className="carousel__item-img"
          src={builder2}
          alt="builder preview"
        />
      ),
      title: "Hello 2",
    },
    {
      pos: 0,
      content: (
        <img
          className="carousel__item-img"
          src={builder3}
          alt="builder preview"
        />
      ),
      title: "Hello 3",
    },
    {
      pos: 1,
      content: (
        <img
          className="carousel__item-img"
          src={builder4}
          alt="builder preview"
        />
      ),
      title: "Hello 4",
    },
    {
      pos: 2,
      content: (
        <img
          className="carousel__item-img"
          src={builder5}
          alt="builder preview"
        />
      ),
      title: "Hello 5",
    },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setItems((prevState) => {
        const nextIndex = active === prevState.length - 1 ? 0 : active + 1;
        const newItems = prevState.map((item) => {
          const itemPos = item.pos - 1;
          return {
            ...item,
            pos: itemPos < -2 ? 2 : itemPos,
          };
        });
        setActive(nextIndex);
        return newItems;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [active]);

  const updateActive = (newActive) => {
    const newActivePos = newActive.pos;
    setItems((prevState) => {
      const updatedItems = prevState.map((item) => {
        const itemPos = item.pos;
        item.pos = getPos(itemPos, newActivePos);
        return item;
      });
      return updatedItems;
    });
    setActive(newActivePos);
  };

  const getPos = (current, active) => {
    const diff = current - active;
    if (Math.abs(current - active) > 2) {
      return -current;
    }
    return diff;
  };

  return (
    <div className="carousel">
      <h1 className="carousel-title">Create Smarter.</h1>
      <div className="carousel__list">
        {items.map((item) => (
          <li
            key={item.pos}
            className={`carousel__item ${
              item.pos === active ? "carousel__item_active" : ""
            }`}
            data-pos={item.pos}
            onClick={() => updateActive(item)}
          >
            {item.content}
          </li>
        ))}
      </div>
      <p className="landing-paragraph">
            The builder is designed for businesses, bloggers, artists, and
            anyone who wants to create a professional-looking website
            without spending a lot of time or money. With our user-friendly
            interface and helpful support team, you can get your website up and
            running in no time. Try our website builder today and see how easy
            it is to create a stunning website that will impress your audience
            and help you achieve your goals.
          </p>
    </div>
  );
};

export default Carousel;
