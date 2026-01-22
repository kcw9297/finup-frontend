import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useStockDetailRecommendVideo(code){
  // [1] 필요 데이터 선언 
  const [videos, setVideos] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(true);


  // [2] 필요 함수 선언 //없음 생략

  // [3] 성공/실패 콜백 함수 정의
  const onSuccess = rp => {
    setVideos(rp.data); 
  }

  const onFinally = rp => {
    setLoadingVideo(false); 
  }

  const analyze = () => {
    doAnalyze(false)
  }

  const retryRecommend = () => {
    doAnalyze(true)
  }

  async function doAnalyze(retry) {
    setLoadingVideo(true)
    setVideos(null)
    await api.get(`/stocks/${code}/recommendation/youtube`, { onSuccess, onFinally, params : { retry } })
  }

  // [4] REST API 요청 함수 정의 
  useEffect(() => {
    if (!code) return
    analyze()
  }, [code]);


  // [5] 반환
  return { videos, loadingVideo, retryRecommend };
}
