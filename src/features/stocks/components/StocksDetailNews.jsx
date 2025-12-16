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
    news,
    visibleCount,
    showTop,
    MoveToTop,
  } = useStocksNews(stockName);

  return (
    <Box sx={{ backgroundColor: thema.palette.background.base }}>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {/* 뉴스 리스트 */}
        <Box sx={{ mt: 2 }}>
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
