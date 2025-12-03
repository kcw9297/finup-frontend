import { useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import { api } from "../../../base/utils/fetchUtils";


const INITIAL_NOTICE_WRITE_RQ = {
  title: "",
  content: "",
}

export function useNoticeWrite(noticeId) {
  // [1] 폼 불러오는 거 필요 데이터 선언

  const [form, setForm] = useState(() => ({ INITIAL_NOTICE_WRITE_RQ }))  // 입력 상태
  const [writeRp, setWriteRp] = useState(null)  // 응답 결과 데이터
  const { showSnackbar } = useSnackbar()  // 스낵바
  const navigate = useNavigate()  // 페이지 이동

  // [2] 입력 데이터 
  const changeForm = (rq) =>
    setForm((prev) => ({ ...prev, ...rq }))

  // [3] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    setWriteRp(rp)
    showSnackbar("공지사항을 등록했습니다.", "success")

    setTimeout(() => {
      navigate(`/admin/notices/${rp.data.noticeId}`)
    }, 300)
  }

  const onError = (rp) => {
    showSnackbar("공지사항 등록에 실패했습니다.", "error")
  }

  const onFinally = () => {
    // 필요 시 로딩 종료 등 처리 예정
  }

  // [4] REST API 요청 함수
  const handleWrite = () => {
    setWriteRp(null)  // 응답 초기화

    api.post(
      "/notices",
      {
        admin: true,
        onSuccess, onError, onFinally
      },
      form,
    )
  }

  // [5] 반환
  return {
    form,
    writeRp,
    changeForm,
    handleWrite,
  }
}