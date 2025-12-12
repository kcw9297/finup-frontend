import { Box, Chip, Stack } from "@mui/material";
import thema from "../../../base/design/thema.js"
import NewsCard from "../../news/components/NewsCard.jsx";
import NewsModal from "../../news/components/NewsModal.jsx";
import NewsScrollToTop from "../../news/components/NewsScrollToTop.jsx";
import { useNewsModal } from "../../news/hooks/useNewsModal.js";
import { useContext, useState } from "react";
import { StockDetailContext } from "../context/StockDetailContext.js";
import useGenericNews from "../../news/hooks/useGenericNews.js";

export default function StocksDetailNews(){
  const CATEGORY_LIST = [
    { label: "최신뉴스", value: "date" },
    { label: "주요뉴스", value: "sim" },
  ];

  const { nameCard } = useContext(StockDetailContext);
  const stockName = nameCard.stockName;

  const [category, setCategory] = useState("date");
  
  const { open, openModal, closeModal, article, loading: aiLoading } = useNewsModal();
  const isModalOpen = open;
  
  const { 
      news,
      loading,
      visibleCount,
      refreshNews,
      showTop,
      scrollToTop,
    } = useGenericNews(
      "/stocks/news",
      { category, stockName },
      isModalOpen
    );

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
        <Box sx={{ mt:0}}>
          {news.slice(0, visibleCount).map((item, idx) => (
            <NewsCard key={idx} {...item} onClick={() => openModal(item)}/>
          ))}
          
          <NewsScrollToTop show={showTop} onClick={scrollToTop}/>
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
  )
}