import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoginMember } from "../../../base/hooks/useLoginMember";
import { showSnackbar } from "../../../base/config/globalHookConfig";
import { api } from "../../../base/utils/fetchUtils";

// 초기 입력 데이터 상태 상수 값
const INITIAL_AUTH_LOGIN_RQ = { email: '', password: '' }

export function useAuthLogin() {

  // [1] 필요 데이터 선언
  const [ loginRq, setLoginRq ] = useState(INITIAL_AUTH_LOGIN_RQ) // 로그인 데이터
  const [ searchParams, setSearchParams ] = useSearchParams() // 검색 파라미터
  const [ loading, setLoading ] = useState(false) // 로그인 로딩 상태
  const { handleLogin: login } = useLoginMember()
  const navigate = useNavigate() // 리다이렉트를 위한 navigate hook


  // [2] 필요 함수 선언
  // 입력 데이터 상태 변경 함수
  const handleChangeLoginRq = rq => setLoginRq(prev => ({ ...prev, ...rq }))


  // [3] 로그인 시도 함수 선언 (REST API)
  const handleLogin = async () => {

    // 성공/실패 콜백 함수 정의
    const onSuccess = rp => { // 성공
      login(rp.data)
      showSnackbar(rp.message, 'success')
      setTimeout(() => {
        const returnUrl = searchParams.get('returnUrl')
        console.log(`리다이렉트 시도: ${returnUrl || '/'}`)
        navigate(returnUrl || '/', { replace: true })
      }, 100)
    }

    // 성공/실패 콜백 함수 정의
    const onError = rp => { // 성공
      showSnackbar(rp.message)
    }

    const onFinally = () => setLoading(false)
    
    // 로딩 상태
    setLoading(true)

    // 로딩 요청 수행
    setLoading(true)
    api.post('/login', { onSuccess, onError, onFinally }, loginRq)
  }


  // [4] 반환
  return {
    loginRq, loading,
    handleChangeLoginRq, handleLogin
  }

}

