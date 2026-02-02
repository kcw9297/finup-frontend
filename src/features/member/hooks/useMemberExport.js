import { useSnackbar } from "../../../base/provider/SnackbarProvider"
import { api } from "../../../base/utils/fetchUtils"

/**
 * 회원 출력(PDF/XLSX)용 공용 훅
 * @author khj
 * @since 2025-12-15
 */


export function useMemberExport() {

  const { showSnackbar } = useSnackbar()

  /**
    * 회원 전체 목록 조회 (출력 전용)
    */
  const fetchAllMembers = async (searchRq) => {
    let result = []

    await api.get(
      "/members/list/all"
      , {
        params: {
          ...searchRq,
          pageNum: 0,
          pageSize: 10000, // 출력 전용
        },
        onSuccess: (rp) => {
          result = rp.data ?? []
        },
        onError: (rp) => {
          showSnackbar(rp.message, "error")
        }
      }
    )
    return result
  }


  /* 나중에 참고하려고 일부러 gpt가 알려준 주석 달아놓음 */

  /* ==============================
   * [3] 성공 / 실패 / 마지막 콜백
   * ============================== */
  // 👉 이 훅은 "데이터 조회 전용"이므로
  // 별도의 공통 onSuccess / onFinally는 두지 않음


  /* ==============================
   * [4] REST API 요청 함수
   * ============================== */
  // 👉 fetchAllMembers 내부에서 api 호출 처리

  return {
    fetchAllMembers,
  }
}