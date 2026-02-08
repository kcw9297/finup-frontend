import { Box, Chip, Stack, CircularProgress, Typography } from "@mui/material";
import thema from "../../../base/design/thema.js";
import NewsCard from "../../news/components/NewsCard.jsx";
import NewsModal from "../../news/components/NewsModal.jsx";
import NewsScrollToTop from "../../news/components/NewsScrollToTop.jsx";
import { useStocksNews } from "../hooks/useStocksNews.js";
import { useStocksNewsModal } from "../hooks/useStocksNewsModal.js";
import { useEffect, useRef } from "react";
import StocksDetailInfoTooltipIcon from "./StocksDetailInfoTooltipIcon.jsx";
import { useLoginMember } from "../../../base/hooks/useLoginMember.js";
import { useNewsModal } from "../../news/hooks/useNewsModal.js";
import { navigate, showSnackbar } from "../../../base/config/globalHookConfig.js";

export default function StocksDetailNews({ stockDetail, loadingDetail }) {

  const stockCode = stockDetail?.basicHead?.code || "";
  const { isAuthenticated } = useLoginMember();

  const {
      open,
      openModal,
      closeModal,
      article,
      loading: aiLoading,
    } = useNewsModal();
  

  const { news, loading, hasMore, showTop, setShowTop, goNext } = useStocksNews();

  // 무한 스크롤 감지
  const loadMoreRef = useRef(null); // 무한 스크롤 감지를 위한 참조
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          goNext();  // 다음 페이지 로드
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [goNext]);

  // 스크롤 위치에 따라 showTop 토글
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setShowTop]);

  // 최상단으로 이동
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: "smooth" 
    });
  };

  const handleOpenModal = (item) =>{
    if(!isAuthenticated){
      showSnackbar("뉴스 상세는 로그인 후 이용할 수 있습니다.","info");
      navigate("/login?returnUrl=%2Fnews/list");
      return;
    }
    openModal(item);
  }

  return (
    <Box sx={{ backgroundColor: thema.palette.background.base }}>

      <Box sx={{py:3}}>
        <StocksDetailInfoTooltipIcon text={"기사를 클릭하여 본문과 AI 분석을 볼 수 있어요!"} />
      </Box>


      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>

        {/* 뉴스 리스트 */}
        <Box sx={{ mt: 2 }}>
          {news.map(item => (<NewsCard key={item.newsId} {...item} onClick={() => handleOpenModal(item)} />))}
        </Box>
  
        {/* 스크롤 감지하여 로딩 처리 */}
        {hasMore && (
          <Box 
            ref={loadMoreRef} 
            sx={{ 
              height: '80px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {loading && <CircularProgress />}
          </Box>
        )}
  
        {/* 맨 위로 버튼 */}
        <NewsScrollToTop 
          show={showTop && !open} 
          onClick={scrollToTop}
        />

        {/* 뉴스 상세 모달 */}
        <NewsModal
          open={open}
          onClose={closeModal}
          article={article}
          analyzeWord={true}
        />
        <div id="bottom-observer" />
      </Box>
    </Box>
  );
}