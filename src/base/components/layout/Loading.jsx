import { Box, CircularProgress } from "@mui/material";

export default function Loading() {

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' // 전체 화면 높이
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}