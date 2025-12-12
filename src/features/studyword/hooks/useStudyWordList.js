import { useEffect, useRef, useState } from "react";
import { useReloadStore } from "../../../base/stores/useReloadStore";
import { useSearchParams } from "react-router-dom";
import { api } from "../../../base/utils/fetchUtils";
import { DEFAULT_SEARCH_RQ, FILTER_OPTIONS } from "../constants/studyWordConstant";

/**
 * 개념 학습 단어 목록 custom hook
 * @since 2025-12-08
 * @author kcw
 */

export function useStudyWordList({ admin = false }) {

  // [1] 필요 데이터 선언
  const [ searchRp, setSearchRp ] = useState(null) // 검색 결과
  const [ loading, setLoading ] = useState(false) // 로딩 상태
  const [ curKeyword, setCurKeyword ] = useState('') // 검색어 상태 (검색어는 입력해도 바로 검색하지 않음)
  const [ curFilter, setCurFilter ] = useState('') // 필터 상태 (검색어가 입력되지 않으면 검색하지 않음)
  const [ searchParams, setSearchParams ] = useSearchParams() // 검색 파라미터
  const { reloading } = useReloadStore() // 리로딩 감지
  const [ forceReload, setForceReload ] = useState(0) // 같은 파라미터여도 리로딩 처리


  // [2] 필요 함수 선언 
  // Object 생성 함수 (파라미터로부터 직접 뽑아옴)
  const getSearchParams = () => ({
    filter: searchParams.get('filter') || DEFAULT_SEARCH_RQ.filter,
    keyword: searchParams.get('keyword') || DEFAULT_SEARCH_RQ.keyword,
    order: searchParams.get('order') || DEFAULT_SEARCH_RQ.order,
    pageNum: Number(searchParams.get('pageNum')) || DEFAULT_SEARCH_RQ.pageNum,
  })

  // 검색 요청 (현재 URL 기반 초기화 필수)
  const searchRq = getSearchParams()

  // 파라미터 일치 여부 비교 함수
  const isSameRq = (rq) => JSON.stringify(rq) === JSON.stringify(searchRq);


  // 키워드 변경 감지 함수
  const handleKeyword = keyword => {
    setCurKeyword(keyword)
  }


  // 검색 버튼 함수
  const handleSearch = e => {

    // 제출 이벤트 방지
    e.preventDefault()

    // 검증 : 현재 파라미터와 동일한 경우 수행하지 않음
    const nextRq = { ...searchRq, keyword: curKeyword }; // 키워드 반영
    if (isSameRq(nextRq)) return
  
    // 검색 수행
    setSearchParams(nextRq)
  }

  // 필터링 함수
  const handleFilter = filter => {

    // 만약 빈 키워드에서 필터 변경을 요청하면 수행하지 않음
    setCurFilter(filter)
    if (!curKeyword || curKeyword === '') return

    // 다음 요청
    const nextRq = { ...searchRq, filter: curFilter, keyword: curKeyword };

    // 현재 파라미터와 동일한 경우 수행하지 않음
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
    const nextRq = { ...searchRq, order, pageNum: DEFAULT_SEARCH_RQ.pageNum };
    if (isSameRq(nextRq)) return

    // 페이징 파라미터 갱신
    setSearchParams(nextRq) // 새로운 파라미터 삽입 (URL 변경 유도)
  }

  // 검색 데이터 (검색 바 props)
  const searchProps = {
    keyword : curKeyword || '', // 키워드는 검색 버튼을 누르기 전 까지, 최신상태가 아님 (상태 값을 줘야 함)
    filter : curFilter || '',
    onKeywordChange : handleKeyword,
    onFilterChange : handleFilter,
    onSubmit : handleSearch,
    filterOptions : FILTER_OPTIONS,
  }

  // 단어 업데이트 처리
  const handleAfterEdit = (rq) => {
    setSearchRp(prev => ({
      ...prev, 
      data: prev.data.map(word => 
        word.studyWordId === rq.studyWordId 
          ? { ...word, ...rq }
          : word
      )
    }));
  };

  // 단어 삭제 처리
const handleAfterRemove = () => {

  // 삭제 후 현재 페이지에 데이터가 없고, 1페이지이면, 전 페이지로 리로드
  const pagination = searchRp.pagination
  const data = searchRp.data

  if (data.length - 1 === 0 && pagination.pageNum > 1) {
    setSearchParams({ ...searchRq, pageNum: searchRq.pageNum - 1});
  } else {
    setSearchParams(searchRq)
  }
};

   // 단어 파일 업로드 처리
  const handleAfterUploadImageFile = (studyWordId, imageUrl) => {

    setSearchRp(prev => {
      // 변경된 항목만 새 객체 생성
      const editedData = prev.data.map(word => 
        word.studyWordId === studyWordId 
          ? { ...word, imageUrl }
          : word // 변경 없는 항목은 동일 참조 유지
      );
      
      return { ...prev, data: editedData };
    });
  };

  // 단어 파일 삭제 처리
  const handleAfterRemoveImageFile = (studyWordId) => {
    
    setSearchRp(prev => {
      // 변경된 항목만 새 객체 생성
      const editedData = prev.data.map(word => 
        word.studyWordId === studyWordId 
          ? { ...word, imageUrl: "" }
          : word // 변경 없는 항목은 동일 참조 유지
      );
      
      return { ...prev, data: editedData };
    });
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


  // [4] useEffect 및 REST API 요청 함수 선언
  // 리로드 발생 시, 기본 파라미터로 초기화
  useEffect(() => {
    setSearchParams(DEFAULT_SEARCH_RQ)
    setForceReload(prev => prev + 1)
  }, [reloading]);

  // 파라미터 변동 시 검색
  useEffect(() => {
    setLoading(true)
    api.get('/study-words/search', { params: searchRq, onSuccess, onError, onFinally, admin })
  }, [searchParams, forceReload])

  // [5] 반환
  return {
    searchRq, searchRp, loading, searchProps, 
    handleKeyword, handleSearch, handleFilter, handlePage, handleOrder, 
    handleAfterEdit, handleAfterRemove, handleAfterUploadImageFile, handleAfterRemoveImageFile
  }
}