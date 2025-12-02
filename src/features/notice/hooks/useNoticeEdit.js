import { useEffect, useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import { api } from "../../../base/utils/fetchUtils";

export function useNoticeEdit(noticeId, initialData) {

  // [1] 수정 데이터 상태
  const [form, setForm] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
  })

  const [loading, setLoading] = useState(false)

  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // [2] 상태 업데이트 함수
  const changeEditRq = (rq) =>
    setForm(prev => ({ ...prev, ...rq }));

  // [3] 성공/실패/종료 콜백 정의
  const onSuccess = (rp) => {
    showSnackbar("공지사항이 수정되었습니다.", "success")
    navigate(`/notices/${noticeId}`)
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
      form,
      { admin: true, onSuccess, onError, onFinally })
  }
  /* 수정 예정
    // [5] initialData가 로딩 완료되면 자동으로 폼 초기화
    useEffect(() => {
      if (!initialData) return;
  
      setForm(prev => {
        // 이전 값과 동일하다면 setState 실행하지 않음
        if (
          prev.title === initialData.title &&
          prev.content === initialData.content
        ) {
          return prev;
        }
  
        return {
          title: initialData.title || "",
          content: initialData.content || "",
        };
      });
  
    }, [initialData]);
    // 딱 이거만 있으면 React가 완벽하다고 판단
  
  */

  return { form, loading, changeEditRq, submit }
}