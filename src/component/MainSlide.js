import React, { useState, useEffect } from "react";
import "../App.css";

const SlideShow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 이미지 전환 간격 (2초)

    return () => clearInterval(intervalId);
  }, [images]);

  const handlePrevClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="mainSlide">
      <div className="previousButton">
        <button onClick={handlePrevClick}> &lt; </button>
      </div>
      <div className="imgDiv">
        <img src={images[currentImageIndex]} alt="Slide" />
      </div>

      <div className="nextButton">
        <button onClick={handleNextClick}> &gt; </button>
      </div>
    </div>
  );
};

const SlideShowContainer = () => {
  const slideImageUrls = [
    "http://www.kopis.or.kr/upload/pfmPoster/PF_PF226641_230925_144508.gif",
    "http://www.kopis.or.kr/upload/pfmPoster/PF_PF227080_231005_144935.gif",
    "http://www.kopis.or.kr/upload/pfmPoster/PF_PF226888_231004_094736.gif",
  ];

  return <SlideShow images={slideImageUrls} />;
};

export default SlideShowContainer;
