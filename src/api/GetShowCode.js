import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetShowCode = () => {
  const [showData, setShowData] = useState(null);
  const [error, setError] = useState(null);
  const [titles, setTitles] = useState([]);
  const [showList, setShowList] = useState([]);
  const [location, setLocation] = useState(() => {
    const storedLocation = localStorage.getItem('location');
    return storedLocation ? storedLocation : '11';
  });
  
  useEffect(() => {
    localStorage.setItem('location', location);
  })

  useEffect(() => {
    // 서버의 /getShowInfo 엔드포인트로 GET 요청 보내기
    axios
      .get(`http://localhost:5000/getShowInfo/${location}`)
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

  const onClick2 = () => {
    axios
      .get(`http://localhost:5000/getShowList/${location}`)
      .then((response) => {
        setShowList(response.data);
        console.log('showList:', showList);
      })
      .catch((error) => {
        console.error(error);
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

  const handle_location = (e) => {
    setLocation(e.target.value);
  }

  return (
    // 11:서울, 26:부산광역시, 27:대구광역시, 28:인천광역시, 29:광주광역시, 41:경기도, 45:전라북도, 46:전라남도, 47:경상북도, 48:경상남도, 50:제주도
    <div>
      <select onChange={handle_location} value={location}>
        <option value="11">서울</option>
        <option value="26">부산</option>
        <option value="27">대구</option>
        <option value="28">인천</option>
        <option value="29">광주</option>
        <option value="41">경기</option>
        <option value="45">전북</option>
        <option value="46">전남</option>
        <option value="47">경북</option>
        <option value="48">경남</option>
        <option value="50">제주</option>
      </select>

      <button onClick={onClick}>데이터 받아오기</button>
      <button onClick={onClick2}>DB저장</button>
    </div>
  );
}

export default GetShowCode;