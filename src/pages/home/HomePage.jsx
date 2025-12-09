import { Box } from "@mui/material";

import MainLayout from "../../base/layouts/MainLayout";

import Notice from "../../features/home/components/Notice";
import Banner from "../../features/home/components/Banner";
import ExchangeRate from "../../features/home/components/ExchangeRate";
import KeywordNews from "../../features/home/components/KeywordNews";
import RecommendedVideo from "../../features/home/components/RecommendedVideo";
import StockFirm from "../../features/home/components/StockFirm";

import { useHomeNotice } from "../../features/home/hooks/useHomeNotice";
import { useExchangeRate } from "../../features/home/hooks/useExchangeRate";
import { useKeywordNews } from "../../features/home/hooks/useKeywordNews";
import { useRecommendedVideo } from "../../features/home/hooks/useRecommendedVideo";
import { useStockFirm } from "../../features/home/hooks/useStockFirm";

export default function HomePage() {
  // 공지 데이터
  const noticeList = [ "서버 점검 안내(25.12.01)", "신규 기능 업데이트 안내", "서비스 이용 시 유의 사항" ]

  // 훅 사용
  const { current, fade, showNext } = useHomeNotice(noticeList);
  const { quotation } = useExchangeRate();
  const keywordNews = useKeywordNews();  
  const { videoList } = useRecommendedVideo();
  const { brokerList } = useStockFirm();

  return (
    <>
      <MainLayout>

        {/* Top */}
        <Box sx={{display:'flex', flexDirection:'column', gap:'20px',}}>
          <Banner/>
          <Notice
            noticeList={noticeList}
            noticeCurrent={current}
            fade={fade}
            showNext={showNext}
          />
          <Box sx={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:5}}>
            {quotation.map((item, i) => (<ExchangeRate key={i} data={item}/>))}
          </Box>
        </Box>

        {/* 간격 띄우는 용도 */}
        <Box sx={{height:'30px'}}/>

        {/* Buttom */}
        <Box sx={{display:'flex', flexDirection:'column', gap:'50px'}}>
          <KeywordNews {...keywordNews}/>
          <RecommendedVideo videoList={videoList}/>
          <StockFirm brokerList={brokerList}/>
        </Box>

        {/* 간격 띄우는 용도 */}
        <Box sx={{height:'30px'}}/>
        
      </MainLayout>
    </>
  )
}