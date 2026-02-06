import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import logo from '../../../assets/logo.png'


export default function Error404() {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh', // 화면 높이의 70%
        textAlign: 'center',
        py: 8,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '60px 80px',
          boxShadow: '0 4px 20px rgba(0, 53, 128, 0.1)',
          maxWidth: '600px',
        }}
      >
        {/* 로고 */}
        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            cursor: 'pointer',
            mb: 4
          }}
        >
          <img src={logo} alt="FinUp Logo" style={{ height: 60 }} />
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: '72px',
            fontWeight: 700,
            color: '#003580',
            mb: 2,
          }}
        >
          404 Error
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#333',
            mb: 2,
          }}
        >
          죄송합니다. 페이지를 찾을 수 없습니다.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: '14px',
            color: '#666',
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          존재하지 않는 주소를 입력하셨거나
          <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate('/', {replace: true})}
          sx={{
            backgroundColor: '#003580',
            color: '#ffffff',
            padding: '12px 40px',
            fontSize: '16px',
            fontWeight: 600,
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#002060',
            },
          }}
        >
          홈으로
        </Button>
      </Box>
    </Box>
  );
}