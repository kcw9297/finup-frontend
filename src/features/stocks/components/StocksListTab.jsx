import { Box, Chip } from "@mui/material";
import { useState } from "react";
import StocksListMarketCap from "./StocksListMarketCap";
import StocksListTradingValue from "./StocksListTradingValue";

/* 종목+ 카테고리 공통 탭 (Chip 버전) */
export default function StocksListTab() {

  const [value, setValue] = useState(0);

  const tabs = [
    { label: "시가총액", value: 0 },
    { label: "거래대금", value: 1 },
  ];

  return (
    <>
      {/* Chip 영역 */}
      <Box sx={{ display: "flex", gap: 1, paddingY: 2 }}>
        {tabs.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            clickable
            onClick={() => setValue(item.value)}
            sx={{
              borderRadius: "16px",
              px: 1.5,
              backgroundColor:
                value === item.value ? "#EDF2FF" : "transparent",
              color: value === item.value ? "#3B5BDB" : "#666",
              fontWeight: value === item.value ? 600 : 400,
              "&:hover": {
                backgroundColor:
                  value === item.value ? "#EDF2FF" : "#F5F5F5",
              },
              "&:active": {
                boxShadow: "none",
              },
            }}
          />
        ))}
      </Box>

      {/* 콘텐츠 */}
      {value === 0 && <StocksListMarketCap />}
      {value === 1 && <StocksListTradingValue />}
    </>
  );
}