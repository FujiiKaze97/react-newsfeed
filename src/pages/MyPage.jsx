import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import supabase from '../../suparbase'; // 주의: 파일 이름 오타 수정
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  // 이미지 업로드
  const [profileUrl, setProfileUrl] = useState('');
  const fileInputRef = useRef(null);

  const checkProfile = () => {
    const { data } = supabase.storage.from('avatars').getPublicUrl('image.png');
    setProfileUrl(data.publicUrl);
  };

  const handleFileInputChange = async (files) => {
    const [file] = files;

    if (!file) {
      return;
    }

    const { data } = await supabase.storage.from('avatars').upload(`avatar_${Date.now()}.png`, file);
    setProfileUrl(`https://sdkvrrggsuuhvxrvsobx.supabase.co/storage/v1/object/public/avatars/${data.path}`);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    checkProfile();
  }, []);

  // 닉네임 수정

  // 비밀번호 수정

  // 자기소개 수정

  return (
    <Container>
      <ProfileImage src={profileUrl} alt="Profile" />
      <button onClick={handleClick}>Upload New Avatar</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => handleFileInputChange(e.target.files)}
      />
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;
