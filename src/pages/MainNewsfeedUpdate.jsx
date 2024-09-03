import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../supabase';
import { SessionContext } from '../context/SessionContext';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  margin-bottom: 12px;
  background-color: ${({ $variant }) => {
    switch ($variant) {
      case 'upload':
        return '#fc819e';
      case 'submit':
        return '#28a745';
      default:
        return '#007bff';
    }
  }};
  &:hover {
    background-color: ${({ $variant }) => {
      switch ($variant) {
        case 'upload':
          return '#f7418f';
        case 'submit':
          return '#218838';
        default:
          return '#0056b3';
      }
    }};
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
  background-color: #f8f9fa;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 24px;
`;

const InputWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #f7418f;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  resize: vertical;
  &:focus {
    border-color: #f7418f;
  }
`;

export default function MainNewsfeedUpdate() {
  const { posting_id } = useParams();
  const { session } = useContext(SessionContext);
  const [form, setForm] = useState({ title: '', content: '', date: '' });
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePost = async () => {
    if (!form.title || !form.content || !form.date) {
      alert('모든 필드를 채워주세요!');
      return;
    }

    try {
      const { error } = await supabase
        .from('postings')
        .update({ ...form, image, id: session?.user.id })
        .eq('posting_id', posting_id);

      if (error) throw error;

      alert('수정 완료');
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert('수정 실패');
    }
  };

  const handleFileInputChange = async (e) => {
    const [file] = e.target.files;
    if (!file) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.storage.from('avatars').upload(`avatar_${Date.now()}.png`, file);

      if (error) throw error;

      const newImage = `${import.meta.env.VITE_SUPABASE_PROJECT_URL}/storage/v1/object/public/avatars/${data.path}`;
      setImage(newImage);
    } catch (err) {
      console.error(err.message);
      alert('파일 업로드에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const fetchPost = async () => {
    try {
      const {
        data: [postings],
        error
      } = await supabase.from('postings').select().eq('posting_id', posting_id);

      if (error) throw error;

      // if (session?.user.email !== postings.user_email) {
      //   alert('게시물의 작성자가 아닙니다');
      //   navigate('/');
      //   return;
      // }

      const { image, title, content, date } = postings;

      setForm({ title, content, date });
      setImage(image);
    } catch (err) {
      console.error(err);
      alert('포스팅을 불러오는 데 실패했습니다');
    }
  };

  useEffect(() => {
    fetchPost();
  }, [posting_id]);

  return (
    <Container>
      <input type="file" style={{ display: 'none' }} onChange={handleFileInputChange} ref={fileInputRef} />
      <ImageContainer>
        {image ? (
          <Image src={image} alt="Uploaded" />
        ) : (
          <Placeholder>{loading ? 'Uploading...' : 'No Image'}</Placeholder>
        )}
      </ImageContainer>
      <Button $variant="upload" onClick={() => fileInputRef.current.click()}>
        파일 업로드
      </Button>
      <InputWrapper>
        <InputLabel htmlFor="title">제목:</InputLabel>
        <Input id="title" name="title" value={form.title} onChange={handleChange} />
      </InputWrapper>
      <InputWrapper>
        <InputLabel htmlFor="content">내용:</InputLabel>
        <TextArea id="content" name="content" value={form.content} onChange={handleChange} rows="4" />
      </InputWrapper>
      <InputWrapper>
        <InputLabel htmlFor="date">날짜:</InputLabel>
        <Input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
      </InputWrapper>
      <Button $variant="submit" onClick={handleUpdatePost}>
        수정하기
      </Button>
    </Container>
  );
}
