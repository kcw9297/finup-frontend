import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import moment from "moment";
import ImageIcon from '@mui/icons-material/Image';

// 뉴스 리스트
export default function KeywordContent({ list, loading, onItemClick }) {
  const isEmpty = !Array.isArray(list) || list.length === 0;

  return (
    <Box
      sx={{
        height: 400,
        border: 1,
        borderColor: "line.light",
        borderRadius: 2,
        overflow: "auto",
      }}
    >
      {/* 로딩 중 */}
      {loading && (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* 로딩 끝 + 데이터 없음 */}
      {!loading && isEmpty && (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="text.secondary">
            조회된 기사가 없습니다.
          </Typography>
        </Box>
      )}

      {/* 정상 데이터 */}
      {!loading &&
        !isEmpty &&
        list.map((item, idx) => (
          <Box
            key={idx}
            onClick={() => onItemClick(item)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderBottom: 1,
              borderColor: "line.light",
              cursor: "pointer",
              "&:hover": { backgroundColor: "background.light" },
            }}
          >
            {/* 썸네일 */}
            <Avatar 
              src={item?.thumbnail} 
              sx={{ width: 40, height: 40 }}
            >
              {!item.thumbnail && <ImageIcon />}
            </Avatar>

            {/* 제목 */}
            <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
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
                {item.publisher} ·{" "}
                {moment(item.publishedAt).format("YYYY.MM.DD")}
              </Typography>
            </Box>
          </Box>
        ))}
    </Box>
  );
}
