import { useNavigate } from 'react-router-dom';
import GetNewsfeed from '../components/Newsfeed/Newsfeed';

const MainNewsfeed = () => {
  // const navigate = useNavigate();
  // GetNewsfeed('s77772005');

  return (
    <DexContainer className="dex-container">
      <Dashboard />
      <PokemonList />
    </DexContainer>
    // <div>

    //   <h1>허허 메인화면 이올시다.</h1>
    //   <br></br>
    //   <br></br>
    //   <button
    //     onClick={() => {
    //       navigate('/mainnewsfeeddetail');
    //     }}
    //   >
    //     메인화면 자세한 상세페이지 뉴스피드 클릭 이동
    //   </button>

    //   <br></br>
    //   <br></br>

    //   <button
    //     onClick={() => {
    //       navigate('/mainnewsfeedwrite');
    //     }}
    //   >
    //     메인화면 뉴스피드 작성 페이지로 이동 이미지 등록되야합니다
    //   </button>
    //   <br></br>
    //   <br></br>
    //   <button
    //     onClick={() => {
    //       navigate('/mainnewsfeedwrite');
    //     }}
    //   >
    //     마이페이지로 이동
    //   </button>
    // </div>
  );
};

export default MainNewsfeed;
