import { Box, Typography, TextField, IconButton, Stack, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useWordbook } from "../../wordbook/hooks/useWordbook";

export default function WordBookContent() {

  const { list, loading, removeWord } = useWordbook(open);

  return (
    <Box sx={{ width: "100%" }}>

      {/* 타이틀 */}
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        내 단어장
      </Typography>

      {/* 로딩 */}
      {loading && (
        <Typography variant="body2" color="text.secondary">
          불러오는 중...
        </Typography>
      )}

      {/* 빈 상태 */}
      {!loading && list.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          아직 담은 단어가 없습니다.
        </Typography>
      )}

      {/* 단어 리스트 */}
      <Stack spacing={2}>
        {list.map((word) => (
          <Paper
            key={word.termId}
            sx={{
              p: 2,
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography fontWeight={600}>{word.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {word.description}
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "#888",
                cursor: "pointer",
                "&:hover": { color: "#555" },
              }}
              onClick={() => removeWord(word.termId)}
            >
              삭제
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
