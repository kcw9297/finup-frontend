/**
 * 인증코드 입력 컴포넌트
 */
import { TextField, Button, Paper, Typography } from "@mui/material";

export default function AuthSignupVerify({ verifyRq, changeVerifyRq, handleVerifyCode }) {
  return (
    <Paper sx={{ width: "100%", maxWidth: 450, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>이메일 인증</Typography>

      <TextField
        fullWidth
        label="인증코드"
        name="code"
        value={verifyRq.code}
        onChange={e => changeVerifyRq({ code: e.target.value })}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleVerifyCode}
      >
        인증하기
      </Button>
    </Paper>
  );
}
