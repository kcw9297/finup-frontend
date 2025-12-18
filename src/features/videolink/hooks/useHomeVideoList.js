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
    api.get('/video-links/home', {
      public: true,
      params: { size },
      onSuccess,
      onFinally
    })

  }


  useEffect(() => {
    fetchRecommended();
  }, [size]);

  return { videoList, loading };
}
