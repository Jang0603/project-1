const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const xml2js = require("xml2js");
const mysql = require("mysql2");
const codes = [];
const datas = [];

const dbconfig = {
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "show_data",
};

const db = mysql.createPool(dbconfig);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post("/text", async (req, res) => {
  //데이터 받는 곳
  const code = req.body.name;
  codes.push(code);
});

app.get('/getDB', async (req, res) => {
  const sql = 'SELECT * FROM show_info';

  db.query(sql, (err, results) => {
    if(err){
      console.error(err);
      return res.status(500).json({error: '내부 서버 에러'});
    }
    res.json(results);
  });
});

app.get('/getShowInfo/:ID', async (req, res) => {
  const location = req.params.ID;
  console.log('getshowinfo location:', location);
  try {
    const serviceKey = '8cd44b00e6b7438ebee27dfb9f4cdf16';
    const response = await axios.get(`http://www.kopis.or.kr/openApi/restful/pblprfr?service=${serviceKey}&stdate=20230901&eddate=20231230&cpage=1&rows=5&prfstate=02&signgucode=${location}&signgucodesub=&kidstate=N`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/getShowList/:ID", async (req, res) => {
  const location = req.params.ID;
  console.log('getshowlist location:', location);
  try {
    datas.splice(0);
    const serviceKey = "8cd44b00e6b7438ebee27dfb9f4cdf16";
    const fetchDataPromises = codes.map((code) =>
      axios.get(
        `http://www.kopis.or.kr/openApi/restful/pblprfr/${code}?service=${serviceKey}`
      )
    );

    const responses = await Promise.all(fetchDataPromises);
    datas.push(...responses.map((response) => response.data));

    const parser = new xml2js.Parser({ explicitArray: false });
    for (let i = 0; i < datas.length; i++) {
      parser.parseString(datas[i], (err, result) => {
        if (err) {
          console.error("Failed to parse XML:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        try {
          var sql = "SELECT COUNT(*) AS count FROM show_info WHERE show_ID = ?";
          db.query(sql, [result.dbs.db.mt20id], function (err, sql_result) {
            if (err) throw err;
            console.log('PK 중복검사');
            if (sql_result[0].count === 0) {   // 이미 존재하는 ID는 차단
              console.log('데이터 삽입 성공');
              var sql = "INSERT INTO show_info VALUES (?)";
              var values = [
                result.dbs.db.mt20id,
                result.dbs.db.prfnm,
                location,
                result.dbs.db.fcltynm,
                result.dbs.db.prfpdfrom,
                result.dbs.db.prfpdto,
                result.dbs.db.pcseguidance,
                result.dbs.db.poster,
                100,
                result.dbs.db.dtguidance,
                result.dbs.db.prfcast,
              ];

              db.query(sql, [values], function (err, sql_result2) {
                if (err) throw err;
              });
            }
            else{
              console.log('PK 중복 에러');
            }
            console.log('---------------------');
          });
        } catch (error) {
          console.error("데이터 삽입 실패:", error);
          return res.status(500).json({ error: "내부 서버 오류" });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});