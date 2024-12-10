import React from 'react';

const Swiper = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const SwiperSlide = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const Pagination = () => {
  return null;
};

export { Swiper, SwiperSlide, Pagination };
