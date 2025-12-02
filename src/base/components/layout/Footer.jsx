import React from 'react';
import { Box, Container, Grid, Typography, Link, TextField, Button, IconButton, Stack} from '@mui/material';

/**
 * 홈페이지 Footer
 */

export default function Footer() {

  return (
    <Box
      component="footer"
      sx={{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        gap:'25px',
        margin:'auto',
        padding:'30px',
        backgroundColor:'white',
        "& p": {
            margin:0,
            color:"text.light",
            fontSize:"16px",
          }
      }}
    >

      <Box sx={{display:'flex', gap:'10px'}}>
        <Link underline="none" href=''>개인정보 처리방침</Link>
        <p>ㅣ</p>
        <Link underline="none" href=''>공지사항</Link>
        <p>ㅣ</p>
        <Link underline="none" href='https://www.chunjae.co.kr'>(주)천재교육</Link>
      </Box>

      <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'5px'}}>
        <p>사업자등록번호: 119-81-19350 &nbsp; | &nbsp; 서울특별시 디지털로 9길 23 마리오아울렛2관 11층 천재IT교육센터</p>
        <p>본 플랫폼에서 제공하는 정보는 투자 판단을 위한 참고 자료일 뿐이며, 어떠한 경우에도 투자 권유·종목 추천·자문에 해당하지 않습니다.</p>
      </Box>
    </Box>
  );
}