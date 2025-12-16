import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useAuth } from "../../../base/hooks/useAuth";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import Loading from './../../../base/components/layout/Loading';

const INITIAL_MEMBER = {
  memberId: null,
  email: "",
  nickname: "",
  currentPassword: "",
  password: "",
  passwordConfirm: "",
};

export function useMemberMypage() {
  // [1] 상태
  const [openProfile, setOpenProfile] = useState(false);
  const [member, setMember] = useState(INITIAL_MEMBER);
  const { loginMember, handleLogin } = useAuth();


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
    if (!loginMember?.memberId) return;

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
        };

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
  }, [loginMember?.memberId]);


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
        },
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
        onSuccess: () => {
          showSnackbar("닉네임이 변경되었습니다.", "success")
          handleLogin({
            ...loginMember,
            nickname,
          })
          fetchMe()
        },
      },
      { nickname }
    )
  }




  //  [6] 프로필 이미지 수정
  const submitProfileImageEdit = () => {
    if (!profileFile) {
      showSnackbar("업로드할 이미지를 선택해주세요.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("file", profileFile);

    api.postImage(
      `/members/me/profile-image`,
      {
        onSuccess: (rp) => {
          const newProfileImageUrl = rp.data?.profileImageUrl;

          showSnackbar("프로필 이미지가 변경되었습니다.", "success");

          //  1. authStore 갱신 (헤더 즉시 반영)
          if (newProfileImageUrl) {
            handleLogin({
              ...loginMember,
              profileImageUrl: newProfileImageUrl,
            });
          }

          //  2. 마이페이지 상세 갱신
          fetchMe();

          //  3. UI 정리
          setImageVersion(Date.now());
          setProfileFile(null);
          setProfilePreview("");
          setOpenProfile(false);
        },
      },
      formData
    )
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
