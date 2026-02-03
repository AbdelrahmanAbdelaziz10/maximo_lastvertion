import { useState, useEffect } from 'react';

export const useFetch = (type,name) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url=`http://192.168.0.73:9080/maxrest/oslc/os/REPORTS?oslc.select=*&apikey=7amnj1r0kfgh8q847unrkkces1ftscbgn1uk1al7&oslc.pagesize=5&oslc.format=json&oslc.where=appname="${type}" and reportname="${name}"`
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};