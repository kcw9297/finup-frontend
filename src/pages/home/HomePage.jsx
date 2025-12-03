import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import MainLayout from "../../base/layouts/MainLayout";
import banner from '../../assets/banner.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useHomePage } from "./useHomePage";

export default function HomePage() {

  // 공지사항 목록
  const noticeList = ["서버 점검 안내(25.12.01)", "신규 기능 업데이트 안내", "서비스 이용 시 유의 사항"]
  const {noticeCurrent, fade, showNext} = useHomePage(noticeList)

    return (
      <>
        <MainLayout>

          {/* Top */}
          <Box sx={{display:'flex', flexDirection:'column', gap:'20px', borderBottom:"1px solid #ddd"}}>

            {/* 배너 */}
            <Box component={Link} to="" sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <img src={banner} alt="배너" style={{height:300, borderRadius:20}}/>
            </Box>

            {/* 공지사항 */}
            <Box
              sx={{display:'flex', justifyContent:'space-between', padding:'10px 20px', border:1, borderColor:'line.main', borderRadius:3,
                "& p": {cursor:"pointer", fontSize:16,}
              }}>
              <Box component="Link" href="" sx={{display:'flex', gap:'10px'}}>
                <NotificationsIcon/>
                <p>공지사항</p>
                <p>|</p>
                <p style={{opacity: fade ? 1 : 0, transition:'opacity 0.3s ease-in-out'}}>{noticeList[noticeCurrent]}</p>
              </Box>
              <UnfoldMoreIcon onClick={() => showNext(true)} sx={{cursor:"pointer"}}/>
            </Box>

            {/* 환율, 코스피, 코스닥 */}
            <Box>

            </Box>
          </Box>

        </MainLayout>
      </>
    )
}