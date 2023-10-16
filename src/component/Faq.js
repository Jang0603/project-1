import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function FAQ() {
  const [faqs, setFAQs] = useState([]); // FAQ 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const faqsPerPage = 10; // 한 페이지에 보여질 FAQ 수

  // 예시로 FAQ 데이터를 상태에 추가
  useEffect(() => {
    // 이 부분에서 FAQ 데이터를 가져오는 API를 호출하여 상태에 설정
    const sampleFAQs = [
      {
        question: "질문 1",
        answer: "답변 1",
      },
      {
        question: "질문 2",
        answer: "답변 2",
      },
      // 나머지 FAQ 데이터도 추가
    ];
    setFAQs(sampleFAQs);
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastFAQ = currentPage * faqsPerPage;
  const indexOfFirstFAQ = indexOfLastFAQ - faqsPerPage;
  const currentFAQs = faqs.slice(indexOfFirstFAQ, indexOfLastFAQ);

  return (
    <div className="FAQ">
      <div style={{ borderBottom: "2px solid #ccc" }}>
        <h3 style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
          자주 묻는 질문 (FAQ)
        </h3>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>
          자주 묻는 질문을 확인하실 수 있습니다.
          <br />
          궁금한 내용을 클릭하여 답변을 확인하세요.
        </h4>
      </div>
      <div>
        <table className="FAQInfo">
          <thead>
            <tr>
              <th>질문</th>
              <th>답변</th>
            </tr>
          </thead>
          <tbody>
            {currentFAQs.map((faq, index) => (
              <tr key={index}>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="Pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(faqs.length / faqsPerPage)}
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

export default FAQ;
