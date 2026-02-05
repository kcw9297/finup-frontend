import { Box, Button, CircularProgress, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StocksDetailStock from "./StocksDetailStock";
import StocksDetailNews from "./StocksDetailNews";
import StocksDetailChart from "./StocksDetailChart";


export default function StocksDetailTab({ stockDetail, loadingDetail }) {

  const [ value, setValue ] = useState("차트");
  const navigate = useNavigate();

  const handleChange = (e, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {loadingDetail ? (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '400px'
          }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <>
          {/* 목록으로 버튼 + 탭 */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            position: 'sticky',
            top: 80,
            zIndex: 1000,
            backgroundColor: (theme) => theme.palette.background.light,
            width: '100%'
          }}>
            <Button
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIcon />}
              sx={{
                color: (theme) => theme.palette.text.main,
                textTransform: "none",
                fontSize: 16,
                mx: 2
              }}
            >
              목록으로
            </Button>

            <ToggleButtonGroup
              value={value}
              exclusive
              onChange={handleChange}
              sx={{
                background: (theme) => theme.palette.background.light,
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
              <ToggleButton value="상세">상세</ToggleButton>
              <ToggleButton value="뉴스">뉴스</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {value === "차트" && <StocksDetailChart />}
          {value === "상세" && <StocksDetailStock stockDetail={stockDetail} />}
          {value === "뉴스" && <StocksDetailNews stockDetail={stockDetail} />}
        </>
      )}
    </>
  );
}