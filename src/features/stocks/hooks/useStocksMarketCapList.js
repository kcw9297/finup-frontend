import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useStockList(){

  // [1] 필요 데이터 선언 
  const [stockList, setStockList] = useState([]);
  const [loading, setLoading] = useState(true);

  // [2] 필요 함수 선언 //없음 생략
  // [3] 성공/실패 콜백 함수 정의 //없음 생략

  // [4] REST API 요청 함수 정의 
  useEffect(()=>{   
    async function fetchStockRow() {
      const rp = await api.get(`/stocks/market-cap-ranking`, { public: true });        
      setStockList(rp.data);
      setLoading(false);
    }
    fetchStockRow();
  }, []);

  // [5] 반환
  return { stockList, loading };
}
