import React from "react";
import StocksDetailTab from "./StocksDetailTab"
import StocksDetailNameCard from "./StocksDetailNameCard";
import { useParams } from "react-router-dom";
import { useStockDetail } from "../hooks/useStocksDetail.js";

export default function StocksDetail() {
  const { code } = useParams();
  const { nameCard, detailStock, loading, error} = useStockDetail(code);
    
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <>
      <StocksDetailNameCard nameCard={nameCard}/>
      <StocksDetailTab detailStock={detailStock}/> 
    </>
  );
}
