import { Card, CardContent, Typography, Box, LinearProgress, Button } from "@mui/material"

export default function ProgressCard() {

  const progress = 50
  const score = 70

  return (
    <Card variant="outlined" sx={{ width: 300 }}>
      <CardContent>

        {/* 진척도 */}
        <Typography variant="subtitle2" fontWeight={600}>
          진척도
        </Typography>

        <Box sx={{ mt: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption" sx={{ float: 'right', mt: 0.5 }}>
            {progress}%
          </Typography>
        </Box>

        {/* 점수 */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h5" fontWeight={700}>
            {score}점
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            종목 분석 공부를 추천해요!
          </Typography>

          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            테스트 보기
          </Button>
        </Box>

      </CardContent>
    </Card>
  )
}
