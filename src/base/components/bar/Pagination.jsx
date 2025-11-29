import { useSearchParams, useNavigate } from "react-router-dom";
import './Pagination.css'

// 페이지 파라미터 설정
function setPageParams(pagination, params, isPrev, isGroup) {

    if (isGroup) {
      if (isPrev) params.set('pageNum', pagination.prevGroupPage);
      else params.set('pageNum', pagination.nextGroupPage);

    } else {
      if (isPrev) params.set('pageNum', pagination.prevPage);
      else params.set('pageNum', pagination.nextPage);
    }
    
    return params.toString();
};


// 페이징 바
function Pagination({ pagination }) {

  // Hook
  const navigate = useNavigate()

  // 현재 파라미터 
  const [ searchParams ] = useSearchParams()
  const params = new URLSearchParams(searchParams); // 'useSearchParams' 는 읽기 전용이므로 새롭게 생성해야 함

  // 그룹 페이징 핸들링 함수
  const handleGroupPage = (isPrev, isGroup = false) => {

    // 쿼리스트링 생성
    const queryString = setPageParams(pagination, params, isPrev, isGroup)

    // 페이지 이동 수행
    navigate(`?${queryString}`, { preventScrollReset: false }); // (스크롤 이동 방지를 원하면 true)
  }

  // 일반 페이징 핸들링 함수
  const handlePage = (page) => {

    // 쿼리스트링 생성
    params.set('pageNum', page);
    const queryString = params.toString()

    // 페이지 이동 수행
    navigate(`?${queryString}`, { preventScrollReset: false }); // (스크롤 이동 방지를 원하면 true)
  }

  // 페이지 버튼 렌더링 함수
  const currentPage = Number(searchParams.get('pageNum')) || 1;
  const pageButtons = []
  for (let page = pagination.curGroupStartPage; page <= pagination.curGroupEndPage; page++)
    pageButtons.push(
      <button
        key={page}  
        type="button" 
        className={`page-btn ${page === currentPage ? 'active' : ''}`}  // 수정
        onClick={() => handlePage(page)}>{page}</button>
    )

  // 페이징 바 렌더링
  return (<div className='pagination'>
    {!pagination.startPage && (
      <button 
        type="button" 
        className={`page-btn group`} 
        onClick={() => handleGroupPage(true, true)}>◄◄</button>
    )}
    {!pagination.startPage && (
      <button 
        type="button" 
        className={`page-btn group`} 
        onClick={() => handleGroupPage(true, false)}>◄</button>
    )}
    {pageButtons}
    {!pagination.isEndPage && (
      <button 
        type="button" 
        className={`page-btn group`} 
        onClick={() => handleGroupPage(false, false)}>►</button>
    )}
    {!pagination.isEndPage && (
      <button 
        type="button" 
        className={`page-btn group`} 
        onClick={() => handleGroupPage(false, true)}>►►</button>
    )}
  </div>)
};

export default Pagination