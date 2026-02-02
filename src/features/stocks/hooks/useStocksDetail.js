import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import theme from "../../../base/design/thema";
import { stockToolTipText } from "../constants/stocksToolTipText";
import { navigate, showSnackbar } from "../../../base/config/globalHookConfig";

export function useStockDetail(code) {

  // [1] 필요 데이터 선언 
  const [nameCard, setNameCard] = useState(null);
  const [stockDetail, setStockDetail] = useState(null);
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
    try{     
      const rp = await api.get(`/stocks/${code}/detail`);
      
      if (!rp.success) {
        showSnackbar(rp.message || "종목 조회 중 오류가 발생했습니다.");
        navigate("/stocks"); // 리스트 페이지로 이동
        return;
      }

      const detail = rp.data;

      /* 네임 카드  */
      setNameCard({
        stockName: detail.stockName,
        stockCode: detail.stockCode,
        stockPrice: Number(detail.currentPrice).toLocaleString() + "원"     
      });

      /* 종목상세 */    
      setStockDetail({
        /* 기본정보 */
        //기본정보 헤더
        basicHead: {
          stockName: detail.stockName,
          code: detail.stockCode,
          marketName: detail.marketIndexName
        },
        
        //기본정보 카드
        basic: [
          { label: "업종", value: detail.sectorName, tooltip: stockToolTipText.bstpKorIsnm },
          { label: "액면가", value: Number(detail.faceValue).toLocaleString() + "원", tooltip: stockToolTipText.stckFcam },
          { label: "시가총액", value: Number(detail.marketCap).toLocaleString() + "원", tooltip: stockToolTipText.htsAvls },
          { label: "상장주수", value: Number(detail.listedShares).toLocaleString() + "주", tooltip: stockToolTipText.lstnStcn },
        ],

        /* 투자지표 */
        // 가격
        price: [
          { label: "52주 최고가", value: Number(detail.week52High).toLocaleString() + "원", color: theme.palette.stock.rise, tooltip: stockToolTipText.w52Hgpr },
          { label: "52주 최저가", value: Number(detail.week52Low).toLocaleString() + "원", color: theme.palette.stock.fall, tooltip: stockToolTipText.w52Lwpr },
          { label: "250일 최고가", value: Number(detail.days250High).toLocaleString() + "원", color: theme.palette.stock.rise, tooltip: stockToolTipText.d250Hgpr },
          { label: "250일 최저가", value: Number(detail.days250Low).toLocaleString() + "원", color: theme.palette.stock.fall, tooltip: stockToolTipText.d250Lwpr },
        ],
        //가치평가
        valuation: [
          { label: "PER", value: detail.per + "배", tooltip: stockToolTipText.per },
          { label: "PBR", value: detail.pbr + "배", tooltip: stockToolTipText.pbr },
          { label: "EPS", value: Number(detail.eps).toLocaleString() + "원", tooltip: stockToolTipText.eps },
          { label: "BPS", value: Number(detail.bps).toLocaleString() + "원", tooltip: stockToolTipText.bps },
        ],
        //수급 거래
        flow: [
          { label: "외국인 순매수", value: Number(detail.foreignNetBuyQty).toLocaleString() + "주", tooltip: stockToolTipText.frgnNtbyQty },
          { label: "프로그램매매 순매수", value: Number(detail.programNetBuyQty).toLocaleString() + "주", tooltip: stockToolTipText.pgtrNtbyQty },
          { label: "HTS 외국인 소진율", value: `${detail.foreignOwnershipRate}%`, tooltip: stockToolTipText.htsFrgnEhrt },
          { label: "거래량 회전율", value: `${detail.volumeTurnoverRate}%`, tooltip: stockToolTipText.volTnrt },
        ],
        //리스크 상태
        risk: [
          { label: "임시 정지 여부", value: detail.tempStop ? "Y" : "N", tooltip: stockToolTipText.tempStopYn },
          { label: "투자유의 여부", value: detail.investmentCaution ? "Y" : "N", tooltip: stockToolTipText.invtCafulYn },
          { label: "단기 과열 여부", value: detail.shortOver ? "Y" : "N", tooltip: stockToolTipText.shortOverYn },
          { label: "관리종목 여부", value: detail.managementIssueCode ? "Y" : "N", tooltip: stockToolTipText.mangIssuClsCode },
        ]
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }    
  }
  // [5] 반환
  return { nameCard, stockDetail, loading, error };
}
