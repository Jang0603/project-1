const express = require("express");
const axios = require('axios');
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const codes = [];
const datas = [];

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.post("/text", async (req, res) => {//데이터 받는 곳
  const code = req.body.name;
  codes.push(code);
});

app.get('/getShowList', async (req, res) => {
  try{
    datas.splice(0);
    const serviceKey = '8cd44b00e6b7438ebee27dfb9f4cdf16';
    const fetchDataPromises = codes.map(code => 
        axios.get(`http://www.kopis.or.kr/openApi/restful/pblprfr/${code}?service=${serviceKey}`)
      );

    const responses = await Promise.all(fetchDataPromises);
    datas.push(...responses.map(response => response.data));  
    res.json(datas);
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});