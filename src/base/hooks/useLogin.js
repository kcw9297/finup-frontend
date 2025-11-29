import { useEffect, useState } from "react";
import { api } from "../utils/fetchUtils"
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useSnackbar } from "../provider/SnackbarProvider";

// 초기 입력 데이터 상태 상수 값
const INITIAL_LOGIN_RQ = { email: '', password: '' }

export function useLogin() {

  // [1] 필요 데이터 선언
  const [ loginRq, setLoginRq ] = useState(INITIAL_LOGIN_RQ) // 로그인 데이터
  const [ loginRp, setLoginRp ] = useState(null) // 요청 결과 데이터
  const { showSnackbar } = useSnackbar() // 스낵바 전역 context
  const navigate = useNavigate()

  // 로그인 전역 데이터
  const { login } = useAuthStore()


  // [2] 필요 함수 선언
  // 입력 데이터 상태 변경 함수
  const updateLoginRq = newData => setLoginRq(prev => ({...prev, ...newData}))


  // [3] 성공/실패 콜백 함수 정의
  const onSuccess = rp => {
    
    setLoginRp(rp)
    login(rp.data)
    showSnackbar(rp.message, 'success')

    // 스낵바 출력 후, 데이터 초기화
    setTimeout(() => {
      navigate('/')
    }, 300)
  }

  // [4] REST API 요청 함수 정의
  const handleLogin = () => {

    setLoginRp(null) // 응답 데이터 초기화
    api.post('/login', { onSuccess }, loginRq)
  }


  // [5] 반환
  return {
    loginRq, loginRp,
    updateLoginRq, handleLogin
  }

}

