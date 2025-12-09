import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useStocksDetailChart(code){
  const [items, setItems ] = useState([]);
  const [candleType, setCandleType] = useState("day")
  const [loading, setLoading] = useState(false);

  const fetchChart = async () => {
    setLoading(true);  
    try{
        const res = await api.get("/stocks/chart",{
          params:{ code, candleType },
          public: true,
        })
        console.log(res.data.output);
        setItems(res.data.output);
      }
      catch(err){
        console.error("차트 불러오기 오류:", err)
      }
      setLoading(false)
    }
    useEffect(()=>{
      fetchChart();
    },[candleType])
  
    return {
      items,
      candleType,
      setCandleType,
      loading
    }
}