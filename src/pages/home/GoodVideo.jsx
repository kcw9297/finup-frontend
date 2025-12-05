import { Box, Card, CardMedia, CardContent, Typography, Grid, Paper } from "@mui/material";

// 유튜브 추천 영상

export default function GoodVideo ({ videoList }) {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>

      <Box sx={{"& .MuiTypography-root": { fontSize: 22, fontWeight: 600 }}}>
        {/* 제목 */}
        <Paper sx={{ display: 'flex', gap: '10px' }}>
          <Typography sx={{ color: 'base.main', backgroundColor: 'base.main' }}>&nbsp;</Typography>
          <Typography>핵심 키워드</Typography>
        </Paper>
      </Box>

      <Box sx={{display: 'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'20px'}}>
        {videoList.map((video) => (
          <Card
            key={video.id}
            sx={{ cursor: "pointer", border:1, borderColor:'line.main' }}
            onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, "_blank")}
          >
            <CardMedia
              component="img"
              height="180"
              image={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
            />
            <CardContent
              sx={{display: 'flex', flexDirection:'column', gap: 1,
                "& .MuiTypography-root": { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
              }}>
              <Typography sx={{fontSize:18, fontWeight:600}}>
                {video.title}
              </Typography>
              <Typography sx={{color:'text.light'}}>
                {video.channelTitle}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}