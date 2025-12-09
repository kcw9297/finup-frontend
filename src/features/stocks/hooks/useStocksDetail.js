import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import theme from "../../../base/design/thema";

export function useStockDetail(code) {

  // [1] 필요 데이터 선언 
  const [nameCard, setNameCard] = useState([]);
  const [detailStock, setDetailStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // [2] 필요 함수 선언 //없음 생략
  // [3] 성공/실패 콜백 함수 정의 //없음 생략

  // [4] REST API 요청 함수 정의 
  // NameCard에서 종목명, 주식 현재가 데이터만 필요하지만 api 다중호출 방지위해 set할 수 있는 데이터 모두 setState함
  useEffect(() => {    
    if (!code) return;
    fetchDetail();    
    return () => {};
  }, [code]);

  const fetchDetail = async () => {
    // const res = await axios.get(`http://localhost:8080/public/api/stocks/detail/${code}`)
    //const detail = res.data.data;
    try{     
    
      const rp = await api.get(`/stocks/detail/${code}`, { public: true });    
      const detail = rp.data;

      /* 네임 카드  */
      setNameCard({
        stockName: detail.htsKorIsnm,
        code: code,
        price: Number(detail.stckPrpr).toLocaleString() + "원"     
      });

      /* 종목상세 */    
      setDetailStock({
        /* 기본정보 */
        //기본정보 헤더
        basicHead: {
          stockName: detail.htsKorIsnm,
          code: code,
          marketName: detail.rprsMrktKorName
        },
        
        //기본정보 카드
        basic: [
          { label: "업종", value: detail.bstpKorIsnm },
          { label: "액면가", value: Number(detail.stckFcam).toLocaleString() + "원" },
          { label: "시가총액", value: Number(detail.htsAvls).toLocaleString() + "원" },
          { label: "상장주수", value: Number(detail.lstnStcn).toLocaleString() + "주" },
        ],

        /* 투자지표 */
        // 가격
        price: [
          { label: "52주 최고가", value: Number(detail.w52Hgpr).toLocaleString() + "원", color: theme.palette.stock.rise },
          { label: "52주 최저가", value: Number(detail.w52Lwpr).toLocaleString() + "원", color: theme.palette.stock.fall },
          { label: "250일 최고가", value: Number(detail.d250Hgpr).toLocaleString() + "원", color: theme.palette.stock.rise },
          { label: "250일 최저가", value: Number(detail.d250Lwpr).toLocaleString() + "원", color: theme.palette.stock.fall },
        ],
        //가치평가
        valuation: [
          { label: "PER", value: detail.per + "배" },
          { label: "PBR", value: detail.pbr + "배" },
          { label: "EPS", value: Number(detail.eps).toLocaleString() + "원" },
          { label: "BPS", value: Number(detail.bps).toLocaleString() + "원" },
        ],
        //수급 거래
        flow: [
          { label: "외국인 순매수", value: detail.frgnNtbyQty + "주" },
          { label: "프로그램매매 순매수", value: Number(detail.pgtrNtbyQty).toLocaleString() + "주" },
          { label: "HTS 외국인 소진율", value: `${detail.htsFrgnEhrt}%` },
          { label: "거래량 회전율", value: `${detail.volTnrt}%` },
        ],
        //리스크 상태
        risk: [
          { label: "임시 정지 여부", value: detail.tempStopYn },
          { label: "투자유의 여부", value: detail.invtCafulYn },
          { label: "단기 과열 여부", value: detail.shortOverYn },
          { label: "관리종목 여부", value: detail.mangIssuClsCode },
        ]
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }    
  }
  // [5] 반환
  return { nameCard, detailStock, loading, error };
}
