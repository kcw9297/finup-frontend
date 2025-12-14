import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../../base/utils/fetchUtils'

/**
 * 단어 상세 페이지 훅
 * @author khj
 * @since 2025-12-14
 */

export function useWordDetail() {

  // [1] 필요 데이터 선언
  const { termId } = useParams()
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  // [2] 성공 콜백
  const onSuccess = rp => {
    setDetail(rp.data)
  }

  const onFinally = () => {
    setLoading(false)
  }

  // [3] API 요청
  const fetchDetail = () => {
    api.get(`/words/detail/${termId}`, { onSuccess, onFinally })
  }

  // [4] 최초 실행
  useEffect(() => {
    fetchDetail()
  }, [termId])

  // [5] 반환
  return {
    detail,
    loading
  }
}
