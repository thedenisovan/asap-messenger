import { useEffect, useState } from 'react';
import URL from '../constants/constants';
import type ProfileData from '../types/apiData';

export default function useFetchData(path: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState<ProfileData | null>(null);
  const [serverError, setServerError] = useState<unknown | string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const response = await fetch(`${URL.BASE_URL}${path}`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
        });

        if (!response.ok)
          setServerError(`Error exit status ${response.status}`);

        const result = await response.json();

        setApiData(result);
        setIsLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) setServerError(error);
        else setServerError('Unknown error');
      }
    };

    fetchData();
  }, [path]);

  return { isLoading, apiData, serverError };
}
