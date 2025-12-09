import { useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

const INITIAL_EMAIL = { email: "" };
const INITIAL_VERIFY = { email: "", code: "" };
const INITIAL_SIGNUP = { email: "", password: "", confirmPassword: "" };

export function useAuthSignup() {

  const [emailRq, setEmailRq] = useState(INITIAL_EMAIL);
  const [verifyRq, setVerifyRq] = useState(INITIAL_VERIFY);
  const [signupRq, setSignupRq] = useState(INITIAL_SIGNUP);

  const [step, setStep] = useState(1);   // 상태값
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const changeEmailRq = rq => setEmailRq(prev => ({ ...prev, ...rq }));
  const changeVerifyRq = rq => setVerifyRq(prev => ({ ...prev, ...rq }));
  const changeSignupRq = rq => setSignupRq(prev => ({ ...prev, ...rq }));

  const handleSendCode = () => {
    api.post(
      "/auth/send-code",
      {
        onSuccess: () => {
          showSnackbar("이메일로 인증코드를 보냈습니다.", "success");
          setVerifyRq(prev => ({ ...prev, email: emailRq.email }));
          setStep(2);
        },
        onError: () => showSnackbar("이메일 전송 실패", "error"),
      },
      emailRq
    );
  };

  const handleVerifyCode = () => {
    api.post(
      "/auth/verify-code",
      {
        onSuccess: () => {
          showSnackbar("이메일 인증 완료!", "success");
          setSignupRq(prev => ({ ...prev, email: verifyRq.email }));
          setStep(3);
        },
        onError: () => showSnackbar("인증코드가 올바르지 않습니다", "error"),
      },
      verifyRq
    );
  };

  const handleSignup = () => {
    if (signupRq.password !== signupRq.confirmPassword) {
      showSnackbar("비밀번호가 일치하지 않습니다.", "error");
      return;
    }

    const { email, password } = signupRq;

    api.post(
      "/auth/join",
      {
        onSuccess: () => {
          showSnackbar("회원가입이 완료되었습니다!", "success");
          setTimeout(() => navigate("/login"), 400);
        },
        onError: () => showSnackbar("회원가입에 실패했습니다.", "error"),
      },
      { email, password }
    );
  };

  return {
    step,
    emailRq,
    verifyRq,
    signupRq,
    changeEmailRq,
    changeVerifyRq,
    changeSignupRq,
    handleSendCode,
    handleVerifyCode,
    handleSignup,
  };
}
