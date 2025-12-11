// src/features/member/hooks/useMemberJoin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../base/utils/fetchUtils';
import { useSnackbar } from '../../../base/provider/SnackbarProvider';
import { useAuthSendEmailCode } from '../../auth/hooks/useAuthSendEmailCode';
import { useAuthVerifyEmailCode } from '../../auth/hooks/useAuthVerifyEmailCode';

const INITIAL_FORM = {
  email: '',
  password: '',
  passwordConfirm: '',
  verificationCode: '',
};

// 필드별 에러 메시지 초기값
const INITIAL_FIELD_ERRORS = {
  email: '',
  password: '',
  passwordConfirm: '',
  verificationCode: '',
};

// ===== 정규식 & 유효성 검사 =====

// 공백 제외 영문/숫자/특수문자를 8~20자
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])[^\s]{8,20}$/;

// 30자 이내 이메일 형식
const EMAIL_MAX_LENGTH = 30;
const EMAIL_REGEX =
  /^[A-Za-z0-9][A-Za-z0-9._-]*@[A-Za-z0-9][A-Za-z0-9.-]*\.[A-Za-z]{2,}$/;

// 가입 폼 유효성 검사 함수
// 에러 있으면 { field, message } 반환, 없으면 null
function validateJoinForm({ email, password, passwordConfirm, emailVerified }) {
  if (!email) {
    return { field: 'email', message: '이메일을 입력해 주세요.' };
  }

  if (email.length > EMAIL_MAX_LENGTH || !EMAIL_REGEX.test(email)) {
    return {
      field: 'email',
      message: '30자 이내 이메일 형식을 입력해야 합니다.',
    };
  }

  if (!password) {
    return { field: 'password', message: '비밀번호를 입력해 주세요.' };
  }

  if (!PASSWORD_REGEX.test(password)) {
    return {
      field: 'password',
      message:
        '공백 제외 영문/숫자/특수문자를 8~20자 사이로 입력해야 합니다.',
    };
  }

  if (!passwordConfirm) {
    return {
      field: 'passwordConfirm',
      message: '비밀번호 확인을 입력해 주세요.',
    };
  }

  if (password !== passwordConfirm) {
    return {
      field: 'passwordConfirm',
      message: '비밀번호가 서로 일치하지 않습니다.',
    };
  }

  if (!emailVerified) {
    return {
      field: 'verificationCode',
      message: '이메일 인증을 완료해 주세요.',
    };
  }

  return null; // 에러 없음
}

