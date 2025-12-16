import MypageSidebar from "../../base/components/layout/MypageSidebar";
import SidebarLayout from "../../base/layouts/SidebarLayout";
import MypageBookmarkList from "../../features/mypage/components/MypageBookmarkList";

export default function MypageBookmarkPage() {

  return (
    <SidebarLayout sidebar={<MypageSidebar />}>
      <MypageBookmarkList />
    </SidebarLayout>
  )

}
