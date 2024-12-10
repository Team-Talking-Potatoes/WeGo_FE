import React from 'react';

const Swiper = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

Swiper.propTypes = {
  children: PropTypes.node,
};

const SwiperSlide = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

SwiperSlide.propTypes = {
  children: PropTypes.node,
};

const Pagination = () => {
  return null;
};

export { Swiper, SwiperSlide, Pagination };
