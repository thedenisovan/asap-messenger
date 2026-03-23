import { useEffect, useState } from 'react';
import URL from '../constants/constants';
// import type { ContactProfile } from '../types/apiData';

export default function useFetchData<T>(path: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState<T | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');

    const fetchData = async () => {
      setIsLoading(true);
      // uid is initially set to 0 in local storage
      // after user signs in ti is changed to new uid(user id)
      if (uid && uid !== '0') {
        try {
          const response = await fetch(`${URL.BASE_URL}${path}`, {
            headers: {
              'Content-Type': 'application/json',
              authorization: 'Bearer ' + token,
            },
          });

          if (!response.ok) {
            setServerError(`Error exit status ${response.status}`);
          } else {
            const result = await response.json();
            setApiData(result);
          }

          setIsLoading(false);
        } catch (error) {
          if (error instanceof Error) setServerError(String(error.message));
          else setServerError('Unknown error');
        }
      }
    };

    fetchData();
  }, [path]);

  return { isLoading, apiData, serverError };
}
