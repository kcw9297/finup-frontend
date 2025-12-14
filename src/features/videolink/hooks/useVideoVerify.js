import { useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";

export function useVideoVerify({ admin = false }) {

  // [1] 사용 상태 선언
  const { showSnackbar } = useSnackbar()
  
  // [2] 성공/실패/최종 함수 선언
  // [3] REST API 요청 함수 선언
  const handleVerify = async (videoUrl) => {
    const params = { videoUrl } // 입력 파라미터
    return await api.get(`/videos`, { params, admin, printMessage: false })
  }

  // [4] 반환
  return {
    handleVerify
  }
}