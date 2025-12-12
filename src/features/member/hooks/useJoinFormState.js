/**회원가입 입력값(form)과 필드별 에러 메시지(fieldErrors)를
*  함께 관리하는 폼 상태 전용 훅
*/
import { useState } from 'react';

const INITIAL_FORM = {
  email: '',
  password: '',
  passwordConfirm: '',
  verificationCode: '',
};

const INITIAL_FIELD_ERRORS = {
  email: '',
  password: '',
  passwordConfirm: '',
  verificationCode: '',
};

export function useJoinFormState() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState(INITIAL_FIELD_ERRORS);

  const setFieldError = (field, message) => {
    setFieldErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearFieldError = (field) => {
    setFieldErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const resetFieldErrors = () => setFieldErrors(INITIAL_FIELD_ERRORS);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name); // 바뀐 필드만 에러 제거
  };

  return {
    form,
    setForm,
    fieldErrors,
    setFieldErrors,
    setFieldError,
    resetFieldErrors,
    handleChange,
  };
}
