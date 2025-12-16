import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useAuth } from "../../../base/hooks/useAuth";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

const INITIAL_MEMBER = {
  memberId: null,
  email: "",
  nickname: "",
  profileImageUrl: "",
};

const INITIAL_PASSWORD = {
  currentPassword: "",
  password: "",
  passwordConfirm: "",
};


export function useMemberMypage() {
  // [1] 상태
  const [openProfile, setOpenProfile] = useState(false);

  // 회원 정보, 비밀번호 분리
  const [member, setMember] = useState(INITIAL_MEMBER);
  const [passwordForm, setPasswordForm] = useState(INITIAL_PASSWORD);

  const { loginMember, updateLoginMember, } = useAuth();


  const { showSnackbar } = useSnackbar();
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(""); // 미리보기 URL
  const [memberOrigin, setMemberOrigin] = useState(INITIAL_MEMBER);
  const [loading, setLoading] = useState(false)
  const [imageVersion, setImageVersion] = useState(0);
  const [openPassword, setOpenPassword] = useState(false);

  const isNicknameChanged = member.nickname !== memberOrigin.nickname;
  const isProfileChanged = !!profileFile;
  const isPasswordReady =
    member.currentPassword && member.password && member.passwordConfirm;

  // [1] 프로필 정보 조회
  const fetchMe = () => {
    api.get("/members/me/detail", {
      onSuccess: (rp) => {
        const data = rp.data;

        const next = {
          memberId: data.memberId,
          email: data.email,
          nickname: data.nickname,
          currentPassword: "",
          password: "",
          passwordConfirm: "",
          profileImageUrl: data.profileImageUrl,
        }

        setMember(next);
        setMemberOrigin(next);
      },

      onError: (rp) => {
        showSnackbar(rp?.message || "회원 정보를 불러오지 못했습니다.", "error");
      },
    });
  };




  const changeProfileFile = (file) => {
    if (!file) return;

    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  // 미리보기 URL 정리 전담
  useEffect(() => {
    return () => {
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [profilePreview]);



  // [3] 마이페이지 조회
  useEffect(() => {
    fetchMe()
  }, [])


  const validatePassword = ({ currentPassword, password, passwordConfirm }) => {
    if (!currentPassword) {
      showSnackbar("현재 비밀번호를 입력해주세요.", "warning");
      return false;
    }

    if (!password) {
      showSnackbar("새 비밀번호를 입력해주세요.", "warning");
      return false;
    }

    if (password.length < 8) {
      showSnackbar("비밀번호는 8자 이상이어야 합니다.", "warning");
      return false;
    }

    if (currentPassword === password) {
      showSnackbar("새 비밀번호는 현재 비밀번호와 달라야 합니다.", "warning");
      return false;
    }

    if (password !== passwordConfirm) {
      showSnackbar("비밀번호가 일치하지 않습니다.", "error");
      return false;
    }

    return true;
  };


  // [4] 비밀번호 수정
  const submitPasswordEdit = (pwDraft) => {

    if (!validatePassword(pwDraft)) return;

    // 통과하면 서버 호출
    api.patch(
      `/members/me/password`,
      {
        onSuccess: () => {
          showSnackbar("비밀번호가 변경되었습니다.", "success")
          setOpenPassword(false)
          fetchMe()
        },
        onError: (rp) => {
          showSnackbar(rp?.message || "비밀번호 변경에 실패했습니다.", "error")
        }
      },
      {
        currentPassword: pwDraft.currentPassword,
        newPassword: pwDraft.password,
      }
    )
  }

  // [5] 닉네임 수정
  const submitNicknameEdit = (nickname) => {
    if (!nickname) return;

    api.patch(
      "/members/me/nickname",
      {
        onSuccess: async () => {
          showSnackbar("닉네임이 변경되었습니다.", "success")

          fetchMe()
        },
        onError: (rp) => {
          showSnackbar(rp?.message || "닉네임 변경에 실패했습니다.", "error")
        }
      },
      { nickname: nickname }
    )
  }




  //  [6] 프로필 이미지 수정
  const submitProfileImageEdit = () => {
    const file = profileFile

    if (!file) {
      showSnackbar("업로드할 이미지를 선택해주세요.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    api.postImage(
      `/members/me/profile-image`,
      {
        onSuccess: async () => {
          //  1. 스낵바
          showSnackbar("프로필 이미지가 변경되었습니다.", "success")
          const newTimestamp = Date.now()

          // if (updateLoginMember && loginMember.profileImageUrl) {
          //   // 기존 URL 뒤에 타임스탬프를 갱신하여 브라우저가 새 이미지를 로드하게 함
          //   const baseUrl = loginMember.profileImageUrl.split('?')[0];
          //   updateLoginMember({
          //     profileImageUrl: `${baseUrl}?v=${newTimestamp}`
          //   });
          // }
          //  2. 마이페이지 상세 갱신 / 로그인 상태 갱신
          // await refreshAuth()

          //  3. UI 정리
          fetchMe()
          setProfileFile(null)
          setProfilePreview("")
          setOpenProfile(false)
        },
      }, formData)
  }

  // [7] 취소 (원본으로 되돌리기)
  const cancelEdit = () => {
    setMember(memberOrigin);
    setProfileFile(null);
    setProfilePreview("");
    showSnackbar("변경사항이 취소되었습니다.", "info");
  };

  return {
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
  }

}
