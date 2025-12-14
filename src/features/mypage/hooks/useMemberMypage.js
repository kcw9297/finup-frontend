import { useEffect, useState } from "react";
import { api } from "@/base/utils/fetchUtils";


import { useAuthStore } from "@/base/stores/useAuthStore";
import { useSnackbar } from "@/base/provider/context/SnackbarProvider";

const INITIAL_MEMBER = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

export function useMemberMypage() {
  // [1] 상태
  const [member, setMember] = useState(INITIAL_MEMBER);
  const { loginUser } = useAuthStore();
  const { showSnackbar } = useSnackbar();
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(""); // 미리보기 URL
  const [memberOrigin, setMemberOrigin] = useState(INITIAL_MEMBER);



  // [2] 입력값 변경
  const changeMember = (data) =>
    setMember((prev) => ({ ...prev, ...data }));

  const changeProfileFile = (file) => {
    if (!file) return;

    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };


  // [3] 마이페이지 조회
  useEffect(() => {
    if (!loginUser?.memberId) return;

    api.get(`/members/${loginUser.memberId}`, {
      onSuccess: (rp) => {
        const next = {
          email: rp.data.email,
          nickname: rp.data.nickname,
          password: "",
          passwordConfirm: "",
        };

        setMember(next);
        setMemberOrigin(next);
      },

    });
  }, [loginUser]);

  // [4] 비밀번호 수정
  const submitEdit = () => {
    if (!member.password) {
      showSnackbar("새 비밀번호를 입력해주세요.", "warning");
      return;
    }

    if (member.password !== member.passwordConfirm) {
      showSnackbar("비밀번호가 일치하지 않습니다.", "error");
      return;
    }

    api.patch(
      `/members/${loginUser.memberId}/password`,
      {
        onSuccess: () => {
          showSnackbar("비밀번호가 변경되었습니다.", "success");
          setMember((prev) => ({
            ...prev,
            password: "",
            passwordConfirm: "",
          }));
        },
      },
      {
        newPassword: member.password,
      }
    );
  };
  // [5] 닉네임 수정
  const submitNicknameEdit = () => {
    if (!member.nickname) {
      showSnackbar("닉네임을 입력해주세요.", "warning");
      return;
    }

    api.patch(
      `/members/${loginUser.memberId}/nickname`,
      {
        onSuccess: () => {
          showSnackbar("닉네임이 변경되었습니다.", "success");
        },
      },
      {
        nickname: member.nickname,
      }
    );
  };
  //  [6] 프로필 수정
  const submitProfileImageEdit = () => {
    if (!profileFile) {
      showSnackbar("업로드할 이미지를 선택해주세요.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("file", profileFile);

    api.patch(
      `/members/${loginUser.memberId}/profile-image`,
      {
        onSuccess: () => {
          showSnackbar("프로필 이미지가 변경되었습니다.", "success");
          setProfileFile(null);
        },
      },
      formData
    );
  };

  // [7] 취소 (원본으로 되돌리기)
  const cancelEdit = () => {
    setMember(memberOrigin);
    setProfileFile(null);
    setProfilePreview("");
    showSnackbar("변경사항이 취소되었습니다.", "info");
  };


  return {
    member,
    changeMember,
    submitEdit,
    submitNicknameEdit,
    profilePreview,
    changeProfileFile,
    submitProfileImageEdit,
    cancelEdit,
  };
}
