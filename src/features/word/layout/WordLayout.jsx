import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import WordSearchHeader from "../components/WordSearchHeader";

export default function WordLayout() {
  return (
    <Box>
      {/* 검색 헤더 */}
      <Box sx={{ mb: 3 }}>
        <WordSearchHeader />
      </Box>
      
      {/* 하위 라우트 페이지 */}
      <Outlet />
    </Box>
  );
}