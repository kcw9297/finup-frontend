
// 검색 파라미터
export const DEFAULT_SEARCH_RQ = {
  order: 'levelAsc',
  pageNum: 1
}

export const DEFAULT_SEARCH_RQ_ADMIN = {
  order: 'latest',
  pageNum: 1
}

// 정렬 옵션 order
export const SORT_OPTIONS_ADMIN = [
  { value: "latest", label: "등록순" },
  { value: "levelAsc", label: "쉬운순" },
  { value: "levelDesc", label: "어려운순" },
]

export const SORT_OPTIONS = [
  { value: "levelAsc", label: "쉬운순" },
  { value: "levelDesc", label: "어려운순" },
]

// 모달 필드
export const MODAL_FIELDS = [
  { name: 'name', label: '학습명', helperText: '5자 이상 30자 이내 제목 입력' },
  { name: 'summary', label: '요약', helperText: '5자 이상 30자 이내 제목 입력' },
  { 
    name: 'level', 
    label: '레벨', 
    select: true,  // 셀렉트 활성화
    options: [     // 옵션 목록
      { value: 1, label: '레벨 1' },
      { value: 2, label: '레벨 2' },
      { value: 3, label: '레벨 3' },
      { value: 4, label: '레벨 4' },
      { value: 5, label: '레벨 5' },
    ],
    helperText: '학습 레벨 선택'
  },
  { name: 'detail', label: '설명', multiline: true, rows: 5, helperText: '300자 이내 상세 정보 입력 (AI가 보고 참고하는 정보)' },
];