import { useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { useNavigate } from "react-router-dom";

export function useNoticeWrite(noticeId) {
  // [1] 폼 불러오는 거

  const [form, setForm] = useState(() => ({
    title: "",
    content: "",
  }))

  const { showSnackbar } = useSnackbar()

  const navigate = useNavigate()

  // [2] 일단 필요할까봐 공백 만들어놓음


  const onSuccess = (rp) => {
    showSnackbar("공지사항을 등록했습니다.", "success")
    navigate(`admin/notices/${noticeId}`)
  }

  const onError = (rp) => {
    showSnackbar("공지사항 등록에 실패했습니다.", "error")
  }

  const onFinally = () => {

  }
}