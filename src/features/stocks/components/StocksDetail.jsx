import StocksDetailTab from "./StocksDetailTab"
import StocksDetailNameCard from "./StocksDetailNameCard";
import thema from "../../../base/design/thema.js"
import { useStockDetail } from "../hooks/useStocksDetail";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect } from "react";

export default function StocksDetail() {

  const { code } = useParams()
  const { nameCard, stockDetail, loading: loadingDetail } = useStockDetail(code)

  // 페이지 진입 시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [code]); // code가 변경될 때마다 실행

  return (
    <Box sx={{ 
      backgroundColor: thema.palette.background.light,
      minHeight: "100vh",
      width: "100%"
    }}>
      <StocksDetailNameCard nameCard={nameCard} loadingDetail={loadingDetail} />
      <StocksDetailTab stockDetail={stockDetail} loadingDetail={loadingDetail} />         
    </Box>
  );
}
