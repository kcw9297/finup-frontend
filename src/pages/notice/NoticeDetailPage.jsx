import { useAuth } from "../../base/hooks/useAuth";
import MainLayout from "../../base/layouts/MainLayout";
import NoticeDetail from "../../features/notice/components/NoticeDetail";

export default function NoticeDetailPage() {

  const { isAdmin } = useAuth()

  return (
    <MainLayout>
      <NoticeDetail admin={isAdmin()} />
    </MainLayout>
  )
}