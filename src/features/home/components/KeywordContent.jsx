import { Box, Typography, Avatar } from "@mui/material";
import moment from "moment";

// 뉴스 리스트

export default function KeywordContent({ list, onItemClick }) {
  return (
    <Box sx={{ height: 400, overflow: "auto" }}>
      {list.map((item, idx) => (
        <Box
          key={idx}
          onClick={() => onItemClick(item)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: 2,
            borderBottom: 1,
            borderColor: "line.light",
            cursor: "pointer",
            "&:hover": { backgroundColor: "background.light" },
          }}
        >
          {/* 썸네일 */}
          <Avatar src={item.thumbnail} sx={{ width: 40, height: 40 }} />

          {/* 제목 */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontWeight: 500,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {item.title}
            </Typography>
            
            {/* 뉴스사, 날짜 */}
            <Typography sx={{ fontSize: 14, color: "text.light" }}>
              {item.publisher} · {moment(item.publishedAt).format("YYYY.MM.DD")}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}