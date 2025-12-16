
// 검색 파라미터
export const DEFAULT_SEARCH_RQ = {
  keyword: "",
  filter: "",
  order: 'latest',
  pageNum: 1,
  pageSize: 5
}

// 필터 옵션 filter
export const FILTER_OPTIONS = [
  { value: "title", label: "제목" },
  { value: "content", label: "내용" },
  { value: "titleContent", label: "제목+내용" },
]

// 정렬 옵션 order
export const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "oldest", label: "과거순" },
]

// 모달 필드
export const MODAL_FIELDS = [
  { name: 'title', label: '제목', helperText: '30자 이내 제목 입력 (특수문자 제외)' },
  { name: 'content', label: '본문', multiline: 5, rows: 5, helperText: '1000자 이내 본문 입력' },
];

// 공지사항 작성일 렌더링 함수
export function formatDetailDate(dateString) {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatListDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }