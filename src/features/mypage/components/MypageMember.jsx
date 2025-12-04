// src/features/mypage/components/MypageMember.jsx
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const COLORS = {
  pageBg: "#F5F7FF",        // 오른쪽 전체 영역 연한 파랑 배경
  fieldBorder: "#CEDCFF",   // 입력칸 테두리
  fieldBg: "#FFFFFF",       // 입력칸 내부 배경
  label: "#6B7280",         // 라벨(이름, 이메일 등) 글자색
  title: "#111827",         // "회원 정보 수정" 제목
  desc: "#6B7280",          // 프로필 설명
  primaryBtnBg: "#2563EB",  // 수정하기 버튼 배경
  primaryBtnText: "#FFFFFF",
  secondaryBtnText: "#2563EB",
  secondaryBtnBorder: "#CEDCFF",
};

// 공통 TextField 스타일
const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 0.5, // 살짝만 둥글게
    backgroundColor: COLORS.fieldBg,
    "& fieldset": {
      borderColor: COLORS.fieldBorder,
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: COLORS.fieldBorder,
    },
    "&.Mui-focused fieldset": {
      borderColor: COLORS.fieldBorder, // 포커스돼도 파란 두꺼운 테두리 X
    },
  },
  "& .MuiOutlinedInput-input": {
    fontSize: 14,
  },
};

export default function MypageMember() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: COLORS.pageBg,
        borderRadius: 2,
        p: 4,
        display: "flex",
        flexDirection: "column",   // ✅ 세로로 쌓고
        alignItems: "stretch",
        gap: 3,
      }}
    >
      {/* ✅ 카드 왼쪽 상단 타이틀 */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: COLORS.title,
        }}
      >
        회원 정보 수정
      </Typography>

      {/* ✅ 타이틀 아래에서 프로필 + 폼을 가로로 배치 */}
      <Box
        sx={{
          display: "flex",
          gap: 6,
          alignItems: "flex-start",
        }}
      >
        {/* 왼쪽 : 프로필 영역 */}
        <Box
          sx={{
            width: 260,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 1.5,  // ✅ 타이틀 기준으로 프로필을 조금 아래로 내리기
          }}
        >
          <Box
            sx={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              overflow: "hidden",
              mb: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#E5E7EB", // 연한 회색 배경
            }}
          >
            <Avatar
              src="/assets/profile-sample.png"
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 0.5 }}
          >
            프로필 이미지
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: COLORS.desc }}
          >
            클릭 또는 이미지 드래그
            <br />
            (1:1 비율)
          </Typography>
        </Box>

        {/* 오른쪽 : 회원 정보 폼 */}
        <Box sx={{ flex: 1, maxWidth: 520 }}>
          {/* ⛔️ 여기 있던 "회원 정보 수정" 타이틀은 위로 올렸으니 삭제됨 */}

          <Stack spacing={2.5}>
            {/* 이름 */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 0.5,
                  color: COLORS.label,
                }}
              >
                이름
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                defaultValue="금영리"
                sx={textFieldSx}
              />
            </Box>

            {/* 이메일 */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 0.5,
                  color: COLORS.label,
                }}
              >
                이메일
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                defaultValue="godguemyeong@naver.com"
                sx={textFieldSx}
              />
            </Box>

            {/* 아이디 (읽기 전용) */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 0.5,
                  color: COLORS.label,
                }}
              >
                아이디
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                defaultValue="geumyeonglee"
                InputProps={{ readOnly: true }}
                sx={textFieldSx}
              />
            </Box>

            {/* 새 비밀번호 */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 0.5,
                  color: COLORS.label,
                }}
              >
                새 비밀번호
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                type="password"
                placeholder="새 비밀번호를 입력해주세요"
                sx={textFieldSx}
              />
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  display: "block",
                  color: COLORS.label,
                }}
              >
                영문, 숫자 포함 8~20자
              </Typography>
            </Box>

            {/* 비밀번호 확인 */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 0.5,
                  color: COLORS.label,
                }}
              >
                비밀번호 확인
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                sx={textFieldSx}
              />
            </Box>

            {/* 하단 버튼 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 1,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  minWidth: 88,
                  fontSize: 14,
                  borderColor: COLORS.secondaryBtnBorder,
                  color: COLORS.secondaryBtnText,
                  "&:hover": {
                    borderColor: COLORS.secondaryBtnBorder,
                    backgroundColor: "rgba(37, 99, 235, 0.04)",
                  },
                }}
              >
                취소
              </Button>

              <Button
                variant="contained"
                sx={{
                  minWidth: 88,
                  fontSize: 14,
                  fontWeight: 600,
                  bgcolor: COLORS.primaryBtnBg,
                  color: COLORS.primaryBtnText,
                  "&:hover": {
                    bgcolor: "#1D4ED8",
                  },
                }}
              >
                수정하기
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
