import { Box } from "@mui/material";

import MainLayout from "../../base/layouts/MainLayout";

import { useHomePage } from "./useHomePage";
import Notice from "./Notice";
import Banner from "./Banner";
import ExchangeRate from "./ExchangeRate";

export default function HomePage() {

  // 공지사항 목록
  const noticeList = ["서버 점검 안내(25.12.01)", "신규 기능 업데이트 안내", "서비스 이용 시 유의 사항"]
  const {noticeCurrent, fade, showNext} = useHomePage(noticeList)

    return (
      <>
        <MainLayout>

          {/* Top */}
          <Box sx={{display:'flex', flexDirection:'column', gap:'20px', borderBottom:"1px solid #ddd"}}>
            <Banner/>
            <Notice
              noticeList={noticeList}
              noticeCurrent={noticeCurrent}
              fade={fade}
              showNext={showNext}
            />
            <ExchangeRate/>
          </Box>
          
        </MainLayout>
      </>
    )
}