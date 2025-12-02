// src/features/concept/components/ConceptList.jsx
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
    <Stack spacing={2}>
      {list.map((item, index) => {
        const statusMeta = getStatusMeta(item.status);

        return (
          <Card key={item.id} variant="outlined">
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>

              <Box
                sx={{
                  minWidth: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  border: 1,
                  flexShrink: 0,
                }}
              >
                <Typography variant="subtitle1" fontWeight={700}>
                  {item.orderNumber ?? index + 1}
                </Typography>
              </Box>

              {/* 가운데 텍스트 영역 */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {item.name}
                </Typography>

                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {item.description}
                </Typography>
              </Box>

              {/* 오른쪽 상태 값 표시 (학습 완료 / 학습 중 / 학습 전) */}
              <Chip
                icon={statusMeta.icon}
                label={statusMeta.label}
                variant="outlined"
                sx={{ flexShrink: 0 }}
              />
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
}
