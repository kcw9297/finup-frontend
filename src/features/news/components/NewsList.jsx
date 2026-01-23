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
import { useAuth } from "../../../base/hooks/useAuth";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { navigate } from "../../../base/config/globalHookConfig";
import { CircularProgress, Typography } from "@mui/material";
/**
 * 뉴스 페이지 컴포넌트
 */
export default function NewsList() {

  const { isAuthenticated } = useAuth();
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




  //(2)반환활 컴포넌트
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
      </Box>

      {/* 스크롤 감지하여 로딩 처리 */}
      {hasMore && (
        <div ref={loadMoreRef} style={{ height: '20px' }}>
          {loading && <CircularProgress />}
        </div>
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
      />
    </Box>
  );
}
