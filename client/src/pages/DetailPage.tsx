import React, { useState, useContext, useCallback, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/http.hook';
import Spinner from '../components/Spinner/Spinner';
import LinkCard from '../components/LinkCard/LinkCard';

export default function DetailPage() {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);

  const linkId = (useParams() as any).id;
  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetched);
    } catch (error) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Spinner />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
}
