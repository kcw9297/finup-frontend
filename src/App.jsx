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
import NoticeSummaryPage from './pages/notice/NoticeSummaryPage'
import NoticeDetailPage from './pages/notice/NoticeDetailPage'
import NewsPage from './pages/news/NewsPage'
import NewsModalPage from './pages/news/NewsModalPage'
import ConceptListPage from './pages/concept/ConceptListPage'
import StocksListPage from './pages/stocks/StocksListPage'
import StocksDetailPage from './pages/stocks/StocksDetailPage'
import NoticeEditPage from './pages/notice/NoticeEditPage'

// 자식이 없는 단순 라우팅 리스트
const simpleRoutes = [
  { path: '/', element: <HomePage /> }, // 모두 공개
  { path: '/login', element: <GuestRoute><AuthLoginPage /></GuestRoute> }, // 비회원 공개
  { path: '/concept/list', element: <ConceptListPage /> }, //개념학습 페이지

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
      { path: 'detail', element: <NewsModalPage /> }, // 회원공개로 전환예정
    ]
  },

  {
    path: '/admin/*', // url : 관리자
    children: [
      { path: 'notices', element: <ProtectedRoute><NoticeSummaryPage /></ProtectedRoute> },
      { path: 'notices/:noticeId', element: <ProtectedRoute><NoticeDetailPage /></ProtectedRoute> },
      { path: 'notices/:noticeId/edit', element: <ProtectedRoute><NoticeEditPage /></ProtectedRoute> }
    ]
  },

  {
    path: '/stocks/*', //url : 종목 +
    children: [
      { path: '', element: <StocksListPage /> }, // 모두 공개
      { path: 'detail', element: <StocksDetailPage /> },
    ]
  }

]


export default function App() {

  // 페이지 마운트 시, 최초 1회 로그인 검증
  const { authenticate } = useAuth()
  const { isAuthenticated, loginMember } = useAuthStore()

  // 페이지 마운트 시, 전역적으로 사용할 함수 로드
  const navigate = useNavigate()          // redirect 수행할 네비게이션
  const { showSnackbar } = useSnackbar()  // 스낵바 활성화 함수

  useEffect(() => {
    authenticate()
    console.log("현재 로그인 상태 : ", isAuthenticated);
    initGlobalHook(navigate, showSnackbar)
  }, [])

  return (
    <>
      <Routes>

        {/* 단순 라우트 */}
        {simpleRoutes.map(({ path, element, roles }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* 자식이 있는 라우트 */}
        {nastedRoutes.map(({ path, layout, roles, children }) =>
          <Route key={path} path={path} element={layout} >
            {children.map((child) => (<Route key={child.path} path={child.path} element={child.element} />))}
          </Route>
        )}


      </Routes>
    </>
  )
}
