'use client'
'use client';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // Only one slide at a time
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // Only one slide at a time
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // Only one slide at a time
  },
};

const imgs = [
  "https://i.pinimg.com/736x/b8/e1/c3/b8e1c30f432ca20e7affc6f066a0ffe0.jpg",
  "https://i.pinimg.com/736x/be/ae/33/beae335e95851af7994f3a83e8072f72.jpg",
  "https://i.pinimg.com/736x/79/98/c9/7998c98bc5ed5cc12d30cced32372b9b.jpg",
];

const Caraousel = ({ deviceType }) => {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true} // Render carousel on server-side
      infinite={true}
      autoPlay={true} // Enable auto-play for all devices
      autoPlaySpeed={3000} // Slide every 3 seconds
      keyBoardControl={true}
      rewindWithAnimation
      customTransition="transform 0.7s ease-in-out" // Smooth swipe animation
      transitionDuration={700} // Matches the customTransition duration
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {imgs.map((item, index) => (
        <div key={index} className="w-full flex justify-center items-center">
          <img
            src={item}
            alt={`Slide ${index + 1}`}
            className="w-[45rem] h-[30rem] self-center rounded-md "
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Caraousel;

