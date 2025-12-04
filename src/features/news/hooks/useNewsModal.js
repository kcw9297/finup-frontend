import { useEffect, useState } from "react"
import { api } from "../../../base/utils/fetchUtils";
import { navigate } from "../../../base/config/globalHookConfig";

export function useNewsModal(onCloseCallback){
  const [open, setOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  const openModal = (basicInfo) => {
    //  if (!sessionStorage.getItem("jwt")) {
    //   alert("로그인이 필요한 기능입니다.");
    //   navigate("/login");
    //   return;
    // }
    setArticle(basicInfo)
    setSelectedUrl(basicInfo.link)
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
    setArticle(null)
    setSelectedUrl(null)
    if(onCloseCallback) onCloseCallback()
  }
  
  const onSuccess = (items) => {
    setArticle(prev => ({
      ...prev, 
      content: items.content,
      ai: items.ai
    }))
  }
  useEffect(() => {
    if(!open || !selectedUrl) return;
    
    const fetchDetail = async () => {
      setLoading(true);
      try{
        const res = await api.get("/news/detail-ai", {
          params:{url:selectedUrl},
          public: true
        })
        onSuccess(res.data)
      }catch (e) {
        // if(e.response?.status === 403) {
        //   alert("로그인이 필요합니다.");
        //   closeModal();
        //   navigate("/login");
        //   return;
        // }
        console.error("AI 분석 실패", e);
      }finally{
        setLoading(false)
      }
    }
    fetchDetail()
  },[open, selectedUrl])

  return {
    open,
    openModal,
    closeModal,
    article,
    loading
  }
}