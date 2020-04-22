import React, { useState, useEffect, useContext } from 'react';
import useHttp from '../hooks/http.hook';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export default function CreatePage() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (e: any) => {
    if (e.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` },
        );
        console.log(data);
        history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };
  return (
    <div className="container">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            type="text"
            placeholder="Paste the link"
            id="link"
            value={link}
            // className="form-control"
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Link</label>
        </div>
      </div>
    </div>
  );
}
