import AdminSidebar from "../../../base/components/layout/AdminSidebar";
import SidebarLayout from "../../../base/layouts/SidebarLayout";
import StudyDetail from "../../../features/study/components/StudyDetail";

export default function AdminStudyDetailPage() {

  return (
    <SidebarLayout sidebar={<AdminSidebar />}>
      <StudyDetail admin={true} />
    </SidebarLayout>
  )
}