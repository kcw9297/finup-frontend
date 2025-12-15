import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import StocksListMarketCap from "./StocksListMarketCap";
import StocksListTradingValue from "./StocksListTradingValue";

/* 종목+ 카테고리에서 공통적으로 사용하는 탭(시가총액, 거래량) */
export default function StocksListTab() {
  console.log("StocksListTab 렌더됨");
  const [value, setValue] = useState(0); 
  
  return (    
    <>    
    <Tabs 
      value={value}
      onChange={(e, v) => setValue(v)}
      TabIndicatorProps={{
        style: {
          //backgroundColor: 'var(--normal-active)',
          //height: '2px',
        },
      }}
      sx={{
        //background: 'white',
        paddingY: 2,
        '& .MuiTab-root': {
          //minWidth: 'auto',
          //padding: '8px 16px',
          //fontSize: '16px',
          //fontFamily: 'Inter',
          //color: 'var(--normal-inactive)',
        },
        '& .Mui-selected': {
          //color: 'var(--normal-active)',
        },
      }}
    >
      <Tab label="시가총액" />
      <Tab label="거래대금" />
      <Tab label="나머지는 아직 뭐할지 안정함" />      
    </Tabs>

    {value === 0 && <StocksListMarketCap />}
    {value === 1 && <StocksListTradingValue />}
    {/* {value === 1 && <StocksListVolume />} */}
    </>
  );
}
