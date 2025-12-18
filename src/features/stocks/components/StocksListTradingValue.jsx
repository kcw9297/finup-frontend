import { useState } from 'react';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Avatar } from '@mui/material';
import defaultImg from "../../../assets/default_stock.png";
import theme from "../../../base/design/thema.js";
import { useStockList } from "../hooks/useStocksTradingValueList.js";
import { useNavigate } from "react-router-dom";


/* Table */
/* 거래량 */
export default function StocksListTradingValue() { 

  const { stockList, loading }  = useStockList();
  const navigate = useNavigate();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formatted = `${year}.${month}.${day}.`;

  //~조 ~억 ~만원 형식
  const formatTradingValue = (num) => {
    if (!num || num === 0) return '0원';

    const JO = 1_000_000_000_000; // 1조
    const EOK = 100_000_000;      // 1억
    const MAN = 10_000;           // 1만

    const jo = Math.floor(num / JO);
    const eok = Math.floor((num % JO) / EOK);
    const man = Math.floor((num % EOK) / MAN);
    const won = Math.floor((num % MAN));

    let result = [];

    if (jo > 0) result.push(`${jo}조`);
    if (eok > 0) result.push(`${eok.toLocaleString()}억`);
    if (man > 0) result.push(`${man.toLocaleString()}만`);
    if (won > 0) result.push(`${won.toLocaleString()}원`);

    return result.join(' ');
  };

  //상승 하락 색
  const getChangeColor = (sign) => {
    if (sign === '2') return theme.palette.stock.rise; // 상승
    if (sign === '5') return theme.palette.stock.fall; // 하락    
  };

  const getChangeSymbol = (sign) => {
    if (sign === '2') return '+'; // 상승
    if (sign === '5') return ''; // 하락  
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
              <TableCell align="right">누적 거래 대금</TableCell> 
              <TableCell align="right">평균 거래량</TableCell> 
            </TableRow> 
          </TableHead> 
          <TableBody>
            {stockList.map((row) => {                    
              return(
                <TableRow
                  key={row.dataRank} 
                  hover 
                  sx={{ cursor: "pointer" }}
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
                  <TableCell align="right" sx={{ color: getChangeColor(row.prdyVrssSign) }}>
                    {`${getChangeSymbol(row.prdyVrssSign)}${row.prdyCtrt}%`}
                  </TableCell> 
                  <TableCell align="right">{formatTradingValue(row.acmlTrPbmn)}</TableCell> 
                  <TableCell align="right">{Number(row.avrgVol).toLocaleString()}주</TableCell> 
                </TableRow>
              );
            })} 
          </TableBody>
        </Table> 
      </TableContainer>
    </>
  );
}

