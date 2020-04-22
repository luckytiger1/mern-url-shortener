import React, { useState, useContext, useCallback, useEffect } from 'react';
import useHttp from '../hooks/http.hook';
import AuthContext from '../context/AuthContext';
import Spinner from '../components/Spinner/Spinner';
import LinksList from '../components/LinksList/LinksList';

export default function LinksPage() {
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (error) {
      console.log(error);
    }
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Spinner />;
  }

  return <>{!loading && <LinksList links={links} />}</>;
}
