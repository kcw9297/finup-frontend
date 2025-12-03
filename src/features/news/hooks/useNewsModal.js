import { useEffect, useState } from "react"
import { api } from "../../../base/utils/fetchUtils";

export function useNewsModal(){
  const [open, setOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const openModal = (basicInfo) => {
    setArticle(basicInfo)
    setSelectedUrl(basicInfo.link)
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
    setArticle(null)
    setSelectedUrl(null)
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