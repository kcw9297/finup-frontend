import { Routes, Route, useNavigate } from 'react-router-dom'
import ProtectedRoute from '../src/base/routes/ProtectedRoute'
import GuestRoute from '../src/base/routes/GuestRoute'
import AuthLoginPage from './pages/auth/AuthLoginPage'
import HomePage from './pages/home/HomePage'
import { useSnackbar } from './base/provider/SnackbarProvider'
import { useAuth } from './base/hooks/useAuth'
import { useEffect } from 'react'
import { useAuthStore } from './base/stores/useAuthStore'
import { initGlobalHook } from './base/config/globalHookConfig'
import ReboardSearchPage from './pages/reboard/ReboardSearchPage'
import NoticeListPage from './pages/admin/notices/NoticeListPage'
import NoticeDetailPage from './pages/admin/notices/NoticeDetailPage'
import NoticeEditPage from './pages/admin/notices/NoticeEditPage'
import NoticeWritePage from './pages/admin/notices/NoticeWritePage'
import MemberListPage from './pages/admin/member/MemberListPage'
import NewsPage from './pages/news/NewsPage'
import ConceptListPage from './pages/concept/ConceptListPage'
import StocksListPage from './pages/stocks/StocksListPage'
import StocksDetailPage from './pages/stocks/StocksDetailPage'
import MypageMemberPage from "./pages/mypage/MypageMemberPage";
import WordHomePage from './pages/word/WordHomePage'
import WordSearchPage from './pages/word/WordSearchPage'
import WordDetailPage from './pages/word/WordDetailPage'
import AuthSignupPage from './pages/auth/AuthSignupPage'
import YoutubeVideoWritePage from './pages/admin/youtube/YoutubeVideoWritePage'
import YoutubeListPage from './pages/admin/youtube/YoutubeListPage'
import AdminStudyListPage from './pages/admin/study/AdminStudyListPage'
import AdminStudyDetailPage from './pages/admin/study/AdminStudyDetailPage'
import YoutubeEditPage from './pages/admin/youtube/YoutubeEditPage'

// 자식이 없는 단순 라우팅 리스트
const simpleRoutes = [
  { path: '/', element: <HomePage /> }, // 모두 공개
  { path: '/login', element: <GuestRoute><AuthLoginPage /></GuestRoute> }, // 비회원 공개
  { path: '/signup', element: <GuestRoute><AuthSignupPage /></GuestRoute> },
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
      { path: 'notices/', element: <ProtectedRoute allowedRoles="ADMIN"><NoticeListPage /></ProtectedRoute> },
      { path: 'notices/:noticeId', element: <ProtectedRoute allowedRoles="ADMIN"><NoticeDetailPage /></ProtectedRoute> },
      { path: 'notices/:noticeId/edit', element: <ProtectedRoute allowedRoles="ADMIN"><NoticeEditPage /></ProtectedRoute> },
      { path: 'notices/write', element: <ProtectedRoute allowedRoles="ADMIN"><NoticeWritePage /></ProtectedRoute> },

      // url : 회원 목록
      { path: 'members', element: <ProtectedRoute allowedRoles="ADMIN"><MemberListPage /></ProtectedRoute> },

      // url : 유튜브 영상
      { path: "youtube", element: <ProtectedRoute allowedRoles="ADMIN"><YoutubeListPage /></ProtectedRoute> },
      { path: "youtube/write", element: <ProtectedRoute allowedRoles="ADMIN"><YoutubeVideoWritePage /></ProtectedRoute> },
      { path: "youtube/:videoLinkId/edit", element: <ProtectedRoute allowedRoles="ADMIN"><YoutubeEditPage /></ProtectedRoute> },
      // url : 단계 개념 관리
      { path: "studies", element: <ProtectedRoute allowedRoles="ADMIN"><AdminStudyListPage /></ProtectedRoute> },
      { path: "studies/:studyId", element: <ProtectedRoute allowedRoles="ADMIN"><AdminStudyDetailPage /></ProtectedRoute> },
    ]
  },

  {
    path: '/admin/*',
    children: [

    ]
  },


  {
    path: '/stocks/*', //url : 종목 +
    children: [
      { path: '', element: <StocksListPage /> }, // 모두 공개
      { path: 'detail/:code', element: <StocksDetailPage /> },
    ]
  },


  {
    path: '/mypage/*',
    children: [
      {
        path: 'member',
        element: <MypageMemberPage />
      }
    ]
  },

  {
    path: '/words/*',
    children: [
      { path: '', element: <WordHomePage /> },         // 모두공개
      { path: 'search', element: <WordSearchPage /> }, // 무두공개
      { path: ':wordId', element: <WordDetailPage /> } // 모두공개
    ]
  },
];



export default function App() {

  // 페이지 마운트 시, 최초 1회 로그인 검증
  const { authenticate } = useAuth()
  const { isAuthenticated, loginMember, logout } = useAuthStore()

  // 페이지 마운트 시, 전역적으로 사용할 함수 로드
  const navigate = useNavigate()          // redirect 수행할 네비게이션
  const { showSnackbar } = useSnackbar()  // 스낵바 활성화 함수

  useEffect(() => {
    authenticate()
    console.log("현재 로그인 상태 : ", isAuthenticated);
    initGlobalHook(navigate, showSnackbar, logout)
  }, [location.pathname])

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


      </Routes >
    </>
  )
}
