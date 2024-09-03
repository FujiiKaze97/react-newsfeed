import React from 'react';
import LogoutButton from '../components/LogoutButton';
import NewsfeedDetail from '../components/NewsfeedDetail/NewsfeedDetail';


const MainNewsfeedDetail = () => {
  // const  id  = useParams(); // (1)

  // console.log(id);


  return (
    <div>
           <NewsfeedDetail />
           <LogoutButton></LogoutButton>
    </div>
  );
};

export default MainNewsfeedDetail;
