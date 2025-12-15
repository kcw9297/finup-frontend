import { useAuth } from "../../base/hooks/useAuth";
import MainLayout from "../../base/layouts/MainLayout";
import StudyDetail from "../../features/study/components/StudyDetail";

export default function StudyDetailPage() {

  const { isAdmin } = useAuth()

  return (
    <MainLayout>
      <StudyDetail admin={isAdmin()}/>
    </MainLayout>
  )
}