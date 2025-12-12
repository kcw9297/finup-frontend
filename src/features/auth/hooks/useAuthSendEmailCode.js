/**
 *  이메일 인증코드 발송 요청과
 *  전송 상태 및 재전송 쿨다운을 관리하는 훅
 */
import { useEffect, useState } from 'react';
import { api } from '../../../base/utils/fetchUtils';
import { useSnackbar } from '../../../base/provider/SnackbarProvider';

const COOLDOWN_SECONDS = 60; // 인증메일 재전송 쿨다운(초)

export function useAuthSendEmailCode() {
  const [loading, setLoading] = useState(false);
  const [emailSendStatus, setEmailSendStatus] = useState('idle');
  // idle | sending | sent | error

  const [cooldown, setCooldown] = useState(0); // 남은 쿨다운(초)

  const { showSnackbar } = useSnackbar();

  // 쿨다운 타이머
  useEffect(() => {
    if (!cooldown) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const onSuccess = (rp) => {
    setEmailSendStatus('sent');
    setLoading(false);

    const msg =
      rp?.message || '인증번호를 발송했습니다. 메일함을 확인해 주세요.';
    showSnackbar(msg, 'success');

    // 전송 성공 시 쿨다운 시작
    setCooldown(COOLDOWN_SECONDS);
  };

  const onError = (err) => {
    console.error('이메일 인증번호 발송 실패:', err);
    setEmailSendStatus('error');
    setLoading(false);

    const msg =
      err?.response?.data?.message ||
      err?.message ||
      '이메일 발송 중 오류가 발생했습니다.';
    showSnackbar(msg, 'error');
  };

  const onFinally = () => {
    // 필요 시 추가 처리
  };

  const handleSendEmailCode = (email) => {
    if (!email) {
      showSnackbar('이메일을 먼저 입력해 주세요.', 'error');
      return;
    }

    if (cooldown > 0) {
      showSnackbar(
        `잠시 후 다시 시도해 주세요. (${cooldown}초 후 재전송 가능)`,
        'warning'
      );
      return;
    }

    setLoading(true);
    setEmailSendStatus('sending');

    api.post(
      '/auth/join/email',
      { onSuccess, onError, onFinally },
      { email }
    );
  };

  return {
    loading,
    emailSendStatus,
    cooldown,
    handleSendEmailCode,
  };
}
