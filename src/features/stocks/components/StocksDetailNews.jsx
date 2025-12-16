import { Box, Chip, Stack } from "@mui/material";
import thema from "../../../base/design/thema.js";
import NewsCard from "../../news/components/NewsCard.jsx";
import NewsModal from "../../news/components/NewsModal.jsx";
import NewsScrollToTop from "../../news/components/NewsScrollToTop.jsx";
import { useContext } from "react";
import { StockDetailContext } from "../context/StockDetailContext.js";
import { useStocksNews } from "../hooks/useStocksNews.js";
import { useStocksNewsModal } from "../hooks/useStocksNewsModal.js";

export default function StocksDetailNews() {
  const { nameCard } = useContext(StockDetailContext);
  const stockName = nameCard.stockName;

  const {
    open,
    article,
    openWithAi,
    closeModal,
    loading: aiLoading,
  } = useStocksNewsModal();

  const {
    category,
    setCategory,
    CATEGORY_LIST,
    news,
    visibleCount,
    showTop,
    MoveToTop,
  } = useStocksNews(stockName);

  return (
    <Box sx={{ backgroundColor: thema.palette.background.base }}>
      {/* <Box sx={{ maxWidth: "900px", mx: "auto", mt: 4 }}> */}
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {/* Chip 탭 */}
        <Stack direction="row" spacing={1} sx={{ pt: 2, mb: 2 }}>
          {CATEGORY_LIST.map((item) => (
            <Chip
              key={item.value}
              label={item.label}
              clickable
              onClick={() => setCategory(item.value)}
              sx={{
                borderRadius: "16px",
                px: 1.5,
                backgroundColor: category === item.value ? "#EDF2FF" : "transparent",
                color: category === item.value ? "#3B5BDB" : "#666",
                fontWeight: category === item.value ? 600 : 400,
                "&:active": {boxShadow: "none", },
              }}
            />
          ))}
        </Stack>

        {/* 뉴스 리스트 */}
        <Box sx={{ mt: 0 }}>
          {news.slice(0, visibleCount).map((item, idx) => (
            <NewsCard key={idx} {...item} onClick={() => openWithAi(item)} />
          ))}

          <NewsScrollToTop show={showTop && !open} onClick={MoveToTop} />
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
    </Box>
  );
}
