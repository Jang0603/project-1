import React, {useState} from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import GetShowCode from "../api/GetShowCode";
import GetShowData from "../api/GetShowData";
import MainSlide from "./MainSlide";
import '../App.css';

const Main = () => {

  const [menuNumber, setMenuNumber] = useState(0);

  const handleMenu = (e) => {
    setMenuNumber(e.target.value);
  }

  return (
    <div className="main">
      <div style={{height:'88vh' }}>
        <Navigation />
        <GetShowCode />

        <div className="mainMenu">
          <ul>
            <li onClick={handleMenu} value="0">메인</li>
            <li onClick={handleMenu} value="1">지역별</li>
            <li onClick={handleMenu} value="2">할인</li>
          </ul>
        </div>

        <div style={{height:'100px' }}></div>

        <div className="selectedMenu">
          {menuNumber === 0 && <MainSlide/>}
          {menuNumber === 1 && <GetShowData/>}
          {menuNumber === 2 && <div>할인</div>}
        </div>
      </div>
          
      <Footer />
    </div>
  );
};

export default Main;
