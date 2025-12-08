import { Box, Chip, Stack } from "@mui/material";
import thema from "../../../base/design/thema.js"
import NewsCard from "../../news/components/NewsCard.jsx";
import NewsScrollToTop from "../../news/components/NewsScrollToTop.jsx";
import { useNewsList } from "../../news/hooks/useNewsList.js";
import { useNewsModal } from "../../news/hooks/useNewsModal.js";
import { useStocksNews } from "../hooks/useStocksNews.js";

export default function StocksDetailNews(){
  const { category, setCategory : changeCategory,
      news,
      visibleCount,
      CATEGORY_LIST,
      refreshNews, showTop,
      } = useStocksNews();
  const { open, openModal, closeModal, article, loading: aiLoading } = useNewsModal(refreshNews);
  
  return (
    <Box sx={{backgroundColor: thema.palette.background.base}}>
      {/* <Box sx={{ maxWidth: "900px", mx: "auto", mt: 4 }}> */}
      <Box sx={{width: "100%", display: "flex", flexDirection: "column" }}>
        {/* Chip 탭 */}
        <Stack direction="row" spacing={1} sx={{ pt:2, mb: 2 }}>
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
        <Box sx={{ mt:0}}>
          {news.slice(0, visibleCount).map((item, idx) => (
            <NewsCard key={idx} {...item} onClick={() => openModal(item)}/>
          ))}
          
          <NewsScrollToTop show={showTop}/>
        </Box>
      </Box>
    </Box>
  )
}