import { Chip, Stack, Tooltip } from "@mui/material";
import StocksDetailTooltip from "../StocksDetailTooptip";

export default function VolumeChipBar({volume}){
  const formatCompact = (num) => {
    if(num == null) return "-"
    return Intl.NumberFormat("en",{notation:"compact", maximumFractionDigits:1}).format(num)
  }
  return(
    <Stack direction="row" spacing={1} sx={{ my: 1 }}>
      
      <StocksDetailTooltip textKey="vol">
        <Chip
          label={`거래량 ${formatCompact(volume?.volume) ?? "-"}`}
          variant="outlined"
        />
      </StocksDetailTooltip>

      <StocksDetailTooltip textKey="volMa20">
        <Chip
          label={`MA20 거래량 ${formatCompact(volume?.volMa20) ?? "-"}`}
          sx={{ background: "#eef2ff", color: "#4338ca" }}
        />
      </StocksDetailTooltip>

    </Stack>
  )
}