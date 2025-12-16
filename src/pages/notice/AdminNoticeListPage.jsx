import AdminSidebar from "../../base/components/layout/AdminSidebar";
import { useAuth } from "../../base/hooks/useAuth";
import SidebarLayout from "../../base/layouts/SidebarLayout";
import NoticeList from "../../features/notice/components/NoticeList";

export default function AdminNoticeListPage() {

    const { isAdmin } = useAuth()

  return (
    <SidebarLayout sidebar={<AdminSidebar />}>
      <NoticeList admin={isAdmin} />
    </SidebarLayout>
  )
}