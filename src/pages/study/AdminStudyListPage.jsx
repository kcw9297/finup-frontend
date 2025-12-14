import AdminSidebar from "../../base/components/layout/AdminSidebar";
import SidebarLayout from "../../base/layouts/SidebarLayout";
import AdminStudyList from "../../features/study/components/AdminStudyList";

export default function AdminStudyListPage() {

  return (
    <SidebarLayout sidebar={<AdminSidebar />}>
      <AdminStudyList />
    </SidebarLayout>
  )
}