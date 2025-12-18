import { Box, Typography, TextField, Tooltip, IconButton, Stack, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useWordbook } from "../../wordbook/hooks/useWordbook";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            {/* 왼쪽: 단어 정보 */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontWeight={600} noWrap>
                {word.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {word.description}
              </Typography>
            </Box>

            {/* 오른쪽: 액션 */}
            <Box sx={{ flexShrink: 0 }}>
              <Tooltip title="삭제">
                <IconButton
                  size="medium"
                  onClick={() => removeWord(word.termId)}
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      color: "error.main",
                      backgroundColor: "rgba(211, 47, 47, 0.08)",
                    },
                  }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
