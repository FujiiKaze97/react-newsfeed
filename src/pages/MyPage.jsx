import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import supabase from '../../suparbase';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [profileUrl, setProfileUrl] = useState('');
  const fileInputRef = useRef(null);
  const [nickname, setNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');

  // public.users에서 사용자 데이터를 가져오는 함수
  const fetchUserData = async () => {
    // 세션에서 사용자 정보 가져오기
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      throw new Error('Error fetching session: ' + sessionError.message);
    }

    const userId = sessionData.session.user.id; // 사용자 ID 가져오기

    // public.users 테이블에서 사용자 정보 가져오기
    const { data: userData, error: userError } = await supabase
      .from('users') // public.users 테이블 선택
      .select('*') // 모든 컬럼 선택
      .eq('auth_users_id', userId) // 조건: 사용자 ID가 세션에서 가져온 ID와 일치
      .single(); // 단일 레코드를 기대할 때 사용

    if (userError) {
      throw new Error('Error fetching user data: ' + userError.message);
    }

    return userData; // 사용자 데이터를 반환
  };

  const checkProfile = () => {
    const { data } = supabase.storage.from('avatars').getPublicUrl('image.png');
    setProfileUrl(data.publicUrl);
  };

  const handleFileInputChange = async (files) => {
    const [file] = files;
    if (!file) return;

    const { data } = await supabase.storage.from('avatars').upload(`avatar_${Date.now()}.png`, file);
    setProfileUrl(`https://sdkvrrggsuuhvxrvsobx.supabase.co/storage/v1/object/public/avatars/${data.path}`);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const fetchNickname = async () => {
    console.log('fetchNickname');

    const userData = await fetchUserData(); // 분리된 함수 호출
    setNickname(userData.nick_nm);
  };

  const updateNickname = async () => {
    // 세션에서 사용자 정보 가져오기
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      throw new Error('Error fetching session: ' + sessionError.message);
    }

    const userId = sessionData.session.user.id; // 사용자 ID 가져오기

    const { error: updateError } = await supabase
      .from('users')
      .update({ nick_nm: newNickname })
      .eq('auth_users_id', userId);

    if (updateError) {
      console.error('Error updating nickname:', updateError.message);
    } else {
      setNickname(newNickname);
      setNewNickname('');
      alert('닉네임이 성공적으로 업데이트되었습니다.');
    }
  };

  useEffect(() => {
    checkProfile();
    fetchNickname();
  }, []);

  return (
    <Container>
      <ProfileImage src={profileUrl} alt="Profile" />
      <button onClick={handleClick}>프로필 업로드하기</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => handleFileInputChange(e.target.files)}
      />

      <div>
        <p>현재 닉네임: {nickname}</p>
        <input
          type="text"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
          placeholder="새 닉네임을 입력하세요"
        />
        <button type="button" onClick={updateNickname}>
          닉네임 수정
        </button>
      </div>
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
