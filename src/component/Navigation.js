import "../css/Navigation.css";

const Navigation = () => {
  return (
    <div className="navigation">
      <span><h1>ticketing</h1></span>  
      <ul>
        <li>
          <a href="/mypage">예매 확인/취소</a>
        </li>
        <li>
            {/* g=로그인 된 상태에서는 마이페이지로 변경 */}
          <a href="/signup">회원가입</a>   
        </li>
        <li>
            {/* g=로그인 된 상태에서는 마이페이지로 변경 */}
          <a href="/login">로그인</a>
        </li>
      </ul>
      
    </div>
  );
};

export default Navigation;
