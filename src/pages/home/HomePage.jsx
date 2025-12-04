import { Box } from "@mui/material";

import MainLayout from "../../base/layouts/MainLayout";

import { useHomePage } from "./useHomePage";
import Notice from "./Notice";
import Banner from "./Banner";
import ExchangeRate from "./ExchangeRate";
import KeywordNews from "./KeywordNews";
import GoodVideo from "./GoodVideo";
import StockFirm from "./StockFirm";

export default function HomePage() {

  // 공지사항 목록
  const noticeList = ["서버 점검 안내(25.12.01)", "신규 기능 업데이트 안내", "서비스 이용 시 유의 사항"]
  const {noticeCurrent, fade, showNext} = useHomePage(noticeList)

  // 환율, 코스피 임시 데이터
  const usd = {
    title: "USD/KRW",
    today: 1344.50,
    yesterday: 1338.10,
    diff: 6.40,
    rate: 0.47,
    isUp: true
  }
  const jpy = {
    title: "USD/KRW",
    today: 1344.50,
    yesterday: 1338.10,
    diff: 6.40,
    rate: 0.47,
    isUp: true
  }
  const kospi = {
    title: "USD/KRW",
    today: 1344.50,
    yesterday: 1338.10,
    diff: 6.40,
    rate: 0.47,
    isUp: true
  }
  const kosdaq = {
    title: "USD/KRW",
    today: 1344.50,
    yesterday: 1338.10,
    diff: 6.40,
    rate: 0.47,
    isUp: true
  }
  const fxList = [usd, jpy, kospi, kosdaq];

    return (
      <>
        <MainLayout>

          {/* Top */}
          <Box sx={{display:'flex', flexDirection:'column', gap:'20px',}}>
            <Banner/>
            <Notice
              noticeList={noticeList}
              noticeCurrent={noticeCurrent}
              fade={fade}
              showNext={showNext}
            />
            <Box sx={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:5}}>
              {fxList.map((item, i) => (<ExchangeRate key={i} data={item}/>))}
            </Box>
          </Box>

          {/* Buttom */}
          <Box sx={{display:'flex', flexDirection:'column', gap:'20px', borderBottom:"1px solid #ddd"}}>
            <KeywordNews/>
            <GoodVideo/>
            <StockFirm/>
          </Box>
          
        </MainLayout>
      </>
    )
}