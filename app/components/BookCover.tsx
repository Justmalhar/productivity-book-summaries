'use client';

import React, { useState } from 'react';

const BookCover = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className="w-20 h-28 object-cover mr-4"
      onError={() => setImgSrc('/fallback-cover.jpg')}
    />
  );
};

export default BookCover;
