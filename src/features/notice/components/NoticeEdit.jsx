import { useNavigate, useParams } from "react-router-dom";
import { useNoticeDetail } from "../hooks/useNoticeDetail";


export default function NoticeEdit() {
  const { noticeId } = useParams()
  const navigate = useNavigate()

  // 상세 조회 훅
  const { detailRp, changeDetailRq, loading } = useNoticeDetail()

  // 수정할 입력 상태

}