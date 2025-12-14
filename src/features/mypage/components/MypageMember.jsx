import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemberMypage } from "../hooks/useMemberMypage";




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
    borderRadius: 0.5,
    backgroundColor: COLORS.fieldBg,
    "& fieldset": {
      borderColor: COLORS.fieldBorder,
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: COLORS.fieldBorder,
    },
    "&.Mui-focused fieldset": {
      borderColor: COLORS.fieldBorder,
    },
  },
  "& .MuiOutlinedInput-input": {
    fontSize: 14,
  },
};

export default function MypageMember() {
  const {
    member,
    changeMember,
    submitEdit,
    submitNicknameEdit,
    profilePreview,
    changeProfileFile,
    submitProfileImageEdit,
    cancelEdit,
  } = useMemberMypage();

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: COLORS.pageBg,
        borderRadius: 2,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 3,
      }}
    >
      {/*  카드 왼쪽 상단 타이틀 */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: COLORS.title,
        }}
      >
        회원 정보 수정
      </Typography>

      {/*  타이틀 아래에서 프로필 + 폼을 가로로 배치 */}
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
            mt: 1.5,
          }}
        >
          {/* 숨은 파일 input은 프로필 영역 안에 둔다 */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="profile-file-input"
            onChange={(e) => changeProfileFile(e.target.files?.[0])}
          />

          {/* 프로필 이미지 박스를 클릭하면 파일 선택 */}
          <Box
            onClick={() => document.getElementById("profile-file-input").click()}
            sx={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              overflow: "hidden",
              mb: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#E5E7EB",
              cursor: "pointer",
            }}
          >
            <Avatar
              src={profilePreview || "/assets/profile-sample.png"}
              sx={{ width: "100%", height: "100%" }}
            />
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
            프로필 이미지
          </Typography>
          <Typography variant="body2" align="center" sx={{ color: COLORS.desc }}>
            클릭 또는 이미지 드래그
            <br />
            (1:1 비율)
          </Typography>

          {/* 이미지 업로드 요청 버튼 (선택사항이지만 지금은 테스트용으로 있는게 좋음) */}
          <Button
            variant="outlined"
            onClick={submitProfileImageEdit}
            sx={{ mt: 2, borderColor: COLORS.secondaryBtnBorder, color: COLORS.secondaryBtnText }}
          >
            이미지 변경 저장
          </Button>
        </Box>

        {/* 오른쪽 : 회원 정보 폼 */}
        <Box sx={{ flex: 1, maxWidth: 520 }}>

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
                value={member.name}
                onChange={(e) => changeMember({ name: e.target.value })}
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
                value={member.email}
                onChange={(e) => changeMember({ email: e.target.value })}
                sx={textFieldSx}
              />

            </Box>

            {/* 닉네임 */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 0.5,
                  color: COLORS.label,
                }}
              >
                닉네임
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  value={member.nickname}
                  onChange={(e) => changeMember({ nickname: e.target.value })}
                  sx={textFieldSx}
                />

                <Button
                  variant="outlined"
                  onClick={submitNicknameEdit}
                  sx={{
                    minWidth: 96,
                    borderColor: COLORS.secondaryBtnBorder,
                    color: COLORS.secondaryBtnText,
                    "&:hover": {
                      borderColor: COLORS.secondaryBtnBorder,
                      backgroundColor: "rgba(37, 99, 235, 0.04)",
                    },
                  }}
                >
                  저장
                </Button>
              </Box>
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
                type="password"
                value={member.password}
                onChange={(e) => changeMember({ password: e.target.value })}
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
                type="password"
                value={member.passwordConfirm}
                onChange={(e) => changeMember({ passwordConfirm: e.target.value })}
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
                onClick={cancelEdit}
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
                onClick={submitEdit}
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
