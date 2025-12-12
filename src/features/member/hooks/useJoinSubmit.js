/**
 * 회원가입 API 요청 훅
 * - 성공/실패/네트워크 에러(도커 다운) 처리
 * - 서버 status 코드에 따라 fieldError 매핑
 */
import { api } from '../../../base/utils/fetchUtils';

export function useJoinSubmit({
  showSnackbar,
  navigate,
  setJoinStatus,
  setFieldError,
}) {
  const onSignupSuccess = (rp) => {
    showSnackbar(rp?.message || '회원가입이 완료되었습니다.', 'success');
    setJoinStatus('idle');
    navigate('/login', { replace: true });
  };

  const onSignupError = (err) => {
    //  네트워크 에러(도커 다운)
    if (err?.error) {
      setJoinStatus('network_error');
      showSnackbar(
        '서버와의 연결이 끊어졌습니다. 잠시 후 다시 시도해 주세요.',
        'error'
      );
      return;
    }

    const status = err?.status || err?.response?.data?.status;

    let msg =
      err?.response?.data?.message ||
      err?.message ||
      '회원가입 중 오류가 발생했습니다.';

    //  서버 status → 필드 에러 매핑
    switch (status) {
      case 'EMAIL_DUPLICATED':
        msg = '이미 가입된 이메일입니다.';
        setFieldError?.('email', msg);
        break;

      case 'VERIFICATION_EXPIRED':
        msg = '인증번호가 만료되었습니다. 이메일을 다시 인증해 주세요.';
        setFieldError?.('verificationCode', msg);
        break;

      case 'INVALID_VERIFICATION_CODE':
        msg = '인증번호가 올바르지 않습니다.';
        setFieldError?.('verificationCode', msg);
        break;

      default:
        break;
    }

    showSnackbar(msg, 'error');
    setJoinStatus('idle');
  };

  const submitJoin = ({ email, password }) => {
    api.post(
      '/members',
      { onSuccess: onSignupSuccess, onError: onSignupError },
      { email, password }
    );
  };

  return { submitJoin };
}
