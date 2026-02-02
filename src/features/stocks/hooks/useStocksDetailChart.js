import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useStocksDetailChart(code){

  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  
  const fetchChart = async () => { 
    try{
        const res = await api.get(`/stocks/${code}/chart`)
        setItems(res.data);
      }
      catch(err){
        console.error("차트 불러오기 오류:", err)
        setError(err)
        setItems([])
      }finally{
        setLoading(false)
      }
      
  }

  useEffect(()=>{
    if (!code) return;
    setLoading(true)
    setError(null)
    fetchChart()
  },[code])

  return {
    items,
    loading,
    error
  }
}