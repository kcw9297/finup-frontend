import { Chip } from "@mui/material";
import Stack from "@mui/material/Stack";
import StocksDetailTooltip from "../StocksDetailTooptip";

export default function ChipBar({ohlc, ma}){
  return(
    <Stack id="chipbar-ohlc" spacing={1} sx={{mb:1}}>
      {/* OHLC */}
      <Stack direction="row" spacing={1}>
        <StocksDetailTooltip textKey="open">
          <Chip label={`시가 ${ohlc.open?.toLocaleString("ko-KR") ?? "-"}`} variant="outlined"/>
        </StocksDetailTooltip>
        <StocksDetailTooltip textKey="high">
          <Chip label={`고가 ${ohlc.high?.toLocaleString("ko-KR") ?? "-"}`} variant="outlined"/>
        </StocksDetailTooltip>
        <StocksDetailTooltip textKey="low">
          <Chip label={`저가 ${ohlc.low?.toLocaleString("ko-KR") ?? "-"}`} variant="outlined"/>
        </StocksDetailTooltip>
        <StocksDetailTooltip textKey="close">
          <Chip label={`종가 ${ohlc.close?.toLocaleString("ko-KR") ?? "-"}`} variant="outlined"/>
        </StocksDetailTooltip>
      </Stack>

      {/* MA */}
      <Stack direction="row" spacing={1}>
        <StocksDetailTooltip textKey="ma5">
          <Chip
            label={`MA5 ${ma.ma5?.toLocaleString("ko-KR") ?? "-"}`}
            sx={{ background: "#fee2e2", color: "#ef4444" }}
          />
        </StocksDetailTooltip>

        <StocksDetailTooltip textKey="ma20">
          <Chip
            label={`MA20 ${ma.ma20?.toLocaleString("ko-KR") ?? "-"}`}
            sx={{ background: "#dbeafe", color: "#3b82f6" }}
          />
        </StocksDetailTooltip>
      </Stack>

    </Stack>
  )
}