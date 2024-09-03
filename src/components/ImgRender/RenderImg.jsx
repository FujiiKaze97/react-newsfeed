import { useState, useEffect } from 'react';
import styled from 'styled-components';

 const CardImg = styled.img`
  width: 100%;
  height: 40%; /* 카드 높이의 40% */
  object-fit: cover; /* 이미지가 카드에 맞게 잘림 */
`;

const LazyImage = ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <CardImg
      src={loaded ? src : 'loading-placeholder.png'} // 로딩 중 이미지
      alt={alt}
      {...props}
    />
  );
};

export default LazyImage;
