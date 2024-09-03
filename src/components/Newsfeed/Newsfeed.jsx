import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../supabase';
import {
  Container,
  Card,
  CardContent,
  Title,
  Info,
  Button,
  ButtonContainer,
  CardContainer
} from './NewsfeedStyle'; // 스타일 import
import LogoutButton from '../LogoutButton';
import { SessionContext } from '../../context/SessionContext';
import LazyImage from '../ImgRender/RenderImg'; // LazyImage import
import { LazyImage } from '../LazyImage'; // 새로 정의한 LazyImage import

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
        <Button onClick={() => navigate('/')}>어서오시개!</Button>
        <Button onClick={() => navigate('/mypage')}>마이 페이지</Button>
        <Button onClick={() => navigate('/mainnewsfeedwrite')}>글쓰기</Button>
        <LogoutButton />
      </ButtonContainer>
      <CardContainer>
        {posts.map((post) => {
          return (
            <Card key={post.posting_id}>
              <div onClick={() => postingClick(post.posting_id)}>
              <LazyImage
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
    </Container>
  );
};

export default Newsfeed;
