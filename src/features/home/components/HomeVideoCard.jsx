import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

/**
 * 유튜브 영상 카드 컴포넌트
 * @since 2025-12-18
 * @author khj
 */
export default function HomeVideoCard({ video }) {

  const handleOpen = () => {
    window.open(
      `https://www.youtube.com/watch?v=${video.videoId}`,
      '_blank'
    );
  };

  const formatCount = (num) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num;
  };


  return (
    <Card
      sx={{
        cursor: 'pointer',
        border: 1,
        borderColor: 'line.main',
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: 'background.light',
        },
      }}
      onClick={handleOpen}
    >
      <CardMedia
        component="img"
        height="180"
        image={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
        alt={video.title}
      />

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          pb: 1.4,
          '& .MuiTypography-root': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        }}
      >

        {/* 제목 */}
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
          {video.title}
        </Typography>

        {/* 조회수 / 좋아요 */}
        <Box
          sx={{
            display: 'flex',
            gap: 1.2,
            fontSize: 13,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* 채널명 */}
          <Typography sx={{ color: 'text.light', fontSize: 14 }}>
            {video.channelTitle}
          </Typography>


          {/* 조회수 / 좋아요 (오른쪽) */}
          <Box
            sx={{
              display: 'flex',
              gap: 1.2,
              color: 'text.disabled', // 연한 회색
              opacity: 0.4,          // 지금 검정처럼 보이면 이게 핵심
              flexShrink: 0,
            }}
          >

            <Typography component="span">
              👁 {formatCount(video.viewCount)}
            </Typography>
            {video.likeCount > 0 && (
              <Typography component="span">
                ♥ {formatCount(video.likeCount)}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
