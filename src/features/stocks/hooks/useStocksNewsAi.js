import { useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useStocksNewsAi() {
  const [loading, setLoading] = useState(false);

  const fetchAi = async (article) => {
    setLoading(true);
    try {
      const res = await api.post(
        "/stocks/news/ai",
        {
          public: true,
        },
        {
          link: article.link,
          description: article.description,
        }
      );
      console.log("res.data:", res.data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { fetchAi, loading };
}
