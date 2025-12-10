import { Tooltip, Box } from "@mui/material";
import thema from "../../../base/design/thema.js"
import { chartToolTipText } from "../constants/stocksToolTipText.js";
export default function StocksDetailTooltip({ text, textKey, children }) {

  const finalText = textKey ? chartToolTipText[textKey] : text;

  return (
    <Tooltip 
      title={finalText}
      arrow 
      placement="bottom"
      componentsProps={{
        tooltip: {
          sx: {
            whiteSpace: "pre-line",
            fontSize: 13,
            p: 1.2,
            borderRadius: 1.5,
            backgroundColor: thema.palette.base.light,
            color:"black",
          },
        },
        arrow:{
          sx:{
            color:thema.palette.base.light
          }
        }
      }}
    >
      {children}
    </Tooltip>
  );
}
