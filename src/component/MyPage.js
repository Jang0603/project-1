import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import "../css/MyPage.css";
import Check from "./MyPage_Check";
import Notice from "./MyPage_Notice";
import Review from "./Review";
import UserInfo from "./Mypage_UserInfo";
import FAQ from "./Faq";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ContactUs from "./Inquiry";


const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

function MyPage() {
  const [modalType, setModalType] = useState("Check");

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = (e) => {
    e.stopPropagation(); 
    setModalType();
  };

  return (
    <div>
      <h2>마이페이지</h2>
      <div className="main">
      <div style={{height:'88vh' }}>
        <Navigation />
        </div>
      </div>
      <div className="MyPage">
        <div className="LeftNav">
        <div className="ListPadding">
          <List sx={style} component="nav" aria-label="mailbox folders">
            <br/>
            <ListItem button onClick={() => openModal("UserInfo")}>
              <ListItemText   primary={<span style={{ fontSize:"18px", fontWeight: "bold" }}>회원정보관리</span>} />
            </ListItem>
            <br />
            <Divider />
            <br />
            <ListItem button onClick={() => openModal("Check")}>
              <ListItemText primary={<span style={{ fontSize:"18px", fontWeight: "bold" }}>예매/확인취소</span>} />
            </ListItem>
            <br />
            <Divider />
            <br />
            <ListItem button onClick={() => openModal("Review")}>
              <ListItemText  primary={<span style={{ fontSize:"18px", fontWeight: "bold" }}>나의 후기</span>} />
            </ListItem>
            <br />
            <Divider light />
            <br />
            <ListItem button>
              <ListItemText  primary={<span style={{ fontSize:"18px", fontWeight: "bold" }}>소유기기 인증확인</span>} />
            </ListItem>
            <br />
            <Divider />
            <ListItem button onClick={() => openModal("Notice")}>
              <ListItemText  primary={<span style={{ fontSize:"18px", fontWeight: "bold" }}>공지사항</span>} />
            </ListItem>
            <ListItem button  onClick={() => openModal("Faq")} >
              <ListItemText  primary={<span style={{ fontSize:"18px", fontWeight: "bold" }}>자주묻는질문</span>} />
            </ListItem>
            <ListItem button onClick={() => openModal("Inquery")}>
              <ListItemText  primary={<span style={{ fontSize:"18px", fontWeight: "bold" }}>1:1 문의</span>} />
            </ListItem>
          </List>
          <Divider></Divider>
          </div>
        </div>
        <div className="modal" style={{ display: modalType ? "block" : "none", width:"1000px",height:"100%", margin:"auto",float:"left" }} onClick={closeModal}>
        <div className="modal-content" style={{height:"100%"}} onClick={(e) => e.stopPropagation()}>
          {modalType === "Check" && <Check />}
          {modalType === "UserInfo" && <UserInfo />}
          {modalType === "Review" && <Review />}
          {modalType === "Notice" && <Notice />}
          {modalType === "Faq" && <FAQ />}
          {modalType === "Inquery" && <ContactUs />}
        </div>
      </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MyPage;


