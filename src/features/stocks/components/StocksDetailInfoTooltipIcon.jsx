import { Box, Chip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"; // i 아이콘
import BookmarkOutlined from "@mui/icons-material/BookmarkOutlined";// 북마크 아이콘

export default function StocksDetailInfoTooltipIcon() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#E6ECF9",
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",        
        borderRadius: 1,
      }}
    >
      {/* 학습방법 Chip */}
      <Chip        
        icon={<BookmarkOutlined sx={{ color: "#B0C3EB !important" }} />} // 왜 MUI 아이콘 색깔 변경이 안되냐
        label="학습방법"
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          height: 32,
          fontWeight: 500,          
        }}
      />
      <Box sx={{ color: "#B0C3EB", display: 'flex', alignItems: 'center', px: 1 }}>
        <InfoIcon/>            
      </Box>
      {/* 설명 문구 */}
      <Typography variant="body1" fontWeight={600}>
        아이콘에 마우스를 올리면 쉽게 설명을 볼 수 있어요!
      </Typography>
    </Box>
  );
}
