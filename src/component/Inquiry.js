import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function ContactUs() {
  const [inquiries, setInquiries] = useState([]); // 1:1 문의 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const inquiriesPerPage = 10; // 한 페이지에 보여질 1:1 문의 수

  // 예시로 1:1 문의 데이터를 상태에 추가
  useEffect(() => {
    // 이 부분에서 1:1 문의 데이터를 가져오는 API를 호출하여 상태에 설정
    const sampleInquiries = [
      {
        subject: "문의 제목 1",
        message: "문의 내용 1",
        date: "문의 일자 1",
      },
      {
        subject: "문의 제목 2",
        message: "문의 내용 2",
        date: "문의 일자 2",
      },
      // 나머지 1:1 문의 데이터도 추가
    ];
    setInquiries(sampleInquiries);
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = inquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);

  return (
    <div className="ContactUs">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h3 style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
          1:1 문의
        </h3>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>
          1:1 문의를 남길 수 있습니다.
          <br />
          문의 내용을 클릭하여 답변을 확인하세요.
        </h4>
      </div>
      <div>
        <table className="ContactUsInfo">
          <thead>
            <tr>
              <th>문의 제목</th>
              <th>문의 내용</th>
              <th>문의 일자</th>
            </tr>
          </thead>
          <tbody>
            {currentInquiries.map((inquiry, index) => (
              <tr key={index}>
                <td>{inquiry.subject}</td>
                <td>{inquiry.message}</td>
                <td>{inquiry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="Pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(inquiries.length / inquiriesPerPage)}
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

export default ContactUs;
