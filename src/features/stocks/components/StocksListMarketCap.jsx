import './StocksListTable.css';
import data from "./test/StocksTestData.js";

/* Table */
/* 시가총액 */
export default function StocksListMarketCap() {


  const formatPrice = (num) => Number(num).toLocaleString() + '원';

  const formatMarketCap = (num) => {
    const trillion = 10000; // 1조 = 1만 억
    if (num > trillion) {
      return (
        Math.floor(num / trillion) +
        '조 ' +
        (num % trillion).toLocaleString() +
        '억원'
      );
    }
    return Number(num).toLocaleString() + '억원';
  };

  const getChangeColor = (sign) => {
    if (sign === '2') return '#F15764'; // 상승
    if (sign === '5') return '#1E90FF'; // 하락
    return '#000';
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formatted = `${year}.${month}.${day}.`;

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="table-cell rank-wrap">
          순위·오늘({formatted}) 기준
        </div>
        <div className="table-cell price">현재가</div>
        <div className="table-cell change">등락률</div>
        <div className="table-cell marketcap">시가총액</div>
        <div className="table-cell weight">비중</div>
      </div>

      {data.output.map((item) => (
        <div className="table-row" key={item.mksc_shrn_iscd}>
          <div className="table-cell rank-wrap">
            <div className="table-cell rank">{item.data_rank}</div>

            <div className="table-cell img">
              <img
                src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${item.mksc_shrn_iscd}.png`}
                alt={item.hts_kor_isnm}
              />
            </div>

            <div className="table-cell name">{item.hts_kor_isnm}</div>
          </div>

          <div className="table-cell price">
            {formatPrice(item.stck_prpr)}
          </div>

          <div
            className="table-cell change"
            style={{ color: getChangeColor(item.prdy_vrss_sign) }}
          >
            {item.prdy_ctrt}%
          </div>

          <div className="table-cell marketcap">
            {formatMarketCap(item.stck_avls)}
          </div>

          <div className="table-cell weight">
            {item.mrkt_whol_avls_rlim}%
          </div>
        </div>
      ))}
    </div>
  );
}

