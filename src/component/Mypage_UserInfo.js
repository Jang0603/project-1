import Button from "@mui/material/Button";
import { color } from "framer-motion";
import React from "react";
import "../css/MyPage.css";

function UserInfo() {
  return (
    <>
      <div className="UserInfodiv">
        <h3>회원정보수정</h3>
        <div className="h4div">
          <h4>
            회원님은 <span style={{ color: "red" }}>'일반회원'</span>이십니다.
          </h4>
        </div>
        <div>
          <table className="UserTable">
            <caption>회원 정보 수정 내용</caption>
            <colgroup>
              <col style={{ width: "160px" }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">아이디</th>
                <td>
                  asa*****@naver.com
                  <p className="fs12_v2 color_gray">
                    <span id="agreeMail" className="checkbox">
                      <input
                        type="checkbox"
                        id="agree_mail"
                        name="agree_mail"
                      />
                    </span>
                    <label htmlFor="agree_mail">
                      <span
                        style={{
                          fontSize: "12px",
                          letterSpacing: "-.5px",
                          color: "#62676c",
                        }}
                      >
                        홍보성 정보수신 동의
                      </span>
                    </label>
                  </p>
                </td>
              </tr>
              <tr>
                <th scope="row">비밀번호</th>
                <td>
                  <Button
                    sx={{
                      border: "1px solid #000",
                      color: "black",
                      fontSize: "12px",
                      marginBottom:"10px",
                      marginTop:"10px"
                    }}
                  >
                       비밀번호 변경   <br />
                  </Button>
                </td>
              </tr>
              <tr>
                <th scope="row">   <br />연락처    <br />   <br /></th>
             
                <td className="number">010******66</td>
              </tr>
              <tr>
                <th scope="row">   <br />주소   <br />   <br /></th>
                <td>***</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="U-Button">
          <Button
            sx={{
              "&:hover": { color: "white", backgroundColor: "black" },
              border: "1px solid #000",
              color: "white",
              backgroundColor: "black",
              fontSize: "2opx",
              textAlign: "center",
            }}
          >
            회원정보 수정
          </Button>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
