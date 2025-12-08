import { createContext, useContext } from "react";

export const StockDetailContext = createContext(null);
export const useStockDetail = () => useContext(StockDetailContext);