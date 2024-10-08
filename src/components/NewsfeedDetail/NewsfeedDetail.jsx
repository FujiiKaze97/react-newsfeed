import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../../supabase';
import {
  Card,
  CardContent,
  Title,
  Info,
  CardContainer,
  CommentContainer,
  CommentForm,
  CommentList,
  CommentItem,
  CommentHeader,
  TextContainter,
  DetailContainer,
  CardImage
} from './NewsfeedDetailStyle';
import LogoutButton from '../LogoutButton';
import { SessionContext } from '../../context/SessionContext';
import { Button, ButtonContainer, Container,CenterButton } from '../Newsfeed/NewsfeedStyle';
import LazyImage from '../ImgRender/LazyImage';

const NewsfeedDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user) {
        const { data: postData, error: postError } = await supabase
          .from('postings')
          .select('*, users(nick_nm)')
          .eq('posting_id', id)
          .single();

        if (postError) {
          console.error('Error fetching post:', postError);
        } else {
          setPost(postData);
        }

        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select('*, users(nick_nm)')
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
    const newData = {
      posting_id: id,
      id: session.user.id,
      contents: newComment,
      writed_at: new Date().toISOString()
    };
    const { data, error } = await supabase.from('comments').insert([newData]);

    if (error) {
      console.error('Error adding comment:', error);
    } else {
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*, users(nick_nm)')
        .eq('posting_id', id);
      setComments(commentsData);
      setNewComment('');
    }
  };

  const updateClick = (posting_id) => {
    try {
      navigate('/mainnewsfeedupdate/' + posting_id);
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleDeletePost = async (id) => {
    // 삭제 확인 팝업창을 띄웁니다.
    const isConfirmed = window.confirm('이 포스팅을 삭제하시겠습니까?');

    // 사용자가 "취소"를 클릭한 경우, 삭제 작업을 중단합니다.
    if (!isConfirmed) {
      return; // 삭제 작업을 중단합니다.
    }

    // 댓글 삭제 작업을 진행합니다.
    const { error } = await supabase.from('postings').delete().eq('posting_id', id);

    if (error) {
      console.error('댓글 삭제 중 에러 발생:', error);
    } else {
      // 댓글 삭제 후, 최신 댓글 리스트를 다시 불러옵니다.
      const { data: postData } = await supabase
        .from('postings')
        .select('*, users(nick_nm)')
        .eq('posting_id', id);

      setComments(postData); // 상태를 업데이트하여 화면에 반영합니다.
      navigate('/');
    }
  };



  const handleDeleteComment = async (commentId) => {
    // 삭제 확인 팝업창을 띄웁니다.
    const isConfirmed = window.confirm('정말 이 댓글을 삭제하시겠습니까?');

    // 사용자가 "취소"를 클릭한 경우, 삭제 작업을 중단합니다.
    if (!isConfirmed) {
      return; // 삭제 작업을 중단합니다.
    }

    // 댓글 삭제 작업을 진행합니다.
    const { error } = await supabase.from('comments').delete().eq('comments_id', commentId);

    if (error) {
      console.error('댓글 삭제 중 에러 발생:', error);
    } else {
      // 댓글 삭제 후, 최신 댓글 리스트를 다시 불러옵니다.
      const { data: updatedComments } = await supabase
        .from('comments')
        .select('*, users(nick_nm)')
        .eq('posting_id', id);

      setComments(updatedComments); // 상태를 업데이트하여 화면에 반영합니다.
    }
  };


  return (
    <>
    <Container>
      <ButtonContainer>
        <div></div> {/* 왼쪽에 빈 공간 */}
        <CenterButton onClick={() => navigate('/')}></CenterButton>
        <div>
          <Button onClick={() => navigate('/mypage')}>MyPage</Button>
          <LogoutButton />
        </div>
      </ButtonContainer>
    </Container>
    <DetailContainer>
      <CardContainer>
        <Card key={post?.posting_id}>
          <LazyImage
            src={post?.image}
            alt={post?.title}
            onError={(e) =>
              (e.target.src =
                'https://sdkvrrggsuuhvxrvsobx.supabase.co/storage/v1/object/public/avatars/avatar_1725329229844.png')
            }
          />
           <CardContent>
            <div>
            <Title>{post?.title}</Title>
            <Info>
              <h2>작성자 : {post?.users.nick_nm}</h2> <h3>작성일 : {post?.date}</h3>
              </Info>
            <br></br><br></br>
            </div>
            <h3>{post?.content}</h3>    
          </CardContent>
        </Card>
      </CardContainer>
      {post?.id === session?.user.id && (
      <TextContainter>
          <h3 style= {{cursor:"pointer"}} onClick={() => handleDeletePost(id)}>삭제</h3>
          <h3 style= {{cursor:"pointer"}}  onClick={() => updateClick(id)}>수정</h3>
      </TextContainter>
        )}
      <CommentContainer>
        <CommentHeader>Comments</CommentHeader>
        <CommentForm>
          <textarea value={newComment} onChange={handleCommentChange} placeholder="댓글을 작성하세요." rows="4" />
          <button style={{backgroundColor : "#343a40"}}onClick={handleCommentSubmit}>댓글 남기기</button>
        </CommentForm>
        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.comments_id}>
            <div style={{justifyContent: 'space-between', display:"flex"}}>
            <h3>{comment.contents}</h3>
            {comment.id === session.user.id && (
                <Info onClick={() => handleDeleteComment(comment.comments_id)}>삭제</Info>
              )}
            </div>
            <br></br>
            <br></br>

            <div style={{justifyContent: 'space-between', display:"flex"}}>
              <h3 style={{fontWeight:"bold"}}>작성자 : {comment.users.nick_nm}</h3>
             <Info>작성일 : {new Date(comment.writed_at).toLocaleString()}</Info>
            </div>
      
            </CommentItem>
          ))}
        </CommentList>
      </CommentContainer>
    </DetailContainer>
  </>
  );
};

export default NewsfeedDetail;
