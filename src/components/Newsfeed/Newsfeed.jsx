import React from 'react';
import { useEffect, useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../suparbase';
import { UserContext } from '../../context/UserContext';
import { Container, Card, CardImage, CardContent, Title, Info } from './NewsfeedStyle'; // 스타일 import
// import {} from "./NewsfeedStyle";

const Newsfeed = () => {
  
  const [posts,setPosts] = useState([]);

  const navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(()=> {
    const fetchData = async () => {
      if(user) {
      const { data, e } = await supabase.from('postings').select('*');
      if (e) {
        console.log(e);
      } else {
        console.log(data);
        setPosts(data);
      }
    };
  }
    fetchData();
  }, [])

  const postingClick = async (posting_id) => {
    try {
        navigate('/mainnewsfeeddetail/'+posting_id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button onClick={() => {
         navigate('/');
      }}>어서오시개!</button>
      <button onClick={() => {
        navigate('/mypage');
      }}>마이 프로필</button>
      {posts.map((post) => {
        return (
          <div key= {post.posting_id} style={{ border: '1px solid black', marginBottom: '10px' } 
          }
          onClick={()=>postingClick(post.posting_id)}>
            <img
              src={post.image}
              alt={post.title}
              style={{ width: '30%', height: '30%', borderRadius: '8px', marginTop: '10px' }}
              onError={(e) => e.target.src = 'https://sdkvrrggsuuhvxrvsobx.supabase.co/storage/v1/object/public/avatars/avatar_1725281697916.png'} // 기본 이미지 URL 설정
            />
            <h1>제목 : {post.title}</h1>
            <h5>작성자 : {post.user_id.split("@")[0]}</h5>
            <h5>{post.posting_content}</h5>
            <h5>작성일 : {post.date}</h5>
     
          </div>
        );
      })} 
    </div>
  );
};

export default Newsfeed;
