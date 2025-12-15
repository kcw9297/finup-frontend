import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useAuth } from "../../../base/hooks/useAuth";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

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
  const [member, setMember] = useState(INITIAL_MEMBER);
  const { loginMember } = useAuth();
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
    if (!loginMember?.memberId) return;
    api.get("/members/me", {
      onSuccess: (rp) => {
        const next = {
          memberId: rp.data.memberId,
          email: rp.data.email,
          nickname: rp.data.nickname,
          currentPassword: "",
          password: "",
          passwordConfirm: "",
        };

        setMember(next);
        setMemberOrigin(next);
      },
      onError: () => {
        showSnackbar("회원 정보를 불러오지 못했습니다.", "error");
      },
    });
  }, [loginMember]);

  // [4] 비밀번호 수정
  const submitEdit = () => {
    // 여기! 제일 먼저 추가
    if (!member.currentPassword) {
      showSnackbar("현재 비밀번호를 입력해주세요.", "warning");
      return;
    }

    // 새 비밀번호 입력 체크
    if (!member.password) {
      showSnackbar("새 비밀번호를 입력해주세요.", "warning");
      return;
    }

    // 비밀번호 확인 일치 체크
    if (member.password !== member.passwordConfirm) {
      showSnackbar("비밀번호가 일치하지 않습니다.", "error");
      return;
    }

    // 통과하면 서버 호출
    api.patch(
      `/members/${loginMember.memberId}/password`,
      {
        onSuccess: () => {
          showSnackbar("비밀번호가 변경되었습니다.", "success");
          setMember((prev) => ({
            ...prev,
            currentPassword: "",
            password: "",
            passwordConfirm: "",
          }));
        },
      },
      {
        currentPassword: member.currentPassword,
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
      `/members/${loginMember.memberId}/nickname`,
      {
        onSuccess: () => {
          showSnackbar("닉네임이 변경되었습니다.", "success");
          setMemberOrigin((prev) => ({ ...prev, nickname: member.nickname }));
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

    api.postImage(
      `/members/${member.memberId}/profile-image`,
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
    setMember,
    profilePreview,
    changeProfileFile,
    submitNicknameEdit,
    submitEdit,
    submitProfileImageEdit,
    cancelEdit,
  };

}
