import { useState } from "react";
import AdminSidebar from "../../../base/components/layout/AdminSidebar";
import SidebarLayout from "../../../base/layouts/SidebarLayout";
import AdminStudyList from "../../../features/admin/study/components/AdminStudyList";
import { api } from "../../../base/utils/fetchUtils";
import FormModal from "../../../base/components/modal/FormModal";

export default function AdminStudyListPage() {

  // 모달 오픈 상태
  const [writeModalOpen, setWriteModalOpen] = useState(false);

  // 모달 필드
  const writeModalFields = [
    { name: 'name', label: '학습명' },
    { name: 'summary', label: '요약' },
    { name: 'description', label: '본문' },
    { name: 'level', label: '레벨', type: 'number' },
  ];

  // 모달 제출 옵션 (API 요청을 위한 정보)
  const writeModalSubmit = {
    endpoint: '/studies',
    method: 'POST',
    admin: true,
  }

  return (
    <>
      {/* 컴포넌트 조립 영역 */}
      <SidebarLayout sidebar={<AdminSidebar />}>
        <AdminStudyList onOpenWriteModal={() => setWriteModalOpen(true)}  />
      </SidebarLayout>

      {/* 모달 영역 */}
      <FormModal
        open={writeModalOpen}
        setOpen={setWriteModalOpen} // 모달 상태관리 함수 전달
        title="학습 등록" // 모달 제목
        fields={writeModalFields} // 모달에 등록할 필드
        submitText="등록"
        submit={writeModalSubmit}
      />

    </>
  )
}