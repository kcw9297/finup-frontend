import React, { useMemo } from "react";
import StocksDetailTab from "./StocksDetailTab"
import StocksDetailNameCard from "./StocksDetailNameCard";
import { useStockDetail } from "../hooks/useStocksDetail";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

export default function StocksDetail() {

  const { code } = useParams()
  const { nameCard, stockDetail, loading: loadingDetail } = useStockDetail(code)

  return (
    <>
      <StocksDetailNameCard nameCard={nameCard} loadingDetail={loadingDetail} />
      <StocksDetailTab stockDetail={stockDetail} loadingDetail={loadingDetail} />         
    </>
  );
}
