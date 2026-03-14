import useFetchData from '../../../../../hooks/useFetchData';
import { useNavigate } from 'react-router';

export default function Contacts() {
  const { isLoading, serverError, apiData } = useFetchData(
    `dashboard/${localStorage.getItem('uid')}/contacts`,
  );
  const navigate = useNavigate();

  if (serverError) {
    navigate('/');
  }
  return (
    <div>
      {isLoading ? (
        <h1>LOADING</h1>
      ) : (
        <ul>
          {apiData?.contactsProfiles?.map((contact) => (
            <li key={contact.id}>{contact.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// <div>{isLoading ? <h1>LOading</h1> : <ul>{apiData?.contacts}</ul>}</div>