export function useMemberJoin() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState(INITIAL_FIELD_ERRORS);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  /**
   * 회원가입 상태 (State Machine)
   * - idle          : 기본 상태
   * - validating    : 클라이언트 유효성 검사 중
   * - requesting    : /members API 요청 중
   * - network_error : 서버/도커 죽어서 응답 자체가 안 올 때
   */
  const [joinStatus, setJoinStatus] = useState('idle');

  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // 이메일 전송 훅 (쿨다운 포함)
  const {
    loading: sendEmailLoading,
    emailSendStatus,          // 'idle' | 'sending' | 'sent' | 'error'
    cooldown,                 // 남은 쿨다운(초)
    handleSendEmailCode,
  } = useAuthSendEmailCode();

  // 인증번호 검증 훅
  const {
    loading: verifyLoading,
    emailVerified,
    verifyStatus,             // 'idle' | 'verifying' | 'verified' | 'error'
    setEmailVerified,
    handleVerifyEmailCode,
  } = useAuthVerifyEmailCode();

  // ===== 파생 상태 =====
  const isRequesting = joinStatus === 'requesting';
  const isNetworkError = joinStatus === 'network_error';

  // 컴포넌트에서 쓰는 disabled 기준
  const globalDisabled = isRequesting || isNetworkError;

  // 상단/버튼 등에 쓸 전체 로딩
  const loading = sendEmailLoading || verifyLoading || isRequesting;

  // =========================
  // INPUT 변경
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 값 변경
    setForm((prev) => ({ ...prev, [name]: value }));

    // 해당 필드 에러만 제거
    setFieldErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  // =========================
  // 이메일 인증코드 전송 버튼
  // =========================
  const handleClickSendVerification = () => {
    if (!form.email) {
      showSnackbar('이메일을 먼저 입력해 주세요.', 'error');
      return;
    }
    setShowVerificationInput(true);
    setEmailVerified(false);
    handleSendEmailCode(form.email);
  };

  // =========================
  // 인증번호 확인 버튼
  // =========================
  const handleClickCheckVerification = () => {
    if (!form.verificationCode) {
      showSnackbar('인증번호를 입력해 주세요.', 'error');
      return;
    }
    handleVerifyEmailCode(form.email, form.verificationCode);
  };

  // =========================
  // 회원가입 성공
  // =========================
  const onSignupSuccess = (rp) => {
    const msg = rp?.message || '회원가입이 완료되었습니다.';
    showSnackbar(msg, 'success');

    setJoinStatus('idle');
    navigate('/login', { replace: true });
  };

  // =========================
  // 회원가입 실패
  // =========================
  const onSignupError = (err) => {
    console.log('signup error >>>', err);

    // 🔴 네트워크 에러 (도커 꺼짐 등)
    // fetchInner catch에서 내려주는 errorResponse = { success:false, message:..., error: err.message }
    if (err?.error) {
      setJoinStatus('network_error');
      showSnackbar(
        '서버와의 연결이 끊어졌습니다. 잠시 후 다시 시도해 주세요.',
        'error'
      );
      return;
    }

    // 🔴 서버 응답이 왔지만 400/500 등 에러인 경우
    const status = err?.status || err?.response?.data?.status;
    let msg =
      err?.response?.data?.message ||
      err?.message ||
      '회원가입 중 오류가 발생했습니다.';

    // 필요하면 백엔드 status 기준으로 메시지 분기
    switch (status) {
      case 'EMAIL_DUPLICATED':
        msg = '이미 가입된 이메일입니다.';
        break;
      case 'VERIFICATION_EXPIRED':
        msg = '인증번호가 만료되었습니다. 이메일을 다시 인증해 주세요.';
        break;
      case 'INVALID_VERIFICATION_CODE':
        msg = '인증번호가 올바르지 않습니다.';
        break;
      default:
        break;
    }

    showSnackbar(msg, 'error');
    setJoinStatus('idle');
  };

  // =========================
  // API 요청 후 항상 실행
  // =========================
  const onSignupFinally = () => {
    // 상태머신은 onSuccess / onError 쪽에서만 변경 (여기는 놔두기)
  };

  // =========================
  // 회원가입 제출
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, passwordConfirm } = form;

    // 유효성 검사 시작
    setJoinStatus('validating');
    setFieldErrors(INITIAL_FIELD_ERRORS);

    const error = validateJoinForm({
      email,
      password,
      passwordConfirm,
      emailVerified,
    });

    // 유효성 실패 → 필드 아래 에러 + 스낵바
    if (error) {
      setFieldErrors((prev) => ({
        ...INITIAL_FIELD_ERRORS,
        [error.field]: error.message,
      }));
      showSnackbar(error.message, 'error');
      setJoinStatus('idle');
      return;
    }

    // 여기까지 오면 클라이언트 유효성 OK → 실제 요청
    setJoinStatus('requesting');

    api.post(
      '/members',
      {
        onSuccess: onSignupSuccess,
        onError: onSignupError,
        onFinally: onSignupFinally,
      },
      { email, password }
    );
  };

  return {
    form,
    loading,
    globalDisabled,
    emailSendStatus,
    verifyStatus,
    emailVerified,
    cooldown,
    fieldErrors,

    showPassword,
    showPasswordConfirm,
    showVerificationInput,

    setShowPassword,
    setShowPasswordConfirm,

    handleChange,
    handleClickSendVerification,
    handleClickCheckVerification,
    handleSubmit,
  };
}
