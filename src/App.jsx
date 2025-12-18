import { Routes, Route, useNavigate } from 'react-router-dom'
import ProtectedRoute from '../src/base/routes/ProtectedRoute'
import GuestRoute from '../src/base/routes/GuestRoute'
import AuthLoginPage from './pages/auth/AuthLoginPage'
import HomePage from './pages/home/HomePage'
import { useSnackbar } from './base/provider/SnackbarProvider'
import { useAuth } from './base/hooks/useAuth'
import { useEffect, useLayoutEffect } from 'react'
import { initGlobalHook } from './base/config/globalHookConfig'
import ReboardSearchPage from './pages/reboard/ReboardSearchPage'
import MemberListPage from './pages/admin/member/MemberListPage'
import NewsPage from './pages/news/NewsPage'
import ConceptListPage from './pages/concept/ConceptListPage'
import StocksListPage from './pages/stocks/StocksListPage'
import StocksDetailPage from './pages/stocks/StocksDetailPage'
import StocksChartPage from './pages/stocks/StocksChartPage'
import MypageMemberPage from "./pages/mypage/MypageMemberPage";
import AdminVideoLinkListPage from './pages/videolink/AdminVideoLinkListPage'
import AdminStudyListPage from './pages/study/AdminStudyListPage'
import StudyDetailPage from './pages/study/StudyDetailPage'
import AdminStudyWordListPage from './pages/studyword/AdminStudyWordListPage'
import MemberJoinPage from './pages/member/MemberJoinPage';
import StudyListPage from './pages/study/StudyListPage';
import { useBookmark } from './base/hooks/useBookmark'
import { useStudyProgress } from './base/hooks/useStudyProgress'
import { elements } from 'chart.js'
import WordVocaPage from './pages/wordVoca/WordVocaPage'
import WordSearchPage from './pages/wordVoca/WordSearchPage'
import WordDetailPage from './pages/wordVoca/WordDetailPage'
import AdminNoticeListPage from './pages/notice/AdminNoticeListPage'
import NoticeListPage from './pages/notice/NoticeListPage'
import NoticeDetailPage from './pages/notice/NoticeDetailPage'
import { path } from 'd3'
import MypageBookmarkPage from './pages/mypage/MypageBookmarkPage'



// 자식이 없는 단순 라우팅 리스트
const simpleRoutes = [
  { path: '/', element: <HomePage /> }, // 모두 공개
  { path: '/login', element: <GuestRoute><AuthLoginPage /></GuestRoute> }, // 비회원 공개
  { path: '/join', element: <GuestRoute><MemberJoinPage /></GuestRoute> }, // 회원가입 페이지
  { path: '/concept/list', element: <ConceptListPage /> }, //임시 모두공개
]

