import Box from "@mui/material/Box";
import NewsCard from "./NewsCard";
import NewsModal from "./NewsModal";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
/**
 * 뉴스 페이지 컴포넌트
 */

import { useNewsList } from "../hooks/useNewsList"
import { useNewsModal } from "../hooks/useNewsModal";

export default function NewsList(){
  //(1)커스텀 훅
  const { category, setCategory : changeCategory,
    news,
    bottomRef,
    loading,
    visibleCount,
    CATEGORY_LIST,
    refreshNews } = useNewsList();
  const { open, openModal, closeModal, article, loading: aiLoading } = useNewsModal(refreshNews);

  //(2)반환활 컴포넌트
  return(
    <Box sx={{ maxWidth: "900px", mx: "auto", mt: 4 }}>

      {/* Chip 탭 */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {CATEGORY_LIST.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            clickable
            onClick={() => changeCategory(item.value)}
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
          <NewsCard key={idx} {...item} onClick={() => openModal(item)}/>
        ))}

        {loading && (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress size={28} />
          </Box>
        )}
        
        <div ref={bottomRef} style={{ height: 40 }}></div>
      </Box>
      {/* 뉴스 상세 모달 */}
      <NewsModal 
        open={open} 
        onClose={closeModal} 
        article={article}
        loading={aiLoading}
      />
    </Box>
    
  )
}