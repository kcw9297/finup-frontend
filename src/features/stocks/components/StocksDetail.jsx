import StocksDetailTab from "./StocksDetailTab"
import StocksDetailNameCard from "./StocksDetailNameCard";
import thema from "../../../base/design/thema.js"
import { useStockDetail } from "../hooks/useStocksDetail";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

export default function StocksDetail() {

  const { code } = useParams()
  const { nameCard, stockDetail, loading: loadingDetail } = useStockDetail(code)

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
