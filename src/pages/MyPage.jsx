import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import supabase, { SUPABASE_PROJECT_URL } from '../../suparbase';
import { Link, useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState('');
  const fileInputRef = useRef(null);
  const [nickname, setNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [postings, setPostings] = useState([]);

  const checkProfile = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    let { data: profile, error: usersError } = await supabase
      .from('users')
      .select('profile_url, nick_nm')
      .eq('id', user.id);

    const { data, error } = supabase.storage.from('avatars').getPublicUrl(profile[0].profile_url ?? 'image.png');
    const imageUrl = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/avatars/${profile[0].profile_url}`;

    if (error) {
      console.error('Error fetching public URL:', error.message);
      return;
    }

    if (data && data.publicUrl) {
      setProfileUrl(imageUrl);
    }

    if (profile && profile[0].nick_nm) {
      setNickname(profile[0].nick_nm); // 닉네임을 상태에 저장합니다.
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
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
    const fetchPostings = async () => {
      try {
        // 1. 세션에서 사용자 정보를 가져옵니다.
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Error fetching session:', sessionError.message);
          return;
        }

        // 2. 사용자의 이메일을 가져옵니다.
        const userEmail = sessionData.session.user.email;

        // 3. 이메일과 일치하는 포스팅 데이터를 조회합니다.
        const { data: postingsData, error: postingsError } = await supabase
          .from('postings')
          .select('image, title')
          .eq('user_id', userEmail); // user_id 필드가 사용자의 이메일과 일치하는 데이터를 조회

        if (postingsError) {
          console.error('Error fetching postings:', postingsError.message);
        } else {
          // 4. 조회한 포스팅 데이터를 상태에 저장합니다.
          setPostings(postingsData);
        }
      } catch (error) {
        console.error('Error in fetchPostings:', error);
      }
    };

    fetchPostings();
    checkProfile();
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
      <button onClick={() => navigate('/mainnewsfeedwrite', { replace: true })}>글쓰기</button>

      <h2>내 포스팅</h2>
      <PostingList>
        {postings.map((posting) => (
          <Link key={posting.posting_id} to={`/mainnewsfeeddetail/${posting.posting_id}`}>
            <PostingItem>
              <img src={posting.image} alt={posting.title} />
              <h3>{posting.title}</h3>
            </PostingItem>
          </Link>
        ))}
      </PostingList>
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

const PostingList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostingItem = styled.div`
  margin-bottom: 20px;
  text-align: center;

  img {
    max-width: 200px;
    max-height: 200px;
    /* object-fit: cover; */
    border-radius: 10px;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 16px;
  }
  &:hover {
    opacity: 0.8;
  }
`;
