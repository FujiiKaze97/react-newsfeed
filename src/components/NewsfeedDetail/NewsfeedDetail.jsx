import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../../supabase';
import { Container, Card, CardImage, CardContent, Title, Info, Button, ButtonContainer, CardContainer, CommentContainer, CommentForm, CommentList, CommentItem } from './NewsfeedDetailStyle';
import LogoutButton from '../LogoutButton';
import { SessionContext } from '../../context/SessionContext';

const NewsfeedDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user) {
        const { data: postData, error: postError } = await supabase
          .from('postings')
          .select('*')
          .eq('posting_id', id)
          .single();

        if (postError) {
          console.error('Error fetching post:', postError);
        } else {
          setPost(postData);
        }

        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select('*')
          .eq('posting_id', id);

        if (commentsError) {
          console.error('Error fetching comments:', commentsError);
        } else {
          setComments(commentsData);
        }
      }
    };
    fetchData();
  }, [session, id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          posting_id: id,
          user_id: session.user.id,
          content: newComment,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Error adding comment:', error);
    } else {
      setComments([...comments, ...data]);
      setNewComment('');
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  const writeUser = post.user_id ? post.user_id.split("@")[0] : "익명의 사용자";

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={() => navigate('/')}>어서오시개!</Button>
        <Button onClick={() => navigate('/mypage')}>마이 프로필</Button>
        <Button onClick={() => navigate('/mainnewsfeedwrite')}>글쓰기</Button>
        <LogoutButton />
      </ButtonContainer>
      <CardContainer>
        <Card key={post.posting_id}>
          <CardImage
            src={post.image}
            alt={post.title}
            onError={(e) => e.target.src = 'https://sdkvrrggsuuhvxrvsobx.supabase.co/storage/v1/object/public/avatars/avatar_1725281697916.png'}
          />
          <CardContent>
            <Title>{post.title}</Title>
            <Info>{post.content}</Info>
            <Info>작성일 : {post.date}</Info>
            <Info>작성자 : {writeUser}</Info>
          </CardContent>
        </Card>
      </CardContainer>
      <CommentContainer>
        <h3>댓글</h3>
        <CommentForm>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="댓글을 작성하세요..."
            rows="4"
          />
          <button onClick={handleCommentSubmit}>댓글 남기기</button>
        </CommentForm>
        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <p>{comment.content}</p>
              <p>작성자: {comment.user_id}</p>
              <p>작성일: {new Date(comment.created_at).toLocaleString()}</p>
            </CommentItem>
          ))}
        </CommentList>
      </CommentContainer>
    </Container>
  );
};

export default NewsfeedDetail;
