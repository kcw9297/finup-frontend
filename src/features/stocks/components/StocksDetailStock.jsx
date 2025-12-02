import { Box } from "@mui/material";
import StocksDetailInfoTooltipIcon from "./StocksDetailInfoTooltipIcon";

export default function StocksDetailStock(){

  return (
    // <Box>
    <Box sx={{backgroundColor: "#FFFFFF", py:3}}>
      {/* 학습방법 설명 박스 */}
      <StocksDetailInfoTooltipIcon />
    </Box>
  );
}