import { Box } from "@mui/material";

import MainLayout from "../../base/layouts/MainLayout";

import { useHomePage } from "./useHomePage";
import Notice from "./Notice";
import Banner from "./Banner";
import ExchangeRate from "./ExchangeRate";
import KeywordNews from "./KeywordNews";
import GoodVideo from "./GoodVideo";
import StockFirm from "./StockFirm";

export default function HomePage() {

  // 공지사항 목록
  const noticeList = ["서버 점검 안내(25.12.01)", "신규 기능 업데이트 안내", "서비스 이용 시 유의 사항"]
  const {noticeCurrent, fade, showNext} = useHomePage(noticeList)

  // 환율, 코스피 임시 데이터
  const usd = {
    title: "USD/KRW",
    today: 1344.50,
    yesterday: 1338.10,
    diff: 6.40,
    rate: 0.47,
    isUp: true
  }
  const jpy = {
    title: "USD/KRW",
    today: 1344.50,
    yesterday: 1338.10,
    diff: 6.40,
    rate: 0.47,
    isUp: true
  }
  const kospi = {
    title: "USD/KRW",
    today: 1344.50,
    yesterday: 1338.10,
    diff: 6.40,
    rate: 0.47,
    isUp: true
  }
  const kosdaq = {
    title: "USD/KRW",
    today: 1344.50,
    yesterday: 1338.10,
    diff: 6.40,
    rate: 0.47,
    isUp: true
  }
  const fxList = [usd, jpy, kospi, kosdaq];

  // 임시 추천 영상
  const fakeVideos = [
    {
      id: 1,
      videoId: "5qap5aO4i9A",
      title: "lofi hip hop radio — beats to relax/study to",
      channelTitle: "Lofi Girl",
      thumbnailUrl: "https://img.youtube.com/vi/5qap5aO4i9A/hqdefault.jpg"
    },
    {
      id: 2,
      videoId: "JGwWNGJdvx8",
      title: "Ed Sheeran - Shape of You (Official Music Video)",
      channelTitle: "Ed Sheeran",
      thumbnailUrl: "https://img.youtube.com/vi/JGwWNGJdvx8/hqdefault.jpg"
    },
    {
      id: 3,
      videoId: "rtL5oMyBHPs",
      title: "The Lion King - Circle of Life | Opening Scene",
      channelTitle: "DisneyMusicVEVO",
      thumbnailUrl: "https://img.youtube.com/vi/rtL5oMyBHPs/hqdefault.jpg"
    },
    {
      id: 4,
      videoId: "pxYrG7p52Fw",
      title: "경제 뉴스 요약 — 오늘 꼭 알아야 할 3가지",
      channelTitle: "경제 한입",
      thumbnailUrl: "https://img.youtube.com/vi/pxYrG7p52Fw/hqdefault.jpg"
    },
    {
      id: 5,
      videoId: "E7wJTI-1dvQ",
      title: "Learn JavaScript in 12 Minutes",
      channelTitle: "Jake Wright",
      thumbnailUrl: "https://img.youtube.com/vi/E7wJTI-1dvQ/hqdefault.jpg"
    }
  ]


    return (
      <>
        <MainLayout>

          {/* Top */}
          <Box sx={{display:'flex', flexDirection:'column', gap:'20px',}}>
            <Banner/>
            <Notice
              noticeList={noticeList}
              noticeCurrent={noticeCurrent}
              fade={fade}
              showNext={showNext}
            />
            <Box sx={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:5}}>
              {fxList.map((item, i) => (<ExchangeRate key={i} data={item}/>))}
            </Box>
          </Box>

          {/* 간격 띄우는 용도 */}
          <Box sx={{height:'30px'}}/>

          {/* Buttom */}
          <Box sx={{display:'flex', flexDirection:'column', gap:'30px', borderBottom:"1px solid #ddd"}}>
            <KeywordNews/>
            <GoodVideo videoList={fakeVideos}/>
            <StockFirm/>
          </Box>
          
        </MainLayout>
      </>
    )
}