import { useEffect } from 'react';
import getPayload from '../../services/api/getUserPayload';
import { useNavigate } from 'react-router';

export default function ChatPage() {
  const navigate = useNavigate();

  useEffect(() => {
    getPayload();

    if (!localStorage.getItem('payload')) {
      navigate('/');
    }
  }, [navigate]);
  return (
    <>
      <h1>This is chat page</h1>
    </>
  );
}
