// src/features/mypage/components/MypageMember.jsx
import {
  Avatar,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// 🔵 파란색 테두리 완전 제거 + 얇은 라인 유지
const thinInputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 1, // 각지게 (4px)
    "& fieldset": {
      borderColor: "divider",  // 기본 테두리
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: "divider",  // hover 시 테두리 유지
    },
    "&.Mui-focused fieldset": {
      borderColor: "divider !important", // 포커스 파랑 제거
      borderWidth: "1px",
    },
  },
};

export default function MypageMember() {
  return (
    <Box
      sx={{
        maxWidth: 960,
        mt: 6,
        ml: 10,      // 사이드바 여백 분리
        mr: 4,
        border: 1,
        borderColor: "divider",   // 카드 테두리는 살림
        borderRadius: 1,
        p: 4,
        display: "flex",
        gap: 6,
        alignItems: "flex-start",
        bgcolor: "background.paper",
      }}
    >
      {/* ------------------- 왼쪽 프로필 ------------------- */}
      <Box
        sx={{
          width: 260,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            overflow: "hidden",
            mb: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: 1,
            borderColor: "divider",
          }}
        >
          <Avatar
            sx={{
              width: "100%",
              height: "100%",
              fontSize: 40,
            }}
          >
            프로필
          </Avatar>
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
          프로필 이미지
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          클릭 또는 이미지 드래그
          <br />
          (1:1 비율)
        </Typography>
      </Box>

      {/* ------------------- 오른쪽 입력 폼 ------------------- */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          회원 정보 수정
        </Typography>

        <Stack spacing={2.5}>
          {/* 이름 */}
          <Box>
            <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
              이름
            </Typography>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              defaultValue="금영리"
              sx={thinInputSx}
            />
          </Box>

          {/* 이메일 */}
          <Box>
            <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
              이메일
            </Typography>

            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                defaultValue="godguemyeong@naver.com"
                sx={thinInputSx}
              />
            </Stack>
          </Box>

          {/* 아이디 */}
          <Box>
            <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
              아이디
            </Typography>

            <TextField
              fullWidth
              size="small"
              variant="outlined"
              defaultValue="geumyeonglee"
              InputProps={{ readOnly: true }}
              sx={thinInputSx}
            />
          </Box>

          {/* 새 비번 */}
          <Box>
            <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
              새 비밀번호
            </Typography>

            <TextField
              fullWidth
              size="small"
              variant="outlined"
              type="password"
              placeholder="새 비밀번호를 입력해주세요"
              sx={thinInputSx}
            />

            <Typography variant="caption" sx={{ mt: 0.5, display: "block" }}>
              영문, 숫자 포함 8~20자
            </Typography>
          </Box>

          {/* 비번 확인 */}
          <Box>
            <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
              비밀번호 확인
            </Typography>

            <TextField
              fullWidth
              size="small"
              variant="outlined"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              sx={thinInputSx}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
