/** 
* 이메일 인증코드 검증 요청과
* 인증 완료 여부를 관리하는 훅
 */
import { useState } from 'react';
import { api } from '../../../base/utils/fetchUtils';
import { useSnackbar } from '../../../base/provider/SnackbarProvider';

export function useAuthVerifyEmailCode() {

  // [1] 필요 데이터 선언
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState('idle');
  const { showSnackbar } = useSnackbar();

  // [3] 성공/실패 콜백
  const onSuccess = (rp) => {
    setLoading(false);
    setEmailVerified(true);
    setVerifyStatus('verified');
    const msg = rp.message || '이메일 인증이 완료되었습니다.';
    showSnackbar(msg, 'success');
  };

  const onError = (err) => {
    console.error('이메일 인증 실패:', err);
    setLoading(false);
    setEmailVerified(false);
    setVerifyStatus('error');

    const msg =
      err?.response?.data?.message || '인증번호가 올바르지 않습니다.';
    showSnackbar(msg, 'error');
  };

  const onFinally = () => {
    // 로딩은 onSuccess/onError에서 관리
  };

  // [4] REST API 요청 함수
  const handleVerifyEmailCode = (email, code) => {
    if (!email || !code) {
      showSnackbar('이메일과 인증번호를 입력해 주세요.', 'warning');
      return;
    }

    setLoading(true);
    setVerifyStatus('verifying');

    api.post(
      '/auth/join/email/verify',  // 엔드포인트는 백엔드에 맞게 수정
      { onSuccess, onError, onFinally },
      { email, code }
    );
  };

  // [5] 반환
  return {
    loading,
    emailVerified,
    verifyStatus,
    setEmailVerified,
    handleVerifyEmailCode,
  };
}