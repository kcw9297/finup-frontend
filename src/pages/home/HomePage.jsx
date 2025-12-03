import { Box, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MainLayout from "../../base/layouts/MainLayout";
import { Link } from "react-router-dom";
import banner from '../../assets/banner.png'

export default function HomePage() {

  //공지사항
  const notice = ["서버 점검 안내(12/01)"];

    return (
      <>
        <MainLayout>
          {/* Top */}
          <Box sx={{display:'flex', flexDirection:'column', gap:'20px', border:"1px solid #ddd"}}>
            {/* 베너 */}
            <Box component={Link} to="" sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <img src={banner} alt="배너" style={{height:300, borderRadius:20}}/>
            </Box>
            <Box
              sx={{display:'flex', gap:'10px', padding:'10px 20px', border:"1px solid #ddd",
                "& p": {cursor:"pointer", fontSize:16,}
              }}>
              <NotificationsIcon/>
              <p key={notice}>{notice}</p>
            </Box>
          </Box>

        </MainLayout>
      </>
    )
}