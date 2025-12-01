import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils"
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../base/stores/useAuthStore";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

// 초기 입력 데이터 상태 상수 값
const INITIAL_AUTH_LOGIN_RQ = { email: '', password: '' }

export function useAuthLogin() {

  // [1] 필요 데이터 선언
  const [ authloginRq, setAuthLoginRq ] = useState(INITIAL_AUTH_LOGIN_RQ) // 로그인 데이터
  const [ authloginRp, setAuthLoginRp ] = useState(null) // 요청 결과 데이터
  const { showSnackbar } = useSnackbar() // 스낵바 전역 context
  const navigate = useNavigate() // 리다이렉트를 위한 navigate hook
  const { login } = useAuthStore() // 로그인 전역 데이터


  // [2] 필요 함수 선언
  // 입력 데이터 상태 변경 함수
  const changeAuthLoginRq = rq => setAuthLoginRq(prev => ({ ...prev, ...rq }))


  // [3] 성공/실패 콜백 함수 정의
  const onSuccess = rp => { // 성공
    
    setAuthLoginRp(rp)
    login(rp.data)
    showSnackbar(rp.message, 'success')

    // 스낵바 출력 후, 데이터 초기화
    setTimeout(() => {
      navigate('/')
    }, 300)
  }
  
  const onError = rp => { // 실패 
  }
  const onFinally = () => { // 마지막 실행 
  }

  // [4] REST API 요청 함수 정의
  const handleLogin = () => {

    setAuthLoginRp(null) // 응답 데이터 초기화
    api.post('/login', { onSuccess }, authloginRq)
  }


  // [5] 반환
  return {
    authloginRq, authloginRp,
    changeAuthLoginRq, handleLogin
  }

}

