import { Box, Chip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"; // i 아이콘
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";// 북마크 아이콘
import theme from "../../../base/design/thema";

export default function StocksDetailInfoTooltipIcon({text}) {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.base.light,
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",        
        borderRadius: 1,
      }}
    >
      {/* 학습방법 Chip */}
      <Chip        
        icon={<BookmarkBorder sx={{ color: theme.palette.base.lightActive}} />} // 왜 MUI 아이콘 색깔 변경이 안되냐 "#b0c3eb !important" 하니까됨 
        label="학습방법"
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          height: 32,
          fontWeight: 500,          
        }}
      />
      <Box sx={{ color: theme.palette.base.lightActive, display: 'flex', alignItems: 'center', px: 1 }}>
        <InfoIcon/>            
      </Box>
      {/* 설명 문구 */}
      <Typography variant="body1" fontWeight={600}>
        {text}
      </Typography>
    </Box>
  );
}
