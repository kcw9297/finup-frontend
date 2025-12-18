import { api } from "../../../base/utils/fetchUtils";

// useVideoLinkFetcher.js
export function useVideoLinkFetcher() {

  const fetchSearch = (params, options = {}) => {
    return api.get('/video-links/search', {
      params,
      ...options,
    });
  };

  const fetchHome = (params) => {
    return api.get('/video-links/home', {
      public: true,
      params,
    });
  };

  return {
    fetchSearch,
    fetchHome,
  };
}
