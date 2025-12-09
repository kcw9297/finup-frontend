/**
 * 회원가입 정보 입력 컴포넌트
 */

import { TextField, Button, Paper, Typography } from "@mui/material";

export default function AuthSignupForm({ signupRq, changeSignupRq, handleSignup }) {

  return (
    <Paper sx={{ width: "100%", maxWidth: 450, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>정보 입력</Typography>

      <TextField
        fullWidth
        type="password"
        label="비밀번호"
        name="password"
        value={signupRq.password}
        onChange={e => changeSignupRq({ password: e.target.value })}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        type="password"
        label="비밀번호 확인"
        name="confirmPassword"
        value={signupRq.confirmPassword}
        onChange={e => changeSignupRq({ confirmPassword: e.target.value })}
        sx={{ mb: 2 }}
      />

      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleSignup}
      >
        회원가입 완료
      </Button>
    </Paper>
  );
}
