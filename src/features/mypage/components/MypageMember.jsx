import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { useMemberNickname } from "../../member/hooks/useMemberNickname";
import { useMemberPassword } from "../../member/hooks/useMemberPassword";
import { useMemberProfileImage } from "../../member/hooks/useMemberProfileImage";
import { useMypageMemberUI } from "../hooks/useMypageMemberUI";
import { useLoginMember } from "../../../base/hooks/useLoginMember";


/*
수정 API는 성공만 반환 (URL 던져주지 않아도 됨)

프론트는 성공 시 무조건 refreshMe()

화면 표시 데이터는 오직 me에서만
*/


const COLORS = {
  pageBg: "#F5F7FF",
  fieldBorder: "#CEDCFF",
  fieldBg: "#FFFFFF",
  label: "#6B7280",
  title: "#111827",
  desc: "#6B7280",
  primaryBtnBg: "#2563EB",
  primaryBtnText: "#FFFFFF",
  secondaryBtnText: "#2563EB",
  secondaryBtnBorder: "#CEDCFF",
};

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 0.5,
    backgroundColor: COLORS.fieldBg,
    "& fieldset": {
      borderColor: COLORS.fieldBorder,
      borderWidth: "1px",
    },
    "&:hover fieldset": { borderColor: COLORS.fieldBorder },
    "&.Mui-focused fieldset": { borderColor: COLORS.fieldBorder },
  },
  "& .MuiOutlinedInput-input": { fontSize: 14 },
};

