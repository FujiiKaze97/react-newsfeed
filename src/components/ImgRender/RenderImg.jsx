import { useState, useEffect } from 'react';

const LazyImage = ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <img
      src={loaded ? src : 'loading-placeholder.png'} // 로딩 중 이미지
      alt={alt}
      {...props}
    />
  );
};

export default LazyImage;
