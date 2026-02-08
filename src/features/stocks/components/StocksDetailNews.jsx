import { Box, Card, Chip, Stack, CircularProgress, Typography, Skeleton } from "@mui/material";
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

        {/* 뉴스 없음 메시지 */}
        {!loading && news.length === 0 && (
          <Box 
            sx={{ 
              height: '1020px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              width: '100%',
            }}
          >
            <Typography variant="body1" color="text.secondary">
              불러온 뉴스가 없습니다
            </Typography>
            <Typography variant="body2" color="text.disabled">
              관련 뉴스가 등록되면 표시됩니다
            </Typography>
          </Box>
        )}

        {/* 스크롤 감지하여 로딩 처리 */}
        {hasMore && (
          <Box 
            ref={loadMoreRef} 
            sx={{ 
              mb: 2,
            }}
          >
            {loading && (
              <>
                {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                  <Card
                    key={index}
                    elevation={0}
                    sx={{
                      display: "flex",
                      gap: 2,
                      padding: 2,
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    {/* 썸네일 스켈레톤 */}
                    <Skeleton 
                      variant="rectangular" 
                      width={100} 
                      height={100} 
                      sx={{ borderRadius: 1, flexShrink: 0 }} 
                    />

                    {/* 텍스트 영역 */}
                    <Box sx={{ flex: 1 }}>
                      {/* 제목 */}
                      <Skeleton variant="text" width="90%" height={24} />
                      <Skeleton variant="text" width="70%" height={24} sx={{ mb: 1 }} />
                      
                      {/* 본문 */}
                      <Skeleton variant="text" width="100%" height={18} sx={{ mt: 1 }} />
                      <Skeleton variant="text" width="80%" height={18} />

                      {/* 하단 정보 (출처, 날짜) */}
                      <Skeleton variant="text" width={150} height={16} sx={{ mt: 1 }} />
                    </Box>
                  </Card>
                ))}
              </>
            )}
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