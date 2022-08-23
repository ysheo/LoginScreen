import React, { useState, useRef } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginComplete from './LoginComplete';
import {Sign} from './fetch';

export default function Auth (props) { 
  let [authMode, setAuthMode] = useState("signin")
  const valueRef = useRef([]) //creating a refernce for TextField Component
  // const onTextBox = (e) =>{
  //   console(e.target.value);
  // }

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const onSignUp = async () => {  
    if (valueRef.current[0].value?.length <= 0){
      alert("이름을 입력해주세요.");
      return;
    } else if (valueRef.current[1].value?.length <= 0){
      alert("ID를 입력해주세요.");
      return;
    } else if (valueRef.current[2].value?.length <= 0){
      alert("비밀번호를 입력해주세요.");
      return;
    }
    
    var params = {
      "id": valueRef.current[1].value  ,
      "password": valueRef.current[2].value,
      "name": valueRef.current[0].value
    };

    //console.log(params);

    const sign = await Sign('/signup',params);
    alert(sign)
    if(sign?.includes('성공')) {
      window.location.reload();
    }
    // var sql = require('mssql');  
    // sql.connect(config, function(err){
    //   if(err){
    //       return console.error('error : ', err);
    //   }
    //   alert('MSSQL 연결 완료')
    // })

    //alert(config)
  }

  const onSignIn = async() => {  
    var params = {
      "id": valueRef.current[0].value  ,
      "password": valueRef.current[1].value,
    };

    //console.log(params);

    const sign = await Sign('/login',params);
    // console.log(sign[0])
    if (sign?.[0]?.Count  > 0) {
      alert('로그인이 완료 되었습니다.')
      window.location ='http://www.hyundaiwelding.com/eng/hdw/index';
    } else {
      alert('아이디나 패스워드가 잘못되었습니다. 다시 로그인 해주세요.');      
    }
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>ID</label>
              <TextField
                inputRef={el => (valueRef.current[0] = el)}
                type="id"
                className="form-control mt-1"
                size="small"
                placeholder="Enter ID"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <TextField
                inputRef={el => (valueRef.current[1] = el)}
                type="password"
                className="form-control mt-1"
                size="small"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <Button variant="contained" className="btn btn-primary" onClick = {onSignIn}>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <TextField
             inputRef={el => (valueRef.current[0] = el)}
              type="name"
              className="form-control mt-1"
              size="small"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>ID</label>
            <TextField      
              inputRef={el => (valueRef.current[1] = el)}        
              type="id"
              className="form-control mt-1"
              size="small"
              placeholder="ID"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <TextField
              inputRef={el => (valueRef.current[2] = el)}
              type="password"
              className="form-control mt-1"
              size="small"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button variant="contained" className="btn btn-primary" onClick={onSignUp}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}