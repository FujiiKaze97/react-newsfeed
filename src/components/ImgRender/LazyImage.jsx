import { useState, useEffect } from 'react';
import styled from 'styled-components';

const CardImg = styled.img`
  width: 100%;
  height: 40%;
  object-fit: cover;
`;

const LazyImage = ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();

    console.log(src);
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true); // 이미지 로드 실패 시 에러 상태로 설정
  }, [src]);

  return (
    <CardImg
      src={error ? 'error-placeholder.png' : loaded ? src : 'loading-placeholder.png'} // 에러 시 대체 이미지
      alt={alt}
      {...props}
    />
  );
};

export default LazyImage;