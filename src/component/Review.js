import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Review() {
  const [reviews, setReviews] = useState([]); // 후기 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const reviewsPerPage = 10; // 한 페이지에 보여질 후기 수

  // 예시로 후기 데이터를 상태에 추가
  useEffect(() => {
    // 이 부분에서 후기 데이터를 가져오는 API를 호출하여 상태에 설정
    const sampleReviews = [
      {
        product: "상품명 1",
        content: "후기 내용 1",
        date: "작성일 1",
      },
      {
        product: "상품명 2",
        content: "후기 내용 2",
        date: "작성일 2",
      },
      // 나머지 후기 데이터도 추가
    ];
    setReviews(sampleReviews);
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div className="Review">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h3 style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
          나의 후기 관리
        </h3>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>
          고객님께서 남겨주신 후기를 확인하실 수 있습니다.
          <br />
          운영정책에 위반되거나, 후기의 성격에 맞지 않는 글은 고객님께 사전 통보
          없이 삭제될 수 있습니다.
        </h4>
      </div>
      {currentReviews.length > 0 ? (
        <div>
          <table className="ReInfo">
            <thead>
              <tr>
                <th>상품명</th>
                <th>후기내용</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review, index) => (
                <tr key={index}>
                  <td>{review.product}</td>
                  <td>{review.content}</td>
                  <td>{review.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>작성한 후기가 없습니다.</p>
        </div>
      )}
      <div className="Pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(reviews.length / reviewsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>
    </div>
  );
}

export default Review;
