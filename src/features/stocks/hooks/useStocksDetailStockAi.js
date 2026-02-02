import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useStockDetailStockAi(code){
  // [1] 필요 데이터 선언 
  const [detailStockAi, setDetailStockAi] = useState(null);
  const [loadingAi, setLoadingAi] = useState(true);


  // [2] 필요 함수 선언 //없음 생략

  // [3] 성공/실패 콜백 함수 정의
  const onSuccess = rp => {
    setDetailStockAi(rp.data); 
  }

  const onFinally = rp => {
    setLoadingAi(false); 
  }

  const analyze = async () => {
    doAnalyze(false)
  }

  const retryAnalyze = async () => {
    doAnalyze(true)
  }

  async function doAnalyze(retry) {
    setLoadingAi(true)
    setDetailStockAi(null)
    await api.get(`/stocks/${code}/analysis/detail`, { onSuccess, onFinally, params : { retry } })
  }



  // [4] REST API 요청 함수 정의 
  useEffect(() => {
    if (!code) return
    analyze()
  }, [code]);


  // [5] 반환
  return { detailStockAi, loadingAi, retryAnalyze };
}
