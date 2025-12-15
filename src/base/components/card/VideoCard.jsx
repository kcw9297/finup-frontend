import { Paper, Box, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from '@mui/icons-material/Image';

/**
 * 영상 카드 공용 컴포넌트
 * @since 2025-12-11
 * @author kcw
 */
export default function VideoCard({ video, functions, cardWidth = 300, cardHeight = 400, admin = false }) {

  // 카드에 담을 정보
  const { 
    videoLinkId,
    videoUrl, 
    title, 
    duration,
    thumbnailUrl, 
    channelTitle,
    viewCount, 
    likeCount,
  } = video || {}

  const {
    onClickEdit,
    onClickRemove,
  } = functions || {}

  // 크기 설정
  const imageHeight = 200;

  // 이미지 클릭 시 새 탭에서 영상 열기
  const handleImageClick = () => {
    window.open(videoUrl, "_blank");
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        width: cardWidth,
        height: cardHeight,
        border: '2px solid',
        borderColor: 'base.main',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 이미지 영역 */}
      <Box
        onClick={handleImageClick}
        sx={{
          position: "relative",
          width: "100%",
          height: imageHeight,
          bgcolor: "grey.200",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          cursor: "pointer",
          "&:hover": {
            opacity: 0.8
          }
        }}
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <ImageIcon sx={{ fontSize: 100, color: "grey.400" }} />
        )}

        {/* Duration 오버레이 (우측 하단) */}
        {duration && (
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.8)",
              color: "white",
              px: 0.8,
              py: 0.3,
              borderRadius: 1,
              fontSize: "12px",
              fontWeight: 600
            }}
          >
            {duration}
          </Box>
        )}
      </Box>

      {/* 영상 정보 */}
      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* 채널명 */}
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 1,
            fontSize: '13px'
          }}
        >
          {channelTitle}
        </Typography>

                {/* 제목 */}
        <Typography 
          variant="subtitle1"
          sx={{ 
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 0.5,
            lineHeight: 1.3
          }}
        >
          {title}
        </Typography>

      </Box>

      {/* 하단 영역 (조회수/좋아요 + 관리자 버튼) */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        {/* 왼쪽: 조회수 / 좋아요 */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            color: "text.secondary",
            fontSize: "13px"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <VisibilityIcon sx={{ fontSize: 16 }} />
            {viewCount?.toLocaleString() ?? 0}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ThumbUpIcon sx={{ fontSize: 16 }} />
            {likeCount?.toLocaleString() ?? 0}
          </Box>
        </Box>

        {/* 오른쪽: 수정 / 삭제 */}
        {admin && (
          <Box>
            <IconButton onClick={onClickEdit} size="small" sx={{ p: 0.5 }}>
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton onClick={onClickRemove} size="small" sx={{ p: 0.5 }}>
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Paper> 
  );
}