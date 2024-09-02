import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import supabase, { SUPABASE_PROJECT_URL } from '../../suparbase';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';

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
      .maybeSingle(); // 단일 레코드를 기대할 때 사용

    if (userError) {
      throw new Error('Error fetching user data: ' + userError.message);
    }

    if (userData && userData.profile_url) {
      setProfileUrl(userData.profile_url);
    }

    return userData; // 사용자 데이터를 반환
  };

  const checkProfile = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log(user);
    let { data: profile, error: usersError } = await supabase
      .from('users')
      .select('profile_url, nick_nm')
      .eq('id', user.id);
    console.log(profileUrl);
    const { data, error } = supabase.storage.from('avatars').getPublicUrl(profile[0].profile_url ?? 'image.png');
    const imageUrl = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/avatars/${profile[0].profile_url}`;

    if (error) {
      console.error('Error fetching public URL:', error.message);
      return;
    }

    if (data) {
      setProfileUrl(imageUrl);
    }

    if (profile && profile[0].nick_nm) {
      setNickname(profile[0].nick_nm); // 닉네임을 상태에 저장합니다.
    }
  };

  const handleFileInputChange = async (files) => {
    const [file] = files;
    if (!file) return;

    const { data } = await supabase.storage.from('avatars').upload(`avatar_${Date.now()}.png`, file);

    const imageUrl = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/avatars/${data.path}`;
    setProfileUrl(imageUrl);

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      throw new Error('Error fetching session: ' + sessionError.message);
    }

    const userId = sessionData.session.user.id;

    const { error: updateError } = await supabase
      .from('users')
      .update({ profile_url: data.path }) // 프로필 이미지 URL을 profile_url 컬럼에 저장
      .eq('id', userId); // 현재 로그인한 사용자의 ID로 레코드 업데이트

    if (updateError) {
      console.error('Error updating profile URL:', updateError.message);
    } else {
      console.log('Profile URL updated successfully');
    }
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

    const { error: updateError } = await supabase.from('users').update({ nick_nm: newNickname }).eq('id', userId);

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
  console.log(profileUrl);
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
