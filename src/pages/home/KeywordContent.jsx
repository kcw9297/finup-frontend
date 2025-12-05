import { Box, Typography, Avatar } from "@mui/material";

export default function KeywordContent({ list }) {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'line.light',
        "&::-webkit-scrollbar": { width: 6 },
        "&::-webkit-scrollbar-thumb": {
          background: "#dee2e6",
          borderRadius: "8px",
        },
      }}
    >
      {list.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            py: 1.5,
            borderBottom: "1px solid #f1f3f5",
            cursor: "pointer",
            "&:hover": { backgroundColor: "#fafafa" },
          }}
        >
          <Avatar src={item.logo} sx={{ width: 36, height: 36 }} />

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 500,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {item.title}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#666" }}>
              {item.date}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}