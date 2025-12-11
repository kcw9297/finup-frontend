/**
 * 뉴스 카드 컴포넌트
 */

import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import { useNewsCard } from "../hooks/useNewsCard";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import thema from "../../../base/design/thema.js"
import { Iron } from "@mui/icons-material";

export default function NewsCard({ title, summary, thumbnail, publisher, publishedAt, link, onClick }) {
  const {detailDate} = useNewsCard()
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
        "&:hover": { backgroundColor: "#fafafa" }
      }}
      onClick={onClick}
    >
      {/* 썸네일 */}
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, borderRadius: 1, objectFit: "cover" }}
        image={
          thumbnail
       }
        onError={(e) => {
          if(e.target.src.includes("/default-news.png")) return
          e.target.src = "/default-news.png"
          }}
      />

      {/* 텍스트 */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: 600 }}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {summary}
        </Typography>

        <Box sx={{ mt: 1, fontSize: "13px", color: "gray" }}>
          {publisher} · {detailDate(new Date(publishedAt))} 
          <IconButton>
            <BookmarkBorderIcon sx={{fontSize:20, color: "#bbb", transition:"color 0.3s ease", "&:hover":{color: thema.palette.base.dark}}}/>
          </IconButton>
          
        </Box>
      </Box>
    </Card>
  );
}