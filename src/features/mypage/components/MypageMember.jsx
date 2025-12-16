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
import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { useMemberMypage } from "../hooks/useMemberMypage";

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
  const { showSnackbar } = useSnackbar();

  // 모달 상태
  const [openNickname, setOpenNickname] = useState(false);



  // 모달 입력값
  const [nicknameDraft, setNicknameDraft] = useState("");
  const [pwDraft, setPwDraft] = useState({
    currentPassword: "",
    password: "",
    passwordConfirm: "",
  })


  const {
    member,
    setMember,
    profilePreview,
    changeProfileFile,
    submitNicknameEdit,
    submitPasswordEdit,
    submitProfileImageEdit,
    cancelEdit,
    isNicknameChanged,
    isProfileChanged,
    isPasswordReady,

    setOpenPassword,
    openPassword,

    setOpenProfile,
    openProfile,
    imageVersion,
  } = useMemberMypage()


  // ✅ hover로 바로 모달 열기(너무 민감하면 딜레이)
  const hoverTimerRef = useRef(null);


  // ✅ 언마운트/모달 열릴 때 타이머 정리

  // 모달 열기
  const openNicknameModal = () => {
    setNicknameDraft(member.nickname);
    setOpenNickname(true);
  };

  const openPasswordModal = () => {
    setPwDraft({ currentPassword: "", password: "", passwordConfirm: "" });
    setOpenPassword(true);
  };

  const openProfileModal = () => {
    setOpenProfile(true);
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


  // ✅ 프로필 hover 이벤트
  const handleProfileMouseEnter = () => {
    if (openProfile) return;

    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    hoverTimerRef.current = setTimeout(() => {
      openProfileModal();
    }, 200); // 민감하면 200~300 추천
  };

  const handleProfileMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }

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
            width: "70%",
            bgcolor: COLORS.pageBg,
            borderRadius: 2,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            ml: 10,
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
                onMouseEnter={handleProfileMouseEnter}
                onMouseLeave={handleProfileMouseLeave}
                onClick={openProfileModal} // 모바일 대비 클릭도 유지
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
                  src={
                    profilePreview ||
                    (member.profileImageUrl
                      ? `${member.profileImageUrl}?t=${imageVersion}`
                      : "/assets/profile-sample.png")
                  }
                  sx={{ width: "100%", height: "100%" }}
                />
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                프로필 이미지
              </Typography>
              <Typography
                variant="body2"
                align="center"
                sx={{ color: COLORS.desc }}
              >
                이미지에 마우스를 올리면 바로 수정 창이 열립니다.
              </Typography>
            </Box>

            {/* 읽기 전용 정보 */}
            <Box sx={{ flex: 1, maxWidth: 520 }}>
              <Stack spacing={2.5}>
                <ReadOnlyRow label="이메일" value={member.email} />
                <ReadOnlyRow
                  label="닉네임"
                  value={member.nickname}
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
                value={nicknameDraft}
                onChange={(e) => setNicknameDraft(e.target.value)}
                sx={{ mt: 1, ...textFieldSx }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() =>
                setOpenNickname(false)
              }>취소</Button>

              <Button variant="contained"
                onClick={() => {
                  setMember(prev => ({
                    ...prev,
                    nickname: nicknameDraft
                  }))
                  submitNicknameEdit(nicknameDraft)
                  setOpenNickname(false)
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
                value={pwDraft.currentPassword}
                onChange={(e) =>
                  setPwDraft((p) => ({ ...p, currentPassword: e.target.value }))
                }
                sx={{ mt: 1, ...textFieldSx }}
              />

              <TextField
                fullWidth
                size="small"
                type="password"
                label="새 비밀번호"
                value={pwDraft.password}
                onChange={(e) =>
                  setPwDraft((p) => ({ ...p, password: e.target.value }))
                }
                sx={{ mt: 2, ...textFieldSx }}
              />

              <TextField
                fullWidth
                size="small"
                type="password"
                label="비밀번호 확인"
                value={pwDraft.passwordConfirm}
                onChange={(e) =>
                  setPwDraft((p) => ({ ...p, passwordConfirm: e.target.value }))
                }
                sx={{ mt: 2, ...textFieldSx }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenPassword(false)}>취소</Button>
              <Button variant="contained"
                onClick={() =>
                  submitPasswordEdit(pwDraft)
                }>
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
                    (member.profileImageUrl
                      ? `${member.profileImageUrl}?t=${imageVersion}`
                      : "/assets/profile-sample.png")
                  }

                  sx={{ width: 72, height: 72 }}
                />
                <Button variant="outlined" component="label">
                  파일 선택
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      changeProfileFile(file)
                    }}
                  />
                </Button>
              </Box>
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 1, color: COLORS.label }}
              >
                권장: 1:1 비율 이미지
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenProfile(false)}>취소</Button>
              <Button variant="contained" onClick={submitProfileImageEdit}>
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
    <Box>
      <Typography
        variant="caption"
        sx={{ display: "block", mb: 0.5, color: COLORS.label }}
      >
        {label}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField fullWidth size="small" value={value || ""} disabled sx={textFieldSx} />

        {onEdit && (
          <IconButton onClick={onEdit} size="small" aria-label={`${label} 수정`}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
