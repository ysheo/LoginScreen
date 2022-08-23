const express = require('express');
const bodyParser = require('body-parser');
var sql = require('mssql');
var config = {
    user: 'sa',
    password: 'any0628',
    server: 'localhost',
    database: 'HYUNDAI_WELDING',
    stream: true,
    trustServerCertificate: true
}

// const poolPromise = new sql.ConnectionPool(config)
//   .connect()
//   .then((pool) => {
//     console.log("Connected to MSSQL");
//     return pool;
//   })
//   .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

// sql.connect(config, function(err){
//     if(err){
//         return console.error('error : ', err);
//     }
//     console.log('MSSQL 연결 완료')
// });

const app = express(); 
app.use(bodyParser.json());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
//   });

app.post('/signup',(req,res)=>{
    // q = `Insert into UserInfo(ID, Password, Name) Values('${req.body.id}','${req.body.password}','${req.body.name}')`;
    // console.log( q )
    sql.connect(config, err => { 
        if(err){
            throw err ;
        }
        console.log("Connection Successful !")
        q = `IF Not EXISTS (Select * from UserInfo Where ID = '${req.body.id}')
         \n BEGIN 
         \n Insert into UserInfo(ID, Password, Name) Values('${req.body.id}','${req.body.password}','${req.body.name}')
         \n SELECT 0 as Count
         \n END 
         \n ELSE
         \n BEGIN 
         \n SELECT 1 as Count
         \n END`;
        //console.log(q)
        var request = new sql.Request();
        
        request.query(q, (err, recordset) => {
            if(err){
                return console.log('query error :',err)
            }
        });
        
        var result = [];
        request.on('error', function(err){
            console.log(err); 
        })
        .on('row', (row) => {
            result.push(row)
        })
        .on
        ('done', () => { // 마지막에 실행되는 부분
            //console.log('result :', result)
            //console.log(result?.[0]?.Count);
            if (result?.[0]?.Count === 0) res.status(200).json('회원가입에 성공하였습니다.');
            else res.status(400).json('회원가입에 실패하였습니다. ID를 확인해주세요.');
        });

    });
});

app.post('/login',(req,res)=>{
    // q = `Insert into UserInfo(ID, Password, Name) Values('${req.body.id}','${req.body.password}','${req.body.name}')`;
    // console.log( q )
    sql.connect(config, err => { 
        if(err){
            throw err ;
        }
        console.log("Connection Successful !");
        q = `Select Count(*) as Count from UserInfo Where ID = '${req.body.id}' and Password = '${req.body.password}'`;        

        var request = new sql.Request();
        request.query(q, (err, recordset) => {
            if(err){
                return console.log('query error :',err)
            }
        });
        
        var result = [];
        request.on('error', function(err){
            console.log(err); 
        })
        .on('row', (row) => {
            result.push(row)
        })
        .on
        ('done', () => { // 마지막에 실행되는 부분
            //console.log('result :', result)
            res.status(200).json(result)
        });
        
            
    });
});

app.listen(4000, ()=> {
    console.log(`app is running on port 4000`);
});
