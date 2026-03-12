import { useEffect, useState } from 'react';
import URL from '../constants/constants';
import type ProfileData from '../types/apiData';

export default function useFetchData(path: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState<ProfileData | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      setIsLoading(true);

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
    };

    fetchData();
  }, [path]);

  return { isLoading, apiData, serverError };
}
