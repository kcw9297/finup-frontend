import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import StocksDetailStock from "./StocksDetailStock";
import StocksDetailNews from "./StocksDetailNews";
import StocksDetailChart from "./StocksDetailChart";
export default function StocksDetailTab() {
  const [value, setValue] = useState("차트");

  const handleChange = (e, newValue) => {
    if (newValue !== null) setValue(newValue);
  };

  return (
    <>
      <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      sx={{
      background: (theme) => theme.palette.background.light,
      //p: 0.5,
      borderRadius: 1,
      "& .MuiToggleButton-root": {
        width: 90,
        padding: "8px 0",
        borderRadius: 1,
        borderColor: (theme) => theme.palette.background.light,
        fontSize: 16,
        fontWeight: 400,
        color: (theme) => theme.palette.text.light,
        textTransform: "none",
        "&.Mui-selected": {
          backgroundColor: (theme) => theme.palette.background.base,
          color: (theme) => theme.palette.text.main,
          borderBottom: (theme) => theme.palette.background.base,
          borderRadius: "8px 8px 0 0",          
        },        
      },
      }}
      >
      <ToggleButton value="차트">차트</ToggleButton>
      <ToggleButton value="종목">종목</ToggleButton>
      <ToggleButton value="뉴스">뉴스</ToggleButton>
      </ToggleButtonGroup>

      {value === "차트" && <StocksDetailChart  />}
      {value === "종목" && <StocksDetailStock />}
      {value === "뉴스" && <StocksDetailNews />}
    </>
  );
}
