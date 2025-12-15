import NoticeList from "../../../features/notice/components/NoticeList";
import SidebarLayout from "../../../base/layouts/SidebarLayout";
import AdminSidebar from "../../../base/components/layout/AdminSidebar";
import { useAuth } from "../../../base/hooks/useAuth";


export default function NoticeListPage() {

  const { isAdmin } = useAuth()

  return (
    <SidebarLayout sidebar={<AdminSidebar />}>
      <NoticeList admin={isAdmin()} />
    </SidebarLayout>
  );
}
