import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import MainLayout from "../../base/layouts/MainLayout";
import banner from '../../assets/banner.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

export default function HomePage() {

  // 공지사항 목록
  const noticeList = ["서버 점검 안내(25.12.01)", "신규 기능 업데이트 안내", "서비스 이용 시 유의 사항"];
  const [noticeCurrent, setNoticeCurrent] = useState(0)
  const [fade, setFade] = useState(true)
  const intervalRef = useRef(null)

  const resetInterval = () => {
    if(intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
    showNextNotice(false)
  }, 5000)
  }

  // 공지 이동
  const showNextNotice = (shouldReset = true) => {
    setFade(false)
    setTimeout(() => {
      setNoticeCurrent((prev) => (prev+1) % noticeList.length)
      setFade(true)
      if(shouldReset) resetInterval()
    }, 400)
  }

  // 공지사항 자동 이동(3초)
  useEffect(() => {
    resetInterval()
    return () => clearInterval(intervalRef.current)
  }, [])

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
              <UnfoldMoreIcon onClick={() => showNextNotice(true)} sx={{cursor:"pointer"}}/>
            </Box>
          </Box>

        </MainLayout>
      </>
    )
}