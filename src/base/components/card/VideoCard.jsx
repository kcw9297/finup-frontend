import { Card, CardMedia, CardContent, Typography, Box, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';


export default function VideoCard({ item, options }) {

  // 카드에 담을 정보
  const { thumbnailUrl, title, viewCount, likeCount, videoUrl } = item;

  // 카드 수정/삭제/재정렬 함수
  const { onDelete, onEdit, onReorder } = options

  return (
    <Card
      sx={{
        width: 280,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 2,
        transition: "0.2s",
        "&:hover": { transform: "scale(1.02)", boxShadow: 4 }
      }}
      onClick={() => window.open(videoUrl, "_blank")}
    >
      {/* 썸네일 + 오버레이 버튼 레이어 */}
      <Box sx={{ position: "relative" }}>

        {/* 썸네일 */}
        <CardMedia
          component="img"
          height="160"
          image={thumbnailUrl}
          alt={title}
          sx={{ objectFit: "cover" }}
        />

        {/* 수정 / 삭제 오버레이 버튼 */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
            opacity: 0.5,
            transition: "0.2s",
            "&:hover": { opacity: 1 },       // 마우스 올리면만 보임
          }}
        >
          <IconButton
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.85)",
              "&:hover": { bgcolor: "white" }
            }}
            onClick={(e) => {
              e.stopPropagation();  // 카드 클릭 이벤트 방지
              alert("수정버튼")
            }}
          >
            <DragIndicatorIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.85)",
              "&:hover": { bgcolor: "white" }
            }}
            onClick={(e) => {
              e.stopPropagation();  // 카드 클릭 이벤트 방지
              alert("수정버튼")
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.85)",
              "&:hover": { bgcolor: "white" }
            }}
            onClick={(e) => {
              e.stopPropagation();  // 카드 클릭 이벤트 방지
              alert("삭제버튼")
            }}
          >
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Box>
      </Box>

      {/* 제목 */}
      <CardContent sx={{ minHeight: 90 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>
      </CardContent>

      {/* 좋아요·조회수 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          pb: 2,
          color: "text.secondary",
          fontSize: "14px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <ThumbUpIcon sx={{ fontSize: 18 }} />
          {likeCount?.toLocaleString() ?? 0}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <VisibilityIcon sx={{ fontSize: 18 }} />
          {viewCount?.toLocaleString() ?? 0}
        </Box>
      </Box>
    </Card>
  )
}