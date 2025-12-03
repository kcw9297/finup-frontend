import SidebarLayout from "../../base/layouts/SidebarLayout";
import MypageSidebar from "../../base/components/layout/MypageSidebar";
import MypageMember from "../../features/mypage/components/MypageMember";

/**
 * /mypage/member
 */
export default function MypageMemberPage() {
  return (
    <SidebarLayout sidebar={<MypageSidebar />}>

      <MypageMember />
    </SidebarLayout>
  );
}
