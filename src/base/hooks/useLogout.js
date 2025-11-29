import { useSnackbar } from "../provider/SnackbarProvider";
import { useAuthStore } from "../stores/useAuthStore";
import { api } from "../utils/fetchUtils";

export function useLogout() {

  // [1] 사용 상태 및 hook 선언
  const { logout } = useAuthStore()
  const { showSnackbar } = useSnackbar()


  // [2] 성공/실패 콜백 함수 선언
  const onSuccess = rp => {
    showSnackbar(rp.message, 'success') // 로그아웃 안내 출력
    logout() // 로그아웃 처리
  }


  // [3] REST API 요청 함수 정의
  const handleLogout = () => {
    api.post('/logout', { onSuccess })
  }


  // [4] 반환
  return {
    handleLogout
  }
}