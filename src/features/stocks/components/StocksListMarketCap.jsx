import { useState } from 'react';
import { Table,Box, TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Avatar, Typography, CircularProgress } from '@mui/material';
import defaultImg from "../../../assets/default_stock.png";
import theme from "../../../base/design/thema.js";
import { useStockList } from "../hooks/useStocksMarketCapList.js";
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
    if (sign === 2) return theme.palette.stock.rise; // 상승
    if (sign === 5) return theme.palette.stock.fall; // 하락    
  };

  const getChangeSymbol = (sign) => {
    if (sign === 2) return '+'; // 상승
    if (sign === 5) return ''; // 하락    
    return '';
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

            {/* 로딩 중 */}
            {loading && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 20 }}>
                  <CircularProgress size={50} />
                </TableCell>
              </TableRow>
            )}

            {/* 조회된 종목 없음 */}
            {!loading && stockList.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 20 }}>
                  <Typography variant="body2" color="text.secondary">
                    조회된 종목이 없습니다
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {/* 주식 목록 표시 */}
            {!loading && stockList.map((row) => {                    
              return(
                <TableRow
                  key={row.stockCode} 
                  hover 
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/stocks/detail/${row.stockCode}`)}                 
                > 
                  <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {row.dataRank}
                    <Avatar sx={{ width: 40, height: 40 }}>
                      <img
                        src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${row.stockCode}.png`}
                        onError={(e) => { e.currentTarget.src = defaultImg }}
                        style={{ width: '100%', height: '100%' }}
                        alt={row.stockCode}
                      />
                    </Avatar>
                    {row.stockName} 
                  </TableCell> 
                  <TableCell align="right">{Number(row.currentPrice).toLocaleString()}원</TableCell>
                  <TableCell align="right" sx={{ color: getChangeColor(row.priceChangeSign) }}>
                    <Box sx={{ fontSize: '0.925rem', opacity: 1.0 }}>
                      {`${getChangeSymbol(row.priceChangeSign)}${row.changeRate}%`}
                    </Box>
                    <Box sx={{ fontSize: '0.775rem' }}>
                      {`${getChangeSymbol(row.priceChangeSign)}${Number(row.priceChange).toLocaleString()}원`}
                    </Box>
                  </TableCell> 
                  <TableCell align="right">{formatMarketCap(row.marketCap)}</TableCell> 
                  <TableCell align="right">{row.marketCapRatio}%</TableCell> 
                </TableRow>
              );
            })} 
          </TableBody>
        </Table> 
      </TableContainer>
    </>
  );
}

