import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useSearchParams } from "react-router-dom";
import { useReloadStore } from "../../../base/stores/useReloadStore";
import { DEFAULT_SEARCH_RQ, DEFAULT_SEARCH_RQ_ADMIN } from "../constants/studyConstant";


/**
 * 관리자용 단계별 학습 리스트 훅
 * @since 2025-12-08
 * @author kcw
 */

export function useAdminStudyList() {

  // [1] 필요 데이터 선언
  const [ searchRp, setSearchRp ] = useState(null) // 검색 결과
  const [ loading, setLoading ] = useState(true) // 로딩 상태
  const [ searchParams, setSearchParams ] = useSearchParams() // 검색 파라미터
  const { reloading } = useReloadStore() // 리로딩 감지
  const [ forceReload, setForceReload ] = useState(0) // 같은 파라미터여도 리로딩 처리
  
  // [2] 필요 함수 선언 
  // Object 생성 함수 (파라미터로부터 직접 뽑아옴)
  const getSearchParams = () => ({
    filter: searchParams.get('filter') || '',
    keyword: searchParams.get('keyword') || '',
    order: searchParams.get('order') || DEFAULT_SEARCH_RQ_ADMIN.order,
    pageNum: Number(searchParams.get('pageNum')) || DEFAULT_SEARCH_RQ_ADMIN.pageNum,
  })

  // 검색 요청 (현재 URL 기반 초기화 필수)
  const searchRq = getSearchParams()

  // 파라미터 일치 여부 비교 함수
  const isSameRq = (rq) => JSON.stringify(rq) === JSON.stringify(getSearchParams());

  // 검색 버튼 함수
  const handleSearch = e => {

    // 제출 이벤트 방지
    e.preventDefault()

    // 검증 : 현재 파라미터와 동일한 경우 수행하지 않음
    if (isSameRq(searchRq)) return

    // 검색 수행
    setSearchParams(searchRq)
  }

  // 필터링 함수
  const handleFilter = filter => {

    // 검증 : 현재 파라미터와 동일한 경우 수행하지 않음
    const nextRq = { ...searchRq, keyword: searchRq.keyword, filter };
    if (isSameRq(nextRq)) return // 필터 변경 시, 같은 필터거나, 키워드가 없으면 검색 미수행
    
    // 검색 수행
    setSearchParams(nextRq) // 새로운 파라미터 삽입 (URL 변경 유도)
  }


  // 페이징 함수
  const handlePage = pageNum => {

    // 검증 : 현재 파라미터와 동일한 경우 수행하지 않음
    const nextRq = { ...searchRq, pageNum };
    if (isSameRq(nextRq)) return

    // 페이징 파라미터 갱신
    setSearchParams(nextRq) // 새로운 파라미터 삽입 (URL 변경 유도)
  }


  // 정렬 함수
  const handleOrder = order => {
    
    // 검증 : 현재 파라미터와 동일한 경우 수행하지 않음
    const nextRq = { ...searchRq, order, pageNum: DEFAULT_SEARCH_RQ_ADMIN.pageNum };
    if (isSameRq(nextRq)) return

    // 페이징 파라미터 갱신
    setSearchParams(nextRq) // 새로운 파라미터 삽입 (URL 변경 유도)
  }

  // 학습 업데이트 처리
  const handleAfterEdit = (rq) => {
    setSearchRp(prev => ({
      ...prev, 
      data: prev.data.map(study => 
        study.studyId === rq.studyId 
          ? { ...study, ...rq }
          : study
      )
    }));
  };

  // 학습 삭제 처리
  const handleAfterRemove = () => {

    // 삭제 후 현재 페이지에 데이터가 없고, 1페이지이면, 전 페이지로 리로드
    const pagination = searchRp.pagination
    const data = searchRp.data

    if (data.length - 1 === 0 && pagination.pageNum > 1) {
      setSearchParams({ ...searchRq, pageNum: searchRq.pageNum - 1});
    } else {
      setForceReload(prev => prev + 1) // 페이지 조정이 없다면, 강제 리로드만 수행
    }
  };


  // [3] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    setSearchRp(rp)
  }

  const onError = rp => {
    setSearchRp(null) // 검색 결과 제거
  }

  const onFinally = () => {
    setLoading(false) // 로딩 상태 해제
  }

  // [4] API 요청 함수 정의

  // URL 변경 시 입력 필드 동기화
  useEffect(() => {
    
    // 최초 접근이면 수행하지 않음
    if (reloading == 0) return

    // 파라미터 비교 (현재 URL이 기본 검색 파라미터인가?)
    const isDefaultParams = isSameRq(DEFAULT_SEARCH_RQ_ADMIN);
  
    // 이미 같은 파라미터이면, 강제 리로드 번호만 올림
    if (isDefaultParams) setForceReload(prev => prev + 1)
    else setSearchParams(DEFAULT_SEARCH_RQ_ADMIN)

  }, [reloading]);

  // 검색의 경우, 페이지 입장 시 초기 값이 필요하므로, useEffect 사용
  useEffect(() => {
    setLoading(true)
    api.get('/studies/search', { params: searchRq, onSuccess, onError, onFinally, admin: true })
  }, [searchParams, forceReload])
  

  // [5] 반환
  return {
    searchRq, searchRp, loading,
    handleSearch, handleFilter, handlePage, handleOrder,
    handleAfterEdit, handleAfterRemove
  }
}
