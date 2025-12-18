import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useAuth } from "../../../base/hooks/useAuth";

export function useHomeVideoList() {

  const { isAuthenticated } = useAuth()
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSuccess = rp => {
    setVideoList(rp.data ?? []);
  };

  const onFinally = () => {
    setLoading(false);
  };

  const fetchLogoutRecommended = () => {
    setLoading(true);
    api.get('/video-links/recommend/home', {
      public: true,
      onSuccess,
      onFinally
    })
  }

  const fetchRecommended = () => {
    setLoading(true);
    api.get('/video-links/recommend/home', {
      params: { retry: false },
      onSuccess,
      onFinally
    })
  }

  const retryRecommendation = () => {
    setLoading(true);
    api.get('/video-links/recommend/home', {
      params: { retry: true },
      onSuccess,
      onFinally
    })
  }


  useEffect(() => {
    if (isAuthenticated) fetchRecommended()
    else fetchLogoutRecommended()
  }, [isAuthenticated]);

  return { videoList, loading, retryRecommendation };
}
