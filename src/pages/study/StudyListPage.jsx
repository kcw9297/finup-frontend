import { useAuth } from "../../base/hooks/useAuth";
import MainLayout from "../../base/layouts/MainLayout";
import StudyList from "../../features/study/components/StudyList"

export default function StudyListPage() {

  const { isAdmin } = useAuth()

  return (
    <MainLayout>
      <StudyList admin={isAdmin()} />
    </MainLayout>
  )
}