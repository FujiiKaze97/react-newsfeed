import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import supabase, { SUPABASE_PROJECT_URL } from '../../supabase';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const MyPage = () => {
  const navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState('');
  const fileInputRef = useRef(null);
  const [nickname, setNickname] = useState('');
  const [postings, setPostings] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupNickname, setPopupNickname] = useState(nickname);

  const checkProfile = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    let { data: profile, error: usersError } = await supabase
      .from('users')
      .select('profile_url, nick_nm')
      .eq('id', user.id);

    const profileUrl = profile[0].profile_url ? profile[0].profile_url : 'default-profile.jpg';

    const { data, error } = supabase.storage.from('avatars').getPublicUrl(profileUrl);

    const imageUrl = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/avatars/${profileUrl}`;

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

  const openPopup = () => {
    setPopupNickname(nickname); // 팝업이 열릴 때 현재 닉네임으로 초기화
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUpdateNickname = () => {
    setNickname(popupNickname);
    updateNickname(popupNickname); // 기존 닉네임 수정 함수 호출
    closePopup();
  };

  const updateNickname = async () => {
    // 세션에서 사용자 정보 가져오기
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      throw new Error('Error fetching session: ' + sessionError.message);
    }

    const userId = sessionData.session.user.id; // 사용자 ID 가져오기

    const { error: updateError } = await supabase.from('users').update({ nick_nm: popupNickname }).eq('id', userId);

    if (updateError) {
      console.error('Error updating nickname:', updateError.message);

      await supabase
        .from('postings')
        .update({ nick_nm: popupNickname }) // 닉네임 업데이트
        .eq('id', userId); // user_id 필드가 현재 사용자의 ID와 일치하는 모든 게시물

      // 3. comments 테이블에서 닉네임 업데이트
      await supabase
        .from('comments')
        .update({ nick_nm: popupNickname }) // 닉네임 업데이트
        .eq('id', userId); // user_id 필드가 현재 사용자의 ID와 일치하는 모든 댓글
    } else {
      setNickname(popupNickname);
      // setNewNickname('');
      alert('닉네임이 성공적으로 업데이트되었으며, 관련된 게시물과 댓글에도 반영되었습니다.');
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
        const userId = sessionData.session.user.id;

        // 3. 이메일과 일치하는 포스팅 데이터를 조회합니다.
        const { data: postingsData, error: postingsError } = await supabase
          .from('postings')
          .select('posting_id, image, title')
          .eq('id', userId); // user_id 필드가 사용자의 이메일과 일치하는 데이터를 조회

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
    <Wrapper>
      <LeftSection>
        <button onClick={() => navigate('/mainnewsfeed')}>어서오시개!</button>
        <ProfileImage src={profileUrl} alt="Profile" />
        <Nickname>{nickname}</Nickname>
        <button onClick={handleClick}>프로필 이미지 변경</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => handleFileInputChange(e.target.files)}
        />

        {isPopupOpen && (
          <PopupOverlay onClick={closePopup}>
            <PopupContent onClick={(e) => e.stopPropagation()}>
              <h3>닉네임 수정</h3>
              <input
                type="text"
                value={popupNickname}
                onChange={(e) => setPopupNickname(e.target.value)}
                placeholder="새 닉네임을 입력하세요"
              />
              <button onClick={handleUpdateNickname}>확인</button>
              <button onClick={closePopup}>취소</button>
            </PopupContent>
          </PopupOverlay>
        )}
        <button type="button" onClick={openPopup}>
          닉네임 수정
        </button>

        <button onClick={() => navigate('/mainnewsfeedwrite')}>글쓰기</button>
        <LogoutButton />
      </LeftSection>

      <RightSection>
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
      </RightSection>
    </Wrapper>
  );
};

export default MyPage;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  margin: 0 auto;

  align-items: flex-start;
  justify-content: space-between;
  padding: 2rem;
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; // 컨텐츠를 위쪽으로 정렬
  background-color: #f5f5f5;
  padding: 2rem;
  margin-right: 2rem; // 오른쪽 섹션과의 간격 조정
  border-radius: 10px; // 모서리를 둥글게
  height: 100%; // height를 자동으로 조정하여 내용에 맞게 변화
`;

export const RightSection = styled.div`
  flex: 3; // LeftSection보다 더 넓게 설정
  padding: 2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%; // 포스팅 리스트가 넓게 퍼질 수 있도록 설정
  margin-left: 2rem; // LeftSection과의 간격 조정

  h2 {
    margin-bottom: 2rem; // 아이템들과의 간격을 적절히 조정
  }
`;

const ProfileImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const PostingList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem; // 아이템들 간의 간격 조정
`;

const PostingItem = styled.div`
  margin-bottom: 1rem;
  text-align: center;

  width: 200px; // 모든 아이템의 너비를 동일하게 설정
  text-align: center;
  margin-bottom: 20px;

  img {
    width: 100%; // 이미지가 아이템의 전체 너비를 차지하도록 설정
    height: 200px; // 모든 이미지의 높이를 동일하게 설정
    object-fit: cover; // 이미지 비율을 유지하면서 크기에 맞춤
    border-radius: 10px;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 16px;
    margin: 0; // 제목 위아래 여백을 없애서 일관성 유지
  }

  &:hover {
    opacity: 0.8; // 호버 시 투명도를 조정하여 사용자 피드백 제공
  }
`;

const PopupOverlay = styled.div`
  // 화면 전체를 덮는 오버레이 스타일
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 투명한 검정 배경
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  // 팝업 창 스타일
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;

  h3 {
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  button {
    margin: 0 0.5rem;
  }
`;

const Nickname = styled.p`
  font-size: 18px; // 폰트 크기 설정
  font-weight: bold; // 굵은 폰트 설정
  margin-top: 10px; // 프로필 이미지와의 간격 설정
  margin-bottom: 20px; // 아래 컨텐츠와의 간격 설정
  text-align: center; // 중앙 정렬
`;
