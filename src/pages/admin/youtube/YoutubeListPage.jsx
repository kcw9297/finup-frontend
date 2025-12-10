import MainLayout from "../../../base/layouts/MainLayout";
import YoutubeList from "../../../features/admin/youtube/components/YoutubeList";
import SidebarLayout from "../../../base/layouts/SidebarLayout";
import AdminSidebar from "../../../base/components/layout/AdminSidebar";
export default function YoutubeListPage() {
  return (
    <SidebarLayout sidebar={<AdminSidebar />}>
      <YoutubeList />
    </SidebarLayout>
  )
}