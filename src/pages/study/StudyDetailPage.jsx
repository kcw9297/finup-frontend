import MainLayout from "../../base/layouts/MainLayout";
import StudyDetail from "../../features/study/components/StudyDetail";

export default function StudyDetailPage() {

  return (
    <MainLayout>
      <StudyDetail admin={false}/>
    </MainLayout>
  )
}