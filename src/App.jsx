import { Routes, Route, useNavigate } from 'react-router-dom'
import ProtectedRoute from '../src/base/routes/ProtectedRoute'
import GuestRoute from '../src/base/routes/GuestRoute'
import { useSnackbar } from './base/provider/SnackbarProvider'
import { useLoginMember } from './base/hooks/useLoginMember'
import { useEffect, useLayoutEffect } from 'react'
import { initGlobalHook } from './base/config/globalHookConfig'
import { useBookmark } from './base/hooks/useBookmark'
import { useStudyProgress } from './base/hooks/useStudyProgress'
import EmptyLayout from './base/layouts/EmptyLayout'
import MainLayout from './base/layouts/MainLayout'
import SidebarLayout from './base/layouts/SidebarLayout'
import AdminSidebar from './features/admin/components/AdminSidebar'
import MypageSidebar from './features/mypage/components/MypageSidebar'
import MemberList from "./features/member/components/MemberList";
import AuthLogin from './features/auth/components/AuthLogin'
import MemberJoin from './features/member/components/MemberJoin'
import BookmarkListPageUnit from "./features/mypage/components/BookmarkListPageUnit";
import MypageMember from "./features/mypage/components/MypageMember";
import NewsList from './features/news/components/NewsList'
import NoticeDetail from './features/notice/components/NoticeDetail'
import NoticeList from './features/notice/components/NoticeList'
import StocksList from './features/stocks/components/StocksList'
import StocksDetail from './features/stocks/components/StocksDetail'
import StudyWordList from './features/studyword/components/StudyWordList'
import AdminStudyList from './features/study/components/AdminStudyList'
import StudyDetail from './features/study/components/StudyDetail'
import StudyList from './features/study/components/StudyList'
import VideoLinkList from './features/videolink/components/VideoLinkList'
import WordLayout from './features/word/layout/WordLayout'
import WordSearch from './features/word/components/WordSearch'
import WordHome from './features/word/components/WordHome'
import WordDetail from './features/word/components/WordDetail'
import Home from './features/home/components/Home'
import WordSidebar from './features/word/components/WordSidebar'


export default function App() {

  // [1] 전역 상태를 관리하는 Hooks
  const { // 인증 훅    
    authenticate, isAdmin, logout, isAuthenticated
  } = useLoginMember()

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
    <Routes>
      {/* EmptyLayout - Header/Footer 없음 (로그인/회원가입) */}
      <Route element={<EmptyLayout />}>
        <Route path="/login" element={<GuestRoute><AuthLogin /></GuestRoute>} />
        <Route path="/join" element={<GuestRoute><MemberJoin /></GuestRoute>} />
      </Route>

      {/* MainLayout - Header/Footer 공통 적용 */}
      <Route element={<MainLayout />}>

        {/* 사이드바 없는 일반 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/news/list" element={<NewsList />} />
        <Route path="/stocks" element={<StocksList />} />
        <Route path="/stocks/detail/:code" element={<ProtectedRoute><StocksDetail /></ProtectedRoute>} />
        <Route path="/studies" element={<ProtectedRoute><StudyList admin={isAdmin()} /></ProtectedRoute>} />
        <Route path="/studies/:studyId" element={<ProtectedRoute><StudyDetail admin={isAdmin()} /></ProtectedRoute>} />
        <Route path="/notices" element={<NoticeList admin={isAdmin()} />} />
        <Route path="/notices/detail/:noticeId" element={<NoticeDetail admin={isAdmin()}/>} />

        {/* 마이페이지 - 왼쪽 사이드바 */}
        <Route element={<SidebarLayout sidebar={<MypageSidebar />} />}>
          <Route path="/mypage" element={<ProtectedRoute><MypageMember /></ProtectedRoute>} />
          <Route path="/mypage/bookmarks" element={<ProtectedRoute><BookmarkListPageUnit /></ProtectedRoute>} />
        </Route>

        {/* 단어장 - 오른쪽 사이드바 + 추가 헤더 */}
        <Route element={<SidebarLayout sidebar={<WordSidebar />} sidebarPosition="right" maxWidth={1300} sidebarWidth={260} />}>
          <Route element={<WordLayout />}>
            <Route path="/words" element={<WordHome />} />
            <Route path="/words/search" element={<WordSearch />} />
            <Route path="/words/detail/:termId" element={<WordDetail />} />
          </Route>
        </Route>

        {/* 관리자 - 왼쪽 사이드바 */}
        <Route element={<SidebarLayout sidebar={<AdminSidebar />} />}>
          <Route path="/admin/notices" element={<ProtectedRoute allowedRoles="ADMIN"><NoticeList admin={isAdmin()} /></ProtectedRoute>} />
          <Route path="/admin/members" element={<ProtectedRoute allowedRoles="ADMIN"><MemberList /></ProtectedRoute>} />
          <Route path="/admin/studies" element={<ProtectedRoute allowedRoles="ADMIN"><AdminStudyList /></ProtectedRoute>} />
          <Route path="/admin/study-words" element={<ProtectedRoute allowedRoles="ADMIN"><StudyWordList admin={isAdmin()} /></ProtectedRoute>} />
          <Route path="/admin/video-links" element={<ProtectedRoute allowedRoles="ADMIN"><VideoLinkList admin={isAdmin()} /></ProtectedRoute>} />
        </Route>
      </Route>
    </Routes>
  )
}