//import './StocksListTable.css';
import data from "./test/StocksTestData.js";
import { useState } from 'react';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Avatar } from '@mui/material';
import defaultImg from "../../../assets/default_stock.png";
import theme from "../../../base/design/thema.js";

/* Table */
/* 시가총액 */
export default function StocksListMarketCap() { 
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formatted = `${year}.${month}.${day}.`;

  //~조 ~억원 형식
  const formatMarketCap = (num) => {
    const trillion = 10000; 
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

  //상승 하락 색
  const getChangeColor = (sign) => {
    if (sign === '2') return theme.palette.stock.rise; // 상승
    if (sign === '5') return theme.palette.stock.fall; // 하락    
  };

  
  return (
    <>
      <TableContainer>
        <Table>{/* <Table sx={{ minWidth: 650 }}> */}
          <TableHead > 
            <TableRow> 
              <TableCell>순위·오늘({formatted}) 기준</TableCell>               
              <TableCell align="right">현재가</TableCell> 
              <TableCell align="right">등락률</TableCell> 
              <TableCell align="right">시가총액</TableCell> 
              <TableCell align="right">시가총액 비중</TableCell> 
            </TableRow> 
          </TableHead> 
          <TableBody>
            {data.map((row) => {   
              const [imgSrc, setImgSrc] = useState(
                `https://static.toss.im/png-icons/securities/icn-sec-fill-${row.mksc_shrn_iscd}.png`
              );    
              return(
                <TableRow
                  //key={row.data_rank}
                  //sx={{
                  //backgroundColor:
                  //row.rank % 2 === 0 ? 'var(--bg-row-even)' : 'var(--bg-row-odd)',
                  //}}
                > 
                  <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {row.data_rank}
                    <Avatar 
                      src={imgSrc}
                      imgProps={{
                        onError: () => setImgSrc(defaultImg),
                      }}
                      sx={{ width: 40, height: 40 }} 
                    /> 
                    {row.hts_kor_isnm} 
                  </TableCell> 
                  <TableCell align="right">{Number(row.stck_prpr).toLocaleString()}원</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: getChangeColor(row.prdy_vrss_sign)                 
                    }}
                    >
                    {row.prdy_ctrt}%
                  </TableCell> 
                  <TableCell align="right">{formatMarketCap(row.stck_avls)}</TableCell> 
                  <TableCell align="right">{row.mrkt_whol_avls_rlim}%</TableCell> 
                </TableRow>
              );
            })} 
          </TableBody>
        </Table> 
      </TableContainer>
    </>
  );
}
//시가총액 ~조 ~억원 형식 맞추기 위해
function formatNumber() {

  const formatLargeNumber = (value) => {
    const num = Number(value);
    const trillion = Math.floor(num / 10000);
    const billion = num % 10000;

    if (trillion > 0 && billion > 0) {
      return `${trillion}조 ${billion}억원`;
    } else if (trillion > 0) {
      return `${trillion}조`;
    } else {
      return `${billion}억원`;
    }
  };
}

/*
const formatPrice = (num) => Number(num).toLocaleString() + '원';

  

  

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formatted = `${year}.${month}.${day}.`;

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
    </div>*/