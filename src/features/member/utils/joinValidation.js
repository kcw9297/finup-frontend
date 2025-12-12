/**  회원가입 폼의 이메일/비밀번호/인증 여부에 대한
*비즈니스 유효성 규칙을 검사하는 순수 유틸 함수 모음
*/

// 공백 제외 영문/숫자/특수문자를 8~20자
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])[^\s]{8,20}$/;

// 30자 이내 이메일 형식
export const EMAIL_MAX_LENGTH = 30;
export const EMAIL_REGEX =
  /^[A-Za-z0-9][A-Za-z0-9._-]*@[A-Za-z0-9][A-Za-z0-9.-]*\.[A-Za-z]{2,}$/;

// 에러 있으면 { field, message } 반환, 없으면 null
export function validateJoinForm({ email, password, passwordConfirm, emailVerified }) {
  if (!email) return { field: 'email', message: '이메일을 입력해 주세요.' };

  if (email.length > EMAIL_MAX_LENGTH || !EMAIL_REGEX.test(email)) {
    return { field: 'email', message: '30자 이내 이메일 형식을 입력해야 합니다.' };
  }

  if (!password) return { field: 'password', message: '비밀번호를 입력해 주세요.' };

  if (!PASSWORD_REGEX.test(password)) {
    return {
      field: 'password',
      message: '공백 제외 영문/숫자/특수문자를 8~20자 사이로 입력해야 합니다.',
    };
  }

  if (!passwordConfirm) {
    return { field: 'passwordConfirm', message: '비밀번호 확인을 입력해 주세요.' };
  }

  if (password !== passwordConfirm) {
    return { field: 'passwordConfirm', message: '비밀번호가 서로 일치하지 않습니다.' };
  }

  if (!emailVerified) {
    return { field: 'verificationCode', message: '이메일 인증을 완료해 주세요.' };
  }

  return null;
}
