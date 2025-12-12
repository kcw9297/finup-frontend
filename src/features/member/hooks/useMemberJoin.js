/** 회원가입 관련 모든 훅과 로직을 조합해
*   컴포넌트에 필요한 인터페이스만 제공하는 상위 훅
*/
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../../base/provider/SnackbarProvider';

import { useAuthSendEmailCode } from '../../auth/hooks/useAuthSendEmailCode';
import { useAuthVerifyEmailCode } from '../../auth/hooks/useAuthVerifyEmailCode';

import { useJoinFormState } from './useJoinFormState';
import { useJoinStatusMachine } from './useJoinStatusMachine';
import { useJoinSubmit } from './useJoinSubmit';
import { validateJoinForm } from '../utils/joinValidation';

export function useMemberJoin() {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // ===== 폼 상태 =====
  const {
    form,
    fieldErrors,
    setFieldError,
    resetFieldErrors,
    handleChange,
  } = useJoinFormState();

  // ===== UI 상태 =====
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  // ===== 상태 머신 =====
  const { joinStatus, setJoinStatus, isRequesting, isNetworkError } =
    useJoinStatusMachine();

  //  핵심: 전체 비활성화는 서버 다운일 때만
  const globalDisabled = isNetworkError;

  // ===== 이메일 전송 =====
  const {
    loading: sendEmailLoading,
    emailSendStatus,
    cooldown,
    handleSendEmailCode,
  } = useAuthSendEmailCode();

  // ===== 인증번호 검증 =====
  const {
    loading: verifyLoading,
    emailVerified,
    verifyStatus,
    setEmailVerified,
    handleVerifyEmailCode,
  } = useAuthVerifyEmailCode();

  // ===== 회원가입 submit =====
  const { submitJoin } = useJoinSubmit({
    showSnackbar,
    navigate,
    setJoinStatus,
    setFieldError,
  });

  const loading = sendEmailLoading || verifyLoading || isRequesting;

  // =========================
  // 이메일 인증코드 전송
  // =========================
  const handleClickSendVerification = () => {
    if (!form.email) {
      setFieldError('email', '이메일을 입력해 주세요.');
      showSnackbar('이메일을 입력해 주세요.', 'error');
      return;
    }

    setShowVerificationInput(true);
    setEmailVerified(false);
    handleSendEmailCode(form.email);
  };

  // =========================
  // 인증번호 확인
  // =========================
  const handleClickCheckVerification = () => {
    if (!form.verificationCode) {
      setFieldError('verificationCode', '인증번호를 입력해 주세요.');
      showSnackbar('인증번호를 입력해 주세요.', 'error');
      return;
    }
    handleVerifyEmailCode(form.email, form.verificationCode);
  };

  // =========================
  // 회원가입 제출
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    resetFieldErrors();
    setJoinStatus('validating');

    const error = validateJoinForm({
      email: form.email,
      password: form.password,
      passwordConfirm: form.passwordConfirm,
      emailVerified,
    });

    if (error) {
      setFieldError(error.field, error.message);
      showSnackbar(error.message, 'error');
      setJoinStatus('idle');
      return;
    }

    setJoinStatus('requesting');
    submitJoin({ email: form.email, password: form.password });
  };

  const signupLoading = isRequesting || isNetworkError; // 회원가입 버튼 스피너용

  return {
    form,
    fieldErrors,

    loading,
    globalDisabled,
    signupLoading,

    emailSendStatus,
    verifyStatus,
    emailVerified,
    cooldown,

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