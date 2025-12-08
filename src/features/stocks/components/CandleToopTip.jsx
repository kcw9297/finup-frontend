import { Tooltip, Box } from "@mui/material";
import thema from "../../../base/design/thema.js"
export default function CandleTooltip({ text, children }) {
  return (
    <Tooltip 
      title={text}
      arrow 
      placement="bottom"
      componentsProps={{
        tooltip: {
          sx: {
            fontSize: 13,
            p: 1.2,
            borderRadius: 1.5,
            backgroundColor: thema.palette.base.light,
            color:"black"
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
}
