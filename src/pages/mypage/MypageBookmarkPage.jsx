import MypageSidebar from "../../base/components/layout/MypageSidebar";
import SidebarLayout from "../../base/layouts/SidebarLayout";
import BookmarkList from "../../features/mypage/components/BookmarkList";
import BookmarkListPageUnit from "../../features/mypage/components/BookmarkListPageUnit";

export default function MypageBookmarkPage() {

  return (
    <SidebarLayout sidebar={<MypageSidebar />}>
      <BookmarkListPageUnit />
    </SidebarLayout>
  )

}
