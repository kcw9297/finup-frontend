import { Card, CardContent, Box, Typography } from "@mui/material";
import thema from "../../../base/design/thema.js"
import { useContext } from "react";
import { StockDetailContext } from "../context/StockDetailContext";
import defaultImg from "../../../assets/default_stock.png";

export default function StocksDetailNameCard() {

  const { nameCard } = useContext(StockDetailContext); 

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: thema.palette.background.light,
        paddingBottom: 2,
        borderRadius: 2,
        overflow: "hidden",
        width: "fit-content",
      }}
    >
      {/* 이미지 */}
      <Box sx={{ width: 80, height: 80, position: "relative" }}>
        <Box
          component="img"
          src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${nameCard.code}.png`}        
          onError={(e) => { e.currentTarget.src = defaultImg; }}         
          sx={{
            width: 70,
            height: 70,
            position: "absolute",
            top: 5,
            left: 5,
            borderRadius: 2,
          }}
        />
      </Box>

      {/* 오른쪽 텍스트 카드 */}
      <Card
        elevation={0}
        sx={{
          background: thema.palette.background.light,
          borderRadius: 2,
        }}
      >
        <CardContent
          sx={{
            padding: "16px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            alignItems: "flex-start", 
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              { nameCard.stockName }{/* 종목명 */}
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 500, color: thema.palette.text.light }}>
              { nameCard.code }{/* 종목코드 */}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            { nameCard.price }{/* 가격 */}    
          </Typography>
        </CardContent>
      </Card>
    </Card>
  );
}
