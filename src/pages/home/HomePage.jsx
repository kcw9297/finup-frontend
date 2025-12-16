import { Box } from "@mui/material";
import { useState } from "react";

import MainLayout from "../../base/layouts/MainLayout";
import Notice from "../../features/home/components/Notice";
import Banner from "../../features/home/components/Banner";
import ExchangeRate from "../../features/home/components/ExchangeRate";
import KeywordNews from "../../features/home/components/KeywordNews";
import NewsDetailModal from "../../features/news/components/NewsModal";
import RecommendedVideo from "../../features/home/components/RecommendedVideo";
import StockFirm from "../../features/home/components/StockFirm";

import { useHomeNotice } from "../../features/home/hooks/useHomeNotice";
import { useExchangeRate, useMarketIndex } from "../../features/home/hooks/useExchangeRate";
import { useKeywordNews } from "../../features/home/hooks/useKeywordNews";
import { useRecommendedVideo } from "../../features/home/hooks/useRecommendedVideo";
import { useStockFirm } from "../../features/home/hooks/useStockFirm";
import { useHomeNoticeList } from "../../features/notice/hooks/useHomeNoticeList";
import { useAuth } from "../../base/hooks/useAuth";

export default function HomePage() {
  // 공지 데이터 (custom hook)
  const { isAdmin } = useAuth()
  const { listRp, loading: loadingNotice } = useHomeNoticeList({ admin: isAdmin() })
  const listRows = listRp?.data ?? []

  // 훅 사용
  const { current, fade, showNext } = useHomeNotice(listRows)
  const { quotation } = useExchangeRate();
  const { indexes } = useMarketIndex();
  const { videoList } = useRecommendedVideo();
  const { brokerList } = useStockFirm();
  const keywordNews = useKeywordNews();


  // 뉴스 모달 상태
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openModal = (article) => {
    setSelectedArticle(article);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  return (
    <>
      <MainLayout>

        {/* Top */}
        <Box sx={{display:'flex', flexDirection:'column', gap:'20px',}}>
          <Banner/>
            <Notice
              noticeList={listRows}
              noticeCurrent={current}
              fade={fade}
              showNext={showNext}
              loading={loadingNotice}
            />
          <Box sx={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:5}}>
            {quotation.map((item, i) => (<ExchangeRate key={`fx-${i}`} data={item}/>))}
            {indexes.map((item, i) => (<ExchangeRate key={`idx-${i}`} data={item}/>))}
          </Box>
        </Box>

        {/* 간격 띄우는 용도 */}
        <Box sx={{height:'30px'}}/>

        {/* Buttom */}
        <Box sx={{display:'flex', flexDirection:'column', gap:'50px'}}>
          <KeywordNews {...keywordNews} onItemClick={openModal}/>
          <RecommendedVideo videoList={videoList}/>
          <StockFirm brokerList={brokerList}/>
        </Box>

        {/* 간격 띄우는 용도 */}
        <Box sx={{height:'30px'}}/>
        
      </MainLayout>

      <NewsDetailModal
        open={open}
        onClose={closeModal}
        article={selectedArticle}
        loading={false}
      />
    </>
  )
}