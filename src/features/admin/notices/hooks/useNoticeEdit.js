import { useEffect, useState } from "react";
import { useSnackbar } from "../../../../base/provider/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../base/utils/fetchUtils";

export function useNoticeEdit(noticeId, initialData) {

  // [1] 수정 데이터 상태
  const [form, setForm] = useState(() => ({
    title: initialData?.title ?? "",
    content: initialData?.content ?? "",
  }))

  const [loading, setLoading] = useState(false)

  const [loaded, setLoaded] = useState(false)

  const { showSnackbar } = useSnackbar()
  const navigate = useNavigate()



  // [2] 상태 업데이트 함수
  const changeEditRq = (key, value) =>
    setForm(prev => ({ ...prev, [key]: value }));

  // [3] 성공/실패/종료 콜백 정의
  const onSuccess = (rp) => {
    showSnackbar("공지사항이 수정되었습니다.", "success")
    navigate(`/admin/notices/${noticeId}`)
  }

  const onError = (rp) => {
    showSnackbar("공지사항 수정에 실패했습니다.", "error")
  }

  const onFinally = () => {
    setLoading(false)
  }

  // [4] PUT 요청 (수정 요청)
  const submit = async () => {
    await api.put(`/notices/${noticeId}`,
      { admin: true, onSuccess, onError, onFinally }, form)
  }

  // [5] 서버에서 불러온 initialData로 수정 폼 초기화
  useEffect(() => {
    if (!initialData) return;

    Promise.resolve().then(() => {
      setForm({
        title: initialData.title,
        content: initialData.content
      })
    })
  }, [initialData?.title, initialData?.content])

  return { form, loaded, changeEditRq, submit }
}