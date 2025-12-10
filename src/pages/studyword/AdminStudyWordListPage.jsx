import AdminSidebar from "../../base/components/layout/AdminSidebar";
import SidebarLayout from "../../base/layouts/SidebarLayout";
import StudyWordList from "../../features/studyword/components/StudyWordList"

export default function AdminStudyWordListPage() {

  return (
    <SidebarLayout sidebar={<AdminSidebar />}>
      <StudyWordList admin={true} />
    </SidebarLayout>
  )
}