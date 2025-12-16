import Box from "@mui/material/Box";
import NewsCard from "./NewsCard";
import NewsModal from "./NewsModal";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useNewsList } from "../hooks/useNewsList";
import { useNewsModal } from "../hooks/useNewsModal";
import NewsScrollToTop from "./NewsScrollToTop";
import useGenericNews from "../hooks/useGenericNews";
import { useState } from "react";
/**
 * 뉴스 페이지 컴포넌트
 */
export default function NewsList() {
  const CATEGORY_LIST = [
    { label: "최신뉴스", value: "date" },
    { label: "주요뉴스", value: "sim" },
  ];

  const [category, setCategory] = useState("date");

  const {
    open,
    openModal,
    closeModal,
    article,
    loading: aiLoading,
  } = useNewsModal();
  const isModalOpen = open;

  const { news, loading, visibleCount, refreshNews, showTop, scrollToTop } =
    useGenericNews("/news/list", { category }, isModalOpen);

  //(2)반환활 컴포넌트
  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", mt: 4 }}>
      {/* Chip 탭 */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {CATEGORY_LIST.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            clickable
            onClick={() => setCategory(item.value)}
            sx={{
              borderRadius: "16px",
              px: 1.5,
              backgroundColor:
                category === item.value ? "#EDF2FF" : "transparent",
              color: category === item.value ? "#3B5BDB" : "#666",
              fontWeight: category === item.value ? 600 : 400,
            }}
          />
        ))}
      </Stack>

      {/* 뉴스 리스트 */}
      <Box sx={{ mt: 2 }}>
        {news.slice(0, visibleCount).map((item, idx) => (
          <NewsCard key={idx} {...item} onClick={() => openModal(item)} />
        ))}

        <NewsScrollToTop show={showTop && !open} onClick={scrollToTop} />
      </Box>
      
      {/* 뉴스 상세 모달 */}
      <NewsModal
        open={open}
        onClose={closeModal}
        article={article}
        loading={aiLoading}
      />
      <div id="bottom-observer" />
    </Box>
  );
}
