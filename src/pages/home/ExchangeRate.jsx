import { Box, Paper, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// 환율, 코스피, 코스닥

export default function ExchangeRate ({data}) {
  const { title, today, diff, rate, isUp } = data;

  const Icon = isUp ? ArrowUpwardIcon : ArrowDownwardIcon;
  const color = isUp ? "stock.rise" : "stock.fall";
  const sign = isUp ? "+" : "-";

  // 소숫점2 + 천자리 콤마
  const formatNumber = (num) => {
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  }


  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "line.main",
        display: "flex",
        gap:'20px',
        alignItems: 'center',
        padding:'20px',
      }}
    >
      {/* 상승·하락 아이콘 */}
      <Icon sx={{height:60, width:60, color}}/>

      <Paper sx={{display: "flex", flexDirection: "column"}}>
        {/* 제목 */}
        <Typography sx={{fontSize:15}}>{title}</Typography>
        {/* 시세, 증가폭 */}
        <Paper sx={{display: "flex", flexDirection: "row", gap:1, alignItems: 'center'}}>
          <Typography sx={{fontSize:20, fontWeight:600}}>{formatNumber(today)}</Typography>
          <Typography sx={{fontSize:16, color}}>{sign}{formatNumber(diff)} ({formatNumber(rate)}%)</Typography>
        </Paper>
      </Paper>

    </Paper>
  )
}