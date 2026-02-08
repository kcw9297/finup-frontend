import Box from "@mui/material/Box";
import NewsCard from "./NewsCard";
import NewsModal from "./NewsModal";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useNewsList } from "../hooks/useNewsList";
import { useNewsModal } from "../hooks/useNewsModal";
import NewsScrollToTop from "./NewsScrollToTop";
import useGenericNews from "../hooks/useGenericNews";
import { useEffect, useRef, useState } from "react";
import { useLoginMember } from "../../../base/hooks/useLoginMember";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { navigate } from "../../../base/config/globalHookConfig";
import { CircularProgress, Typography, Card, Skeleton } from "@mui/material";

/**
 * 뉴스 페이지 컴포넌트
 */
export default function NewsList() {

  const { isAuthenticated } = useLoginMember();
  const { showSnackbar } = useSnackbar();

  const {
    open,
    openModal,
    closeModal,
    article,
  } = useNewsModal();

  const { news, loading, hasMore, showTop, setShowTop, goNext } = useGenericNews();
  
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

  //(2)반환할 컴포넌트
  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4 }}>

      {/* 제목 섹션 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          뉴스 학습
        </Typography>
        <Typography variant="body2" color="text.secondary">
          최신 경제 뉴스로 배워보는 투자 지식
        </Typography>
      </Box>

      {/* 뉴스 리스트 */}
      <Box sx={{ mt: 2 }}>
        {news.map(item => (<NewsCard key={item.newsId} {...item} onClick={() => handleOpenModal(item)} />))}

        {/* 스크롤 감지하여 로딩 처리 */}
        {hasMore && (
          <Box ref={loadMoreRef} sx={{ mb: 2 }}>
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
      </Box>

       {/* 뉴스 없음 메시지 */}
        {!loading && news.length === 0 && (
          <Box 
            sx={{ 
              height: '800px',
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
    </Box>
  );
}