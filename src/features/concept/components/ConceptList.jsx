import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

function getStatusMeta(status) {
  switch (status) {
    case "COMPLETED":
      return {
        label: "학습 완료",
        icon: <CheckCircleOutlineIcon fontSize="small" />,
      };
    case "IN_PROGRESS":
      return {
        label: "학습 중",
        icon: <InfoOutlinedIcon fontSize="small" />,
      };
    default:
      return {
        label: "학습 전",
        icon: <CloseIcon fontSize="small" />,
      };
  }
}

export default function ConceptList({ list }) {
  return (
    <Box>
      {/* 상단 타이틀 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          개념 정리
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          지금부터 시작! 기초부터 탄탄히
        </Typography>
      </Box>

      {/* 리스트 */}
      <Stack spacing={2}>
        {list.map((item, index) => {
          const statusMeta = getStatusMeta(item.status);

          return (
            <Card
              key={item.id}
              elevation={0}        // 그림자 없음
              sx={{
                border: "none",     // 테두리 없음
                borderRadius: 1,    // 살짝 각
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  py: 2,
                }}
              >
                {/* 번호 박스 */}
                <Box
                  sx={{
                    minWidth: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,  // 각
                    border: "1px solid", // 기본 1px 테두리 (색상 전역 테마로 변경 예정)
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={700}>
                    {item.orderNumber ?? index + 1}
                  </Typography>
                </Box>

                {/* 텍스트 영역 */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {item.description}
                  </Typography>
                </Box>

                {/* 상태 칩 */}
                <Chip
                  icon={statusMeta.icon}
                  label={statusMeta.label}
                  variant="outlined"
                  sx={{
                    borderRadius: 1, // 둥글지 않게
                    height: 32,
                    px: 1.5,
                  }}
                />
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
