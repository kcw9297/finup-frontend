/**
 * 이메일 입력 컴포넌트
 */
import { TextField, Button, Paper, Typography } from "@mui/material";

export default function AuthSignupEmail({ emailRq, changeEmailRq, handleSendCode }) {
  return (
    <Paper sx={{ width: "100%", maxWidth: 450, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>회원가입</Typography>

      <TextField
        fullWidth
        label="이메일"
        name="email"
        value={emailRq.email}
        onChange={e => changeEmailRq({ email: e.target.value })}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleSendCode}
      >
        인증코드 보내기
      </Button>
    </Paper>
  );
}
