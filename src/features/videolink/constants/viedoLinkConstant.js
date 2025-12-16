
// 검색 파라미터
export const DEFAULT_SEARCH_RQ = {
  filter: '',
  keyword: '',
  order: 'latest',
  pageNum: 1,
}

// 검색 키워드 filter
export const FILTER_OPTIONS = [
  { value: "title", label: "영상제목" },
  { value: "channelTitle", label: "채널명" },
  { value: "titleChannelTitle", label: "제목+채널명" },
]

// 정렬 옵션 order
export const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "oldest", label: "과거순" },
  { value: "duration", label: "영상시간순" },
  { value: "popular", label: "인기순" },
]

// 모달 필드
export const MODAL_FIELDS = [
  { name: 'videoUrl', label: '영상 URL', helperText: 'https://www.youtube.com/watch?v=... 형태 유튜브 주소 입력' },
  { name: 'videoInfo', label: '영상 정보', multiline: true, rows: 4, helperText: '유튜브에서 조회된 영상 정보입니다' },
];