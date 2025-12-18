import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useStockDetailStockAi(code){
  // [1] 필요 데이터 선언 
  const [detailStockAi, setDetailStockAi] = useState([]);
  const [detailStockYoutube, setDetailStockYoutube] = useState([]);
  const [loadingAi, setLoadingAi] = useState(true);


  // [2] 필요 함수 선언 //없음 생략
  // [3] 성공/실패 콜백 함수 정의 //없음 생략

  // [4] REST API 요청 함수 정의 
  useEffect(() => {
    if (!code) return;
    fetchStockAi();    
    return () => {};
  }, [code]);

  const fetchStockAi = async () => {
    
    const rp = await api.get(`/stocks/detail/stock-ai/${code}`);
    const stockAi = rp.data.detailAi;
    const youtube = rp.data.youtube;
    
    setDetailStockAi(stockAi);   
    setDetailStockYoutube(youtube);  
    setLoadingAi(false);
      
  }
  // [5] 반환
  return { detailStockAi, detailStockYoutube, loadingAi };
}
