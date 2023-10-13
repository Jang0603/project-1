import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetShowCode = () => {
  const [showData, setShowData] = useState(null);
  const [error, setError] = useState(null);
  const [titles, setTitles] = useState([]);
  
  useEffect(() => {
    // 서버의 /getShowInfo 엔드포인트로 GET 요청 보내기
    axios
      .get('http://localhost:3001/getShowInfo')
      .then((response) => {
        setShowData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to fetch data');
      });
  }, []); // Empty dependency array to mimic componentDidMount

  const onClick = () => {
    titles.forEach(value => {
      const mt20id = {
        name: value
      }
      fetch('http://localhost:5000/text', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(mt20id),
      });
    });
  }

  useEffect(() => {
    if (showData) {
      let parseXML = new DOMParser();
      let xmlDoc = parseXML.parseFromString(showData, 'text/xml');
      let name = xmlDoc.querySelectorAll('dbs db mt20id');

      const newTitles = Array.from(name).map(value => value.firstChild.nodeValue);
      setTitles(newTitles);
    }
  }, [showData]);

  return (
    <div>
      <button onClick={onClick}>데이터 받아오기</button>
    </div>
  );
}

export default GetShowCode;