import { Card, CardContent, Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useStockDetail } from "../hooks/useStocksDetailStock.js";

export default function StocksDetailNameCard() {
  const { code } = useParams();
  const { headInfo, basic, price, valuation, flow, risk} = useStockDetail(code);

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F1F4F7",
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
          src="https://static.toss.im/png-icons/securities/icn-sec-fill-005930.png"
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
          background: "#F1F4F7",
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
              삼성전자
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 500, color: "#8E98A8" }}>
              005930
            </Typography>
          </Box>

          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            98,700원
          </Typography>
        </CardContent>
      </Card>
    </Card>
  );
}
