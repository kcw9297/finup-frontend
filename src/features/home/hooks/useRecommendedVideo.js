// 추천 영상

export function useRecommendedVideo() {
  
  const videoList = [
    {
      id: 1,
      videoId: "5qap5aO4i9A",
      title: "lofi hip hop radio — beats to relax/study to",
      channelTitle: "Lofi Girl",
      thumbnailUrl: "https://img.youtube.com/vi/5qap5aO4i9A/hqdefault.jpg",
    },
    {
      id: 2,
      videoId: "JGwWNGJdvx8",
      title: "Ed Sheeran - Shape of You",
      channelTitle: "Ed Sheeran",
      thumbnailUrl: "https://img.youtube.com/vi/JGwWNGJdvx8/hqdefault.jpg",
    },
    {
      id: 3,
      videoId: "rtL5oMyBHPs",
      title: "The Lion King - Circle of Life",
      channelTitle: "DisneyMusicVEVO",
      thumbnailUrl: "https://img.youtube.com/vi/rtL5oMyBHPs/hqdefault.jpg",
    },
    {
      id: 4,
      videoId: "pxYrG7p52Fw",
      title: "경제 뉴스 요약 — 오늘 꼭 알아야 할 3가지",
      channelTitle: "경제 한입",
      thumbnailUrl: "https://img.youtube.com/vi/pxYrG7p52Fw/hqdefault.jpg",
    },
    {
      id: 5,
      videoId: "E7wJTI-1dvQ",
      title: "Learn JavaScript in 12 Minutes",
      channelTitle: "Jake Wright",
      thumbnailUrl: "https://img.youtube.com/vi/E7wJTI-1dvQ/hqdefault.jpg",
    },
  ];

  return { videoList };
}