/**
 * 뉴스 카드 컴포넌트
 */

import { Box, Card, CardMedia, IconButton, Typography, Chip } from "@mui/material";
import { useNewsCard } from "../hooks/useNewsCard";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import thema from "../../../base/design/thema.js"
import { Iron } from "@mui/icons-material";
import theme from "../../../base/design/thema.js";
import defaultNews from "@/assets/default_news.jpg";

export default function NewsCard({
  title,
  description,
  thumbnail,
  publisher,
  publishedAt,
  link,
  onClick,
  ai
}) {
  const { detailDate } = useNewsCard();
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        gap: 2,
        padding: 2,
        borderRadius: 2,
        //border: "1px solid #eee",
        mb: 2,
        cursor: "pointer",
        "&:hover": { backgroundColor: "#fafafa" },
      }}
      onClick={onClick}
    >
      {/* 썸네일 */}
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, borderRadius: 1, objectFit: "cover" }}
        image={thumbnail}
        onError={(e) => {
          if (e.target.src === defaultNews) return;
          e.target.src = defaultNews;
        }}
      />

      {/* 텍스트 */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: 600 }}>
          {title}
        </Typography>
        {ai?.insight && (
          <Chip 
            label="AI해설"
            size="small"
            sx={{height:20, fontSize:11, fontWeight:500, backgroundColor:theme.palette.light, color:"white"}}
          />
        )}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>

        <Box sx={{ mt: 1, fontSize: "13px", color: "gray" }}>
          {publisher} · {detailDate(new Date(publishedAt))}
        </Box>
      </Box>
    </Card>
  );
}
