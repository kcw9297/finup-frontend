import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import banner from '../../../assets/banner.png';

// 개념 테스트 이동 배너

export default function Banner () {
  return(
    <Box component={Link} to="" sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
      <img src={banner} alt="배너" style={{height:300, borderRadius:20}}/>
    </Box>
  )
}