// 자식이 있는 라우팅 리스트
const nastedRoutes = [

  {
    path: '/reboard/*', // url : 게시판
    children: [
      { path: 'search', element: <ReboardSearchPage /> }, // 모두 공개
      { path: 'detail/:idx', element: <AuthLoginPage /> }, // 모두 공개
      { path: 'write', element: <ProtectedRoute><AuthLoginPage /></ProtectedRoute> }, // 회원 공개
      { path: 'edit/:idx', element: <ProtectedRoute><AuthLoginPage /></ProtectedRoute> }, // 회원 공개 (작성자 검증은 Page 컴포넌트 내에서)
    ]
  },
  {
    path: '/news/*', // url : 뉴스
    children: [
      { path: 'list', element: <NewsPage /> }, // 모두 공개
    ]
  },

  {
    path: '/admin/*', // url : 관리자 공지사항
    children: [
      // url : 관리자 공지사항
      { path: 'notices/', element: <ProtectedRoute allowedRoles="ADMIN"><AdminNoticeListPage /></ProtectedRoute> },

      // url : 회원 목록
      { path: 'members', element: <ProtectedRoute allowedRoles="ADMIN"><MemberListPage /></ProtectedRoute> },

      // url : 개념 학습 관리
      { path: "studies", element: <ProtectedRoute allowedRoles="ADMIN"><AdminStudyListPage /></ProtectedRoute> },

      // url : 개념 단어 관리
      { path: "study-words", element: <ProtectedRoute allowedRoles="ADMIN"><AdminStudyWordListPage /></ProtectedRoute> },

      // url : 유튜브 영상
      { path: "video-links", element: <ProtectedRoute allowedRoles="ADMIN"><AdminVideoLinkListPage /></ProtectedRoute> },

    ]
  },

  {
    path: '/notices/*',
    children: [
      // url : 공지사항 (모두 공개)
      { path: '', element: <NoticeListPage /> },
      { path: 'detail/:noticeId', element: <NoticeDetailPage /> },
    ]
  },

  {
    path: '/studies/*',
    children: [
      // url : 학습 목록
      { path: '', element: <ProtectedRoute><StudyListPage /></ProtectedRoute> },
      { path: ":studyId", element: <ProtectedRoute><StudyDetailPage /></ProtectedRoute> },
    ]
  },

  {
    path: '/stocks/*', //url : 종목 +
    children: [
      { path: '', element: <ProtectedRoute><StocksListPage /></ProtectedRoute> }, // 모두 공개
      { path: 'detail/:code', element: <ProtectedRoute><StocksDetailPage /></ProtectedRoute> },
      { path: 'chart', element: <ProtectedRoute><StocksChartPage /></ProtectedRoute> }
    ]
  },

  {
    path: "/words/*", // url : 단어장 +
    children: [
      { path: '', element: <WordVocaPage /> },
      { path: 'search', element: <WordSearchPage /> },
      { path: 'detail/:termId', element: <WordDetailPage /> }
    ]
  },

  {
    path: '/mypage/*',
    children: [
      { path: '', element: <ProtectedRoute><MypageMemberPage /></ProtectedRoute> },
      { path: 'bookmarks', element: <ProtectedRoute><MypageBookmarkPage /></ProtectedRoute> },
    ]
  },
];


export default function App() {

  // [1] 전역 상태를 관리하는 Hooks
  const { // 인증 훅    
    authenticate, logout, isAuthenticated
  } = useAuth()

  const { // 북마크 전역 상태를 관리하는 훅
    loadBookmark, clearBookmark
  } = useBookmark()

  const { // 진도 전역 상태를 관리하는 훅
    loadStudyProgress, clearStudyProgress
  } = useStudyProgress()


  // 페이지 마운트 시, 전역적으로 사용할 함수 로드
  const navigate = useNavigate()          // redirect 수행할 네비게이션
  const { showSnackbar } = useSnackbar()  // 스낵바 활성화 함수

  // 렌더링 전에 동기적 실행 보장
  useLayoutEffect(() => {
    initGlobalHook(navigate, showSnackbar, logout)
  }, [navigate, showSnackbar])

  // 페이지 로드 시, 반드시 수행
  useEffect(() => {
    authenticate()
  }, [])

  // 인증 상태가 변경될 시 수행
  useEffect(() => {
    if (isAuthenticated) {
      loadBookmark()
      loadStudyProgress()
    } else {
      clearBookmark()
      clearStudyProgress()
    }
  }, [isAuthenticated])

  return (
    <>
      <Routes>

        {/* 단순 라우트 */}
        {
          simpleRoutes.map(({ path, element, roles }) => (
            <Route key={path} path={path} element={element} />
          ))
        }

        {/* 자식이 있는 라우트 */}
        {
          nastedRoutes.map(({ path, layout, roles, children }) =>
            <Route key={path} path={path} element={layout} >
              {children.map((child) => (<Route key={child.path} path={child.path} element={child.element} />))}
            </Route>
          )
        }


      </Routes>
    </>
  )
}
