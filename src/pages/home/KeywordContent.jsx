import { Box, Typography, Avatar } from "@mui/material";

// 뉴스 원문

export default function KeywordContent({ list }) {
  return (
    <Box sx={{ height: 400, overflow: "auto" }}>
      {list.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            display: 'flex',
            alignItems: "center",
            gap: 2,
            padding: 2,
            borderBottom: 1,
            borderColor: 'line.light',
            cursor: 'pointer',
            "&:hover": { backgroundColor: 'background.light' },
          }}
        >
          <Avatar src={item.logo} sx={{ width: 40, height: 40 }} />

          <Box sx={{ display: 'flex', flexDirection:'column' }}>
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
            <Typography sx={{ fontSize: 14, color: "text.light" }}>
              {item.date}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}