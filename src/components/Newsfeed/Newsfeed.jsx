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
  CardContainer
} from './NewsfeedStyle'; // 스타일 import
import LogoutButton from '../LogoutButton';
import { SessionContext } from '../../context/SessionContext';

const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user) {
        const { data, error } = await supabase.from('postings').select('*');
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
          const writeUser = post.user_id ? post.user_id.split('@')[0] : '익명의 사용자';

          return (
            <Card key={post.posting_id} onClick={() => postingClick(post.posting_id)}>
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
                <Info>작성자 : {writeUser}</Info>
              </CardContent>
            </Card>
          );
        })}
      </CardContainer>
    </Container>
  );
};

export default Newsfeed;
