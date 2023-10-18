import React, { useState, useEffect } from "react";
import axios from "axios";

const GetShowData = () => {
  const [showList, setShowList] = useState([]);
  const [showData, setShowData] = useState([]);

  useEffect(() => {
    // 서버의 /getShowInfo 엔드포인트로 GET 요청 보내기
    axios
      .get("http://localhost:5000/getShowList")
      .then((response) => {
        setShowList(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Error handling logic here
      });
  }, []); // Empty dependency array to mimic componentDidMount

  useEffect(() => {
    const tempShowData = [];
    for (let i = 0; i < showList.length; i++) {
      const parseXML = new DOMParser();
      const xmlDoc = parseXML.parseFromString(showList[i], "text/xml");

      const show_name = xmlDoc.querySelector("dbs db prfnm");
      const show_code = xmlDoc.querySelector("dbs db mt20id");
      const show_price = xmlDoc.querySelector("dbs db pcseguidance");
      const show_location = xmlDoc.querySelector("dbs db fcltynm");
      const show_time = xmlDoc.querySelector("dbs db dtguidance");
      const show_poster = xmlDoc.querySelector("dbs db poster");

      const temp = {
        name: show_name.firstChild.nodeValue,
        code: show_code.firstChild.nodeValue,
        price: show_price.firstChild.nodeValue,
        location: show_location.firstChild.nodeValue,
        time: show_time.firstChild.nodeValue,
        poster: show_poster.firstChild.nodeValue,
      };
      tempShowData.push(temp);
    }
    setShowData(tempShowData);
  }, [showList]);

  return (
    <div className="showList">
      <ul className="locationUl">
        <li>서울</li>
        <li>경기/인천</li>
        <li>대구/경북</li>
        <li>부산/경남</li>
        <li>광주/전라</li>
        <li>제주</li>
      </ul>
      <br></br>
      <br></br>
      <ul>
        {showData.map((datas, index) => (
          <li key={index}>
            <div className="showDiv">
              <p><img src={datas.poster} alt="공연포스터" /></p>
              <p><strong>제목</strong>: {datas.name}</p>
              <p><strong>가격</strong>: {datas.price}</p>
              <p><strong>장소</strong>: {datas.location}</p>
              <p><strong>공연시간</strong>: {datas.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetShowData;