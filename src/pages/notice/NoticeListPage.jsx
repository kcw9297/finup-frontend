import { useAuth } from "../../base/hooks/useAuth";
import MainLayout from "../../base/layouts/MainLayout";
import NoticeList from "../../features/notice/components/NoticeList";

export default function NoticeListPage() {

  const { isAdmin } = useAuth()

  return (
    <MainLayout>
      <NoticeList admin={isAdmin()} />
    </MainLayout>
  )
}