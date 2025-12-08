import { Box, Paper, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";

export default function StockFirm( {brokerList } ) {

  // 페이지 상태 + 계산 (7개씩 보여주기)
  const [page, setPage] = useState(0);
  const itemsPerPage = 7;

  const maxPage = Math.ceil(brokerList.length / itemsPerPage) - 1;
  const start = page * itemsPerPage;
  const visibleList = brokerList.slice(start, start + itemsPerPage);

  // 버튼 활성 조건
  const isPrevDisabled = page === 0;
  const isNextDisabled = page === maxPage;

  const handlePrev = () => !isPrevDisabled && setPage(prev => prev - 1);
  const handleNext = () => !isNextDisabled && setPage(prev => prev + 1);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>

      {/* 제목 + 버튼 */}
      <Box 
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",
        "& .MuiTypography-root": { fontSize: 22, fontWeight: 600 }}}>

        {/* 제목 */}
        <Paper sx={{ display: 'flex', gap: '10px', alignItems: 'center', paddingRight: 1 }}>
          <Typography sx={{ color: 'base.main', backgroundColor: 'base.main' }}>&nbsp;</Typography>
          <Typography>주요 증권사</Typography>
        </Paper>

        {/* < > 버튼 */}
        <Box>
          <IconButton onClick={handlePrev}>
            <ArrowBackIosNewIcon sx={{ color: isPrevDisabled ? "text.light" : "text.main" }}/>
          </IconButton>

          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon sx={{ color: isNextDisabled ? "text.light" : "text.main" }}/>
          </IconButton>
        </Box>
      </Box>

      {/* 증권사 리스트 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {visibleList.map((broker, idx) => (
        <Box key={idx}
          sx={{
            width: 150,
            display: "flex",
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: "center",
            gap: '10px',
            cursor: "pointer",
          }}
          onClick={() => window.open(broker.url, "_blank", "noopener,noreferrer")}>
            
          {/* 로고 */}
          <Box component="img" src={broker.eng} alt={broker.name} sx={{ width: 150, height: 150, borderRadius: 100, }}/>

          {/* 이름 */}
          <Typography>{broker.name}</Typography>

          {/* 바로가기 버튼 스타일 */}
          <Box
            sx={{ marginTop:'15px', border: 1, borderRadius: '10px', padding: '5px 10px', color: 'base.main', fontSize: 13,
              "&:hover": { backgroundColor: 'base.main', color: 'text.contrastText' }, }}>
            바로가기
          </Box>
        </Box>
      ))}
    </Box>

    </Box>
  )
}