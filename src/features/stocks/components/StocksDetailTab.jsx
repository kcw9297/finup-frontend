import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import StocksDetailStock from "./StocksDetailStock";
import StocksDetailNews from "./StocksDetailNews";
import StocksDetailChart from "./StocksDetailChart";
export default function StocksDetailTab() {
  const [value, setValue] = React.useState(1);

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
      background: "#F1F4F7",
      //p: 0.5,
      borderRadius: 1,
      "& .MuiToggleButton-root": {
        width: 90,
        padding: "8px 0",
        borderRadius: 1,
        fontSize: 16,
        fontWeight: 400,
        color: "#1E1E1E",
        textTransform: "none",
        "&.Mui-selected": {
          backgroundColor: "white",
          color: "#1E1E1E",
          borderRadius: "8px 8px 0 0",
          "&:hover": {
            backgroundColor: "white",
          },
        },
        "&:hover": {
          backgroundColor: "#E4E8EE",
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
