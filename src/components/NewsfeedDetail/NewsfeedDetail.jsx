import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../../suparbase';
import LogoutButton from '../LogoutButton';

const NewsfeedDetail = () => {
  // const { id } = useParams(); // (1)

  const [post,setPost] = useState();




  useEffect(()=> {
    const fetchData = async () => {
    //   if(id) {
    //   const { data, e } = await supabase.from('postings').select('*').eq('posting_id',id);
    //   if (e) {
    //   } else {
    //     setPost(data);
    //   }
    // };
  }
    fetchData();
  }, [])

  return (
    // <div style={{ border: '1px solid black', marginBottom: '10px' } 
    //       }>
    //         <h5>{post.posting_title}</h5>
    //         <h3>{post.posting_content}</h3>
    //         <h1>작성일 : {post.writed_at}</h1>         
    //       </div>
    <div>
      <h1>test</h1>
      <LogoutButton></LogoutButton>
    </div>
  );
};

export default NewsfeedDetail;
