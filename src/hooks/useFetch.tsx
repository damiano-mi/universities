import { useEffect, useState } from "react";
import axios from 'axios';

interface University {
  name: string,
  alpha_two_code: string,
  country: string,
  "state-province": string,
  domains: string,
  web_pages: []
}

export default function useFetch(url : string) {

  const [data, setData] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUniversities = async () => {
      setIsLoading(true);
      let isCurrent = true;
      try {
        const response = await axios.get(url);
        const universities = response.data as University[];
        if(isCurrent)
          setData(universities);
      } catch (e: any) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
      return () => {isCurrent = false;}
    };
    fetchUniversities();
  }, [url]);
  return {data,isLoading,error};
}