export default function MypageMember() {

  const { loading: loadingLoginMember, loginMember } = useLoginMember()

  const {
    nicknameRq,
    changeNicknameRq,
    submitNickname,
    loading: loadingNickname
  } = useMemberNickname()

  const {
    passwordRq,
    changePasswordRq,
    submitPassword,
    loading: loadingPassword
  } = useMemberPassword()


  const {
    profilePreview,
    submitProfileImage,
    changeProfileImage,
    resetProfileImage,
    loading: loadingProfileImage
  } = useMemberProfileImage();

  const {
    openNickname,
    setOpenNickname,
    openPassword,
    setOpenPassword,
    openProfile,
    setOpenProfile,
    handleProfileMouseEnter,
    handleProfileMouseLeave,
  } = useMypageMemberUI();

  const [isHoveringProfile, setIsHoveringProfile] = useState(false);


  // hover로 바로 모달 열기(너무 민감하면 딜레이)
  const hoverTimerRef = useRef(null);


  // 언마운트/모달 열릴 때 타이머 정리

  // 모달 열기
  const openNicknameModal = () => {
    changeNicknameRq({ nickname: loginMember.nickname ?? "" });
    setOpenNickname(true);
  };


  const openPasswordModal = () => {
    changePasswordRq({ currentPassword: "", password: "", passwordConfirm: "" });
    setOpenPassword(true);
  };
  

  // 저장 액션들

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
    };
  }, [])


  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 980,
          bgcolor: COLORS.pageBg,
          borderRadius: 3,
          p: 5,
        }}>
        <Box
          sx={{
            width: "100%",
            bgcolor: COLORS.pageBg,
            borderRadius: 2,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, color: COLORS.title }}>
            회원 정보
          </Typography>

          <Box sx={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
            {/* 프로필 */}
            <Box
              sx={{
                width: 260,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 1.5,
              }}
            >
              <Box
                onMouseEnter={() => setIsHoveringProfile(true)}
                onMouseLeave={() => setIsHoveringProfile(false)}
                onClick={() => setOpenProfile(true)}
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
                  position: "relative",
                }}
              >
                <Avatar
                  src={
                    loginMember?.profileImageUrl ||
                    "/assets/profile-sample.png"
                  }
                  sx={{ width: "100%", height: "100%", '& img': { objectFit: 'cover', objectPosition: 'center top'} }}
                />

                {/* 호버 오버레이 */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: isHoveringProfile ? 1 : 0,
                    transition: "opacity 0.2s",
                    pointerEvents: "none", // 클릭 이벤트가 부모로 전달되도록
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: 16,
                    }}
                  >
                    이미지 수정
                  </Typography>
                </Box>
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                프로필 이미지
              </Typography>
              <Typography
                variant="body2"
                align="center"
                sx={{ color: COLORS.desc }}
              >
                마우스를 올려 수정할 수 있습니다.
              </Typography>
            </Box>

            {/* 읽기 전용 정보 */}
            <Box sx={{ flex: 1, maxWidth: 520 }}>
              <Stack spacing={2.5}>
                <ReadOnlyRow label="이메일" value={loginMember?.email} />
                <ReadOnlyRow
                  label="닉네임"
                  value={loginMember?.nickname}
                  onEdit={openNicknameModal}
                />
                <ReadOnlyRow
                  label="비밀번호"
                  value="********"
                  onEdit={openPasswordModal}
                />
              </Stack>
            </Box>
          </Box>

          {/* 닉네임 모달 */}
          <Dialog
            open={openNickname}
            onClose={() => setOpenNickname(false)}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle>닉네임 변경</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                size="small"
                value={nicknameRq.nickname}
                onChange={(e) => changeNicknameRq({ nickname: e.target.value })}
                sx={{ mt: 1, ...textFieldSx }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() =>
                setOpenNickname(false)
              }>취소</Button>

              <Button variant="contained"
                disabled={loadingLoginMember || loadingNickname}
                onClick={async () => {
                  const ok = await submitNickname()
                  if (ok) {
                    setOpenNickname(false)
                  }
                }}>
                저장
              </Button>
            </DialogActions>
          </Dialog>

          {/* 비밀번호 모달 */}
          <Dialog
            open={openPassword}
            onClose={() => setOpenPassword(false)}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle>비밀번호 변경</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                size="small"
                type="password"
                label="현재 비밀번호"
                value={passwordRq.currentPassword}
                onChange={(e) =>
                  changePasswordRq({ currentPassword: e.target.value })
                }
                sx={{ mt: 1, ...textFieldSx }}
              />

              <TextField
                fullWidth
                size="small"
                type="password"
                label="새 비밀번호"
                value={passwordRq.password}
                onChange={(e) =>
                  changePasswordRq({ password: e.target.value })
                }
                sx={{ mt: 2, ...textFieldSx }}
              />

              <TextField
                fullWidth
                size="small"
                type="password"
                label="비밀번호 확인"
                value={passwordRq.passwordConfirm}
                onChange={(e) => changePasswordRq({ passwordConfirm: e.target.value })
                }
                sx={{ mt: 2, ...textFieldSx }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenPassword(false)}>취소</Button>
              <Button variant="contained"
                disabled={loadingLoginMember || loadingPassword}
                onClick={async () => {
                  const ok = await submitPassword();
                  if (ok) {
                    setOpenPassword(false);
                  }
                }}>
                저장
              </Button>
            </DialogActions>
          </Dialog>

          {/* 프로필 모달 */}
          <Dialog
            open={openProfile}
            onClose={() => setOpenProfile(false)}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle>프로필 이미지 변경</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 1 }}>
                <Avatar
                  src={
                    profilePreview ||
                    loginMember?.profileImageUrl ||
                    "/assets/profile-sample.png"
                  }

                  sx={{ width: 72, height: 72}}
                />
                <Button 
                  variant="outlined" 
                  disabled={loadingLoginMember || loadingProfileImage}
                  component="label">
                  파일 선택
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      changeProfileImage(file)
                    }}
                  />
                </Button>
              </Box>
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 1, mx: 0.5, color: COLORS.label }}
              >
                현재 이미지
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {
                resetProfileImage()
                setOpenProfile(false)}
              }>취소</Button>
              <Button variant="contained" 
                disabled={loadingLoginMember || loadingProfileImage}
                onClick={async () => {
                  const ok = await submitProfileImage()
                  if (ok) {
                    setOpenProfile(false)
                  }
                }
                }>
                저장
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Paper>
    </Box>
  );
}

function ReadOnlyRow({ label, value, onEdit }) {
  return (
    <Box sx={{ position: "relative" }}>
      <Typography
        variant="caption"
        sx={{ display: "block", mb: 0.5, color: COLORS.label }}
      >
        {label}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField fullWidth size="small" value={value || ""} disabled sx={textFieldSx} />

        {onEdit && (
          <IconButton
            sx={{
              position: "absolute",
              right: 7,
              top: "68%",
              transform: "translateY(-50%)",
            }}
            onClick={onEdit}
            size="small"
            aria-label={`${label} 수정`}>

            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
