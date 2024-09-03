import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../supabase';
import {
  Container,
  Card,
  CardImage,
  CardContent,
  Title,
  Info,
  Button,
  ButtonContainer,
  CardContainer,
  CenterButton
} from './NewsfeedStyle'; // 스타일 import
import LogoutButton from '../LogoutButton';
import { SessionContext } from '../../context/SessionContext';
import styled from 'styled-components';

const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user) {
        const { data, error } = await supabase.from('postings').select('*, users(nick_nm)');
        if (error) {
          console.log(error);
        } else {
          setPosts(data);
        }
      }
    };
    fetchData();
  }, [session]);

  const postingClick = (posting_id) => {
    try {
      navigate('/mainnewsfeeddetail/' + posting_id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeletePost = async (posting_id) => {
    try {
      const { error } = await supabase.from('postings').delete().eq('posting_id', posting_id);

      if (error) {
        console.error('포스팅 삭제 중 에러 발생:', error);
        return;
      } 
          setPosts((posts)=> posts.filter((post) => post.posting_id !== posting_id));
      }
     catch(e) {
      console.log(e);
    }
    
  };

  return (
    <Container>
      <ButtonContainer>
        <div></div> {/* 왼쪽에 빈 공간 */}
        <CenterButton onClick={() => navigate('/')}></CenterButton>
        <div>
          <Button onClick={() => navigate('/mypage')}>MyPage</Button>
          <LogoutButton />
        </div>
      </ButtonContainer>
      <CardContainer>
        {posts.map((post) => {
          return (
            <Card key={post.posting_id}>
              <div onClick={() => postingClick(post.posting_id)}>
              <CardImage
                src={post.image}
                alt={post.title}
                onError={(e) =>
                  (e.target.src =
                    'https://sdkvrrggsuuhvxrvsobx.supabase.co/storage/v1/object/public/avatars/avatar_1725281697916.png')
                }
              />
              <CardContent>
                <Title>{post.title}</Title>
                <Info>{post.content}</Info>
                <Info>작성일 : {post.date}</Info>
                <Info>작성자 : {post.users ? post.users.nick_nm : '익명의 사용자'}</Info>
           
              </CardContent>
              </div>
    
              {post.id === session.user.id && (
                    <button onClick={() => handleDeletePost(post.posting_id)}>삭제</button>
                )}
            </Card>
          );
        })}
      </CardContainer>
      <AddButton onClick={() => navigate('/mainnewsfeedwrite')}>+</AddButton>
    </Container>
  );
};

export default Newsfeed;

const AddButton = styled.button`
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  margin-left: auto;
  font-size: 20px;
  font-weight: 700;

  /* 하단에 붙어있게 */
  position: fixed;
  bottom: 50px;
  right: 50px;
  justify-content: center;
  text-align: center;
`;
