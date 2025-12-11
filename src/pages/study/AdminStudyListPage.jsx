import AdminSidebar from "../../base/components/layout/AdminSidebar";
import SidebarLayout from "../../base/layouts/SidebarLayout";
import StudyList from "../../features/study/components/StudyList";

export default function AdminStudyListPage() {

  return (
    <SidebarLayout sidebar={<AdminSidebar />}>
      <StudyList admin={true} />
    </SidebarLayout>
  )
}