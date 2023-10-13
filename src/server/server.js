const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001; 

// CORS 미들웨어 설정
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// API 엔드포인트
app.get('/getShowInfo', async (req, res) => {
  try {
    const serviceKey = '8cd44b00e6b7438ebee27dfb9f4cdf16';
    const response = await axios.get(`http://www.kopis.or.kr/openApi/restful/pblprfr?service=${serviceKey}&stdate=20230901&eddate=20231030&cpage=1&rows=5&prfstate=02&signgucode=11&signgucodesub=1111&kidstate=N`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});