import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useHomeVideoList({ size = 20 } = {}) {

  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSuccess = rp => {
    setVideoList(rp.data ?? []);
  };

  const onFinally = () => {
    setLoading(false);
  };

  const fetchRecommended = () => {
    setLoading(true);
    api.get('/video-links/recommend/home', {
      public: true,
      params: { retry: false },
      onSuccess,
      onFinally
    })
  }

  const retryRecommendation = () => {
    setLoading(true);
    api.get('/video-links/recommend/home', {
      public: true,
      params: { retry: true },
      onSuccess,
      onFinally
    })
  }


  useEffect(() => {
    fetchRecommended();
  }, [size]);

  return { videoList, loading, retryRecommendation };
}
