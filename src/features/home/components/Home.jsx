import { Box } from "@mui/material";
import { useState } from "react";

import MainLayout from "../../../base/layouts/MainLayout";
import Notice from "./Notice";
import Banner from "./Banner";
import ExchangeRate from "./ExchangeRate";
import KeywordNews from "./KeywordNews";
import NewsDetailModal from "../../news/components/NewsModal";
import RecommendedVideo from "./RecommendedVideo";
import StockFirm from "./StockFirm";

import { useHomeNotice } from "../hooks/useHomeNotice";
import { useExchangeRate, useMarketIndex } from "../hooks/useExchangeRate";
import { useKeywordNews } from "../hooks/useKeywordNews";
import { useRecommendedVideo } from "../hooks/useRecommendedVideo";
import { useStockFirm } from "../hooks/useStockFirm";
import { useHomeNoticeList } from "../../notice/hooks/useHomeNoticeList";
import { useLoginMember } from "../../../base/hooks/useLoginMember";
import { navigate, showSnackbar } from "../../../base/config/globalHookConfig";

export default function Home() {
  // 공지 데이터 (custom hook)
  const { isAdmin } = useLoginMember()
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
  const { isAuthenticated } = useLoginMember();
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openModal = (article) => {
    if (!isAuthenticated) {
      showSnackbar("로그인 후 이용할 수 있어요", "info");
      navigate("/login")
      return;
    }
    setSelectedArticle(article);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  return (
    <>


        {/* Top */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', }}>
          <Banner />
          <Notice
            noticeList={listRows}
            noticeCurrent={current}
            fade={fade}
            showNext={showNext}
            loading={loadingNotice}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
            {quotation.map((item, i) => (<ExchangeRate key={`fx-${i}`} data={item} />))}
            {indexes.map((item, i) => (<ExchangeRate key={`idx-${i}`} data={item} />))}
          </Box>
        </Box>

        {/* 간격 띄우는 용도 */}
        <Box sx={{ height: '30px' }} />

        {/* Buttom */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          <KeywordNews {...keywordNews} onItemClick={openModal} />
          <RecommendedVideo
            searchOption={{
              keyword: '',
              filter: '',
              pageNum: 0,
              size: 20,
            }}
            videoList={videoList} />
          <StockFirm brokerList={brokerList} />
        </Box>

        {/* 간격 띄우는 용도 */}
        <Box sx={{ height: '30px' }} />

      <NewsDetailModal
        open={open}
        onClose={closeModal}
        article={selectedArticle}
        analyzeWord={true}
      />
    </>
  )
}