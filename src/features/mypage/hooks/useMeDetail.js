import { useCallback, useEffect, useState } from "react";
import { api } from '../../../base/utils/fetchUtils'
import { useAuthStore } from "../../../base/stores/useAuthStore";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

const INITIAL_ME = {
  memberId: null,
  email: "",
  nickname: "",
  profileImageUrl: "",
};

export function useMeDetail() {
  const { isAuthenticated } = useAuthStore();
  const { showSnackbar } = useSnackbar();

  const [me, setMe] = useState(INITIAL_ME);
  const [loading, setLoading] = useState(false);

  /**
   * 내 정보 조회
   */
  const fetchMe = useCallback(() => {
    if (!isAuthenticated) return

    setLoading(true);

    api.get("/members/me/detail", {
      onSuccess: (rp) => {
        setMe(rp.data);
      },
      onError: (rp) => {
        showSnackbar(
          rp?.message || "회원 정보를 불러오지 못했습니다.",
          "error"
        );
      },
      onFinally: () => {
        setLoading(false)
      },
    })
  }, [isAuthenticated, showSnackbar])

  /**
   * 인증 완료 시 최초 1회 조회
   */
  useEffect(() => {
    fetchMe();
  }, [fetchMe])

  return {
    me,           // 회원 상세 단일 진실
    loading,      // 로딩 상태
    refreshMe: fetchMe, // 수정 후 재조회용
  }
}