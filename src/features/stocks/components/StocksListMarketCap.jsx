//import './StocksListTable.css';
import data from "./test/StocksTestData.js";
import { useState } from 'react';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Avatar } from '@mui/material';
import defaultImg from "../../../assets/default_stock.png";
import theme from "../../../base/design/thema.js";
import { useStockList } from "../hooks/useStocksList.js";
import { useNavigate } from "react-router-dom";

/* Table */
/* 시가총액 */
export default function StocksListMarketCap() { 

  const { stockList, loading }  = useStockList();
  const navigate = useNavigate();

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
        <Table>
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
            {stockList.map((row) => {                    
              return(
                <TableRow
                  key={row.dataRank} 
                  onClick={() => navigate(`/stocks/detail/${row.mkscShrnIscd}`)}                 
                > 
                  <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {row.dataRank}
                    <Avatar sx={{ width: 40, height: 40 }}>
                      <img
                        src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${row.mkscShrnIscd}.png`}
                        onError={(e) => { e.currentTarget.src = defaultImg }}
                        style={{ width: '100%', height: '100%' }}
                        alt={row.htsKorIsnm}
                      />
                    </Avatar>
                    {row.htsKorIsnm} 
                  </TableCell> 
                  <TableCell align="right">{Number(row.stckPrpr).toLocaleString()}원</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: getChangeColor(row.prdyVrssSign)                 
                    }}
                    >
                    {row.prdyCtrt}%
                  </TableCell> 
                  <TableCell align="right">{formatMarketCap(row.stckAvls)}</TableCell> 
                  <TableCell align="right">{row.mrktWholAvlsRlim}%</TableCell> 
                </TableRow>
              );
            })} 
          </TableBody>
        </Table> 
      </TableContainer>
    </>
  );
}

/*
const formatPrice = (num) => Number(num).toLocaleString() + '원';

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