import SidebarLayout from "../../base/layouts/SidebarLayout";
import AdminSidebar from "../../base/components/layout/AdminSidebar";
import VideoLinkList from "../../features/videolink/components/VideoLinkList";

/**
 * 관리자용 학습 영상 링크 등록 페이지 컴포넌트
 * @author kcw
 * @since 2025-12-11
 */

export default function AdminVideoLinkListPage() {
  return (
    <SidebarLayout sidebar={<AdminSidebar />}>
      <VideoLinkList />
    </SidebarLayout>
  )
}