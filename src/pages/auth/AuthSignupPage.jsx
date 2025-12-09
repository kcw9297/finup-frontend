import EmptyLayout from "../../base/layouts/EmptyLayout";
import { useAuthSignup } from "../../features/auth/hooks/useAuthSignup";

import AuthSignupEmail from "../../features/auth/components/AuthSignupEmail";
import AuthSignupVerify from "../../features/auth/components/AuthSignupVerify";
import AuthSignupForm from "../../features/auth/components/AuthSignupForm";

export default function AuthSignupPage() {

  const {
    step,
    emailRq, verifyRq, signupRq,
    changeEmailRq, changeVerifyRq, changeSignupRq,
    handleSendCode, handleVerifyCode, handleSignup
  } = useAuthSignup();

  return (
    <EmptyLayout>
      {step === 1 && (
        <AuthSignupEmail
          emailRq={emailRq}
          changeEmailRq={changeEmailRq}
          handleSendCode={handleSendCode}
        />
      )}

      {step === 2 && (
        <AuthSignupVerify
          verifyRq={verifyRq}
          changeVerifyRq={changeVerifyRq}
          handleVerifyCode={handleVerifyCode}
        />
      )}

      {step === 3 && (
        <AuthSignupForm
          signupRq={signupRq}
          changeSignupRq={changeSignupRq}
          handleSignup={handleSignup}
        />
      )}
    </EmptyLayout>
  );
}
