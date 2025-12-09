import SidebarLayout from "../../../base/layouts/SidebarLayout";
import AdminSidebar from "../../../base/components/layout/AdminSidebar";
import YoutubeEdit from "../../../features/admin/youtube/components/YoutubeEdit";
export default function YoutubeListPage() {
  return (
    <SidebarLayout sidebar={<AdminSidebar />}>
      <YoutubeEdit />
    </SidebarLayout>
  )
}