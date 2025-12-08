import React, { useMemo } from "react";
import StocksDetailTab from "./StocksDetailTab"
import StocksDetailNameCard from "./StocksDetailNameCard";
import { useParams } from "react-router-dom";
import { useStockDetail } from "../hooks/useStocksDetail.js";
import { StockDetailContext } from "../context/StockDetailContext.js";

export default function StocksDetail() {
  const { code } = useParams();
  const { nameCard, detailStock } = useStockDetail(code);
  const value = useMemo(() => ({
    nameCard,
    detailStock
  }), [nameCard, detailStock]);
  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error!</p>;

  return (
    <StockDetailContext.Provider value={ value }>    
      <StocksDetailNameCard />
      <StocksDetailTab />       
    </StockDetailContext.Provider>
  );
}
