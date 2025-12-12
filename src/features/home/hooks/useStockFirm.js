import kb_securities from "../../../assets/brokers/kb_securities.png";
import nh_investment from "../../../assets/brokers/nh_investment.png";
import korea_investment from "../../../assets/brokers/korea_investment.png";
import shinhan_investment from "../../../assets/brokers/shinhan_investment.png";
import kiwoom_securities from "../../../assets/brokers/kiwoom_securities.png";
import sk_securities from "../../../assets/brokers/sk_securities.png";
import mirae_asset_securities from "../../../assets/brokers/mirae_asset_securities.png";
import meritz_securities from "../../../assets/brokers/meritz_securities.png";
import samsung_securities from "../../../assets/brokers/samsung_securities.png";
import kyobo_securities from "../../../assets/brokers/kyobo_securities.png";
import hanyang_securities from "../../../assets/brokers/hanyang_securities.png";
import daishin_securities from "../../../assets/brokers/daishin_securities.png";
import hana_securities from "../../../assets/brokers/hana_securities.png";
import yuanta_securities from "../../../assets/brokers/yuanta_securities.png";
import hanwha_investment from "../../../assets/brokers/hanwha_investment.png";
import bookook_securities from "../../../assets/brokers/bookook_securities.png";
import hyundai_motor_securities from "../../../assets/brokers/hyundai_motor_securities.png";
import bnk_securities from "../../../assets/brokers/bnk_securities.png";
import ibk_investment from "../../../assets/brokers/ibk_investment.png";
import daol_investment from "../../../assets/brokers/daol_investment.png";
import sangsangin_securities from "../../../assets/brokers/sangsangin_securities.png";

// 주요 증권사 데이터

export function useStockFirm () {
  const brokerList = [
    { name: "KB증권",           eng: kb_securities,                 url: "https://www.kbsec.com/" },
    { name: "NH투자증권",        eng: nh_investment,                 url: "https://www.nhqv.com/" },
    { name: "한국투자증권",       eng: korea_investment,             url: "https://securities.koreainvestment.com/" },
    { name: "신한투자증권",       eng: shinhan_investment,           url: "https://www.shinhansec.com/" },
    { name: "키움증권",          eng: kiwoom_securities,            url: "https://www.kiwoom.com/" },
    { name: "SK증권",            eng: sk_securities,                 url: "https://www.sks.co.kr/" },
    { name: "미래에셋증권",       eng: mirae_asset_securities,       url: "https://securities.miraeasset.com/" },
    { name: "메리츠증권",         eng: meritz_securities,            url: "https://www.imeritz.com/" },
    { name: "삼성증권",           eng: samsung_securities,           url: "https://www.samsungsecurities.co.kr/" },
    { name: "교보증권",           eng: kyobo_securities,             url: "https://www.iprovest.com/" },
    { name: "한양증권",           eng: hanyang_securities,           url: "https://www.hygood.co.kr/" },
    { name: "대신증권",           eng: daishin_securities,           url: "https://www.daishin.com/" },
    { name: "하나증권",           eng: hana_securities,              url: "https://www.hanaw.com/" },
    { name: "유안타증권",         eng: yuanta_securities,            url: "https://www.myasset.com/" },
    { name: "한화투자증권",       eng: hanwha_investment,            url: "https://www.hanwhawm.com/" },
    { name: "부국증권",           eng: bookook_securities,           url: "https://www.bookook.co.kr/" },
    { name: "현대차증권",         eng: hyundai_motor_securities,     url: "https://www.hmsec.com/" },
    { name: "BNK투자증권",        eng: bnk_securities,               url: "https://www.bnkfn.co.kr/" },
    { name: "IBK투자증권",        eng: ibk_investment,               url: "https://www.ibks.com/" },
    { name: "다올투자증권",       eng: daol_investment,              url: "https://www.daolsecurities.com/" },
    { name: "상상인증권",         eng: sangsangin_securities,        url: "https://www.sangsanginib.com/" }
  ]

  return {brokerList}
}