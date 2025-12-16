import { Paper } from "@mui/material";

export default function BookmarkCard({ item, onRemove }) {

  return (
    <Paper
      sx={{
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'line.dark',
      }}
    >
      {/* 좌측 번호 or 아이콘 */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 1.5,
          bgcolor: 'base.light',
          color: 'base.main',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        북마크
      </Box>

      {/* 본문 */}
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
          {item.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: 520,
          }}
        >
          {item.summary}
        </Typography>
      </Box>

      {/* 액션 */}
      <IconButton
        onClick={() => onRemove(item)}
        sx={{
          color: 'text.secondary',
          '&:hover': {
            color: 'error.main',
          },
        }}
      >
        <BookmarkRemoveIcon />
      </IconButton>
    </Paper>
  );
}