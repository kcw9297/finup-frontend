import { Card, CardContent, Box, Typography } from "@mui/material";
import thema from "../../../base/design/thema.js"

export default function StocksDetailNameCard(nameCard) {

  // const nameCardInfo = Object.fromEntries(
  //   nameCard.map(item => [item.label, item.value])
  // );

  // const code = nameCardInfo["종목코드"] || "종목코드없음";
  // const htsKorIsnm = nameCardInfo["종목명"] || "종목명없음";
  // const stckPrpr = nameCardInfo["주식 현재가"] || "0";

  // //const code = nameCard.find(item => item.label === "종목코드")?.value || "";
  // //const htsKorIsnm = nameCard.find(item => item.label === "종목명")?.value || "";
  // const imgSrc = `https://static.toss.im/png-icons/securities/icn-sec-fill-${code}.png`;
  // //디폴트 이미지 나중에 정적 소스로 넣고 url 변경하기(현재는 그냥 삼성전자로함)
  // const defaultImg = "https://static.toss.im/png-icons/securities/icn-sec-fill-005930.png"; 
  
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
          //src={imgSrc}        
          //onError={(e) => { e.currentTarget.src = defaultImg; }}
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
              {/* 가져온거: {htsKorIsnm},  걍 쓴거: 삼성전자 */}
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 500, color: "#8E98A8" }}>
              종목코드
              {/* {code} */}
            </Typography>
          </Box>

          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            가격
            {/* {stckPrpr} */}
          </Typography>
        </CardContent>
      </Card>
    </Card>
  );
}
