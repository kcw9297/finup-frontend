
// 검색 파라미터
export const DEFAULT_SEARCH_RQ = {
  filter: '',
  keyword: '',
  order: 'latest',
  pageNum: 1,
}

// 검색 키워드 filter
export const FILTER_OPTIONS = [
  { value: "", label: "선택" },
  { value: "name", label: "단어명" },
  { value: "meaning", label: "단어뜻" },
  { value: "nameMeaning", label: "단어명+뜻" },
]

// 정렬 옵션 order
export const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "oldest", label: "과거순" },
  { value: "title", label: "제목순" },
]

// 모달 필드
export const MODAL_FIELDS = [
  { name: 'name', label: '단어명', helperText: '50자 이내 단어명 입력 ' },
  { name: 'meaning', label: '단어뜻', multiline: true, rows: 4, helperText: '10자 이상 100자 이내 단어뜻 입력' },
];