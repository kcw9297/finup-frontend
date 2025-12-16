import { Box, IconButton, Paper, Typography } from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useStudyProgress } from "../../../base/hooks/useStudyProgress";
import { useNavigate } from "react-router-dom";



export default function BookmarkCard({ item, onRemove }) {

  const navigate = useNavigate()

  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        border: '1px solid',
        borderColor: 'line.dark',
        borderRadius: 3,
        backgroundColor: 'background.base',
      }}
    >
      {/* 좌측 아이콘 (StudyListBox의 level 자리) */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '12px',
          backgroundColor: 'base.light',
          color: 'base.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          flexShrink: 0,
        }}
      >
        ★
      </Box>

      {/* 제목 + 요약 */}
      <Box
        sx={{ flex: 1, cursor: 'pointer' }}
        onClick={() => navigate(`/studies/${item.studyId}`)}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.summary}
        </Typography>
      </Box>

      {/* 우측 액션 (StudyStatusBox 자리) */}
      <Box sx={{ flexShrink: 0 }}>
        <IconButton
          onClick={() =>
            onRemove({
              targetId: item.studyId,
              bookmarkTarget: 'STUDY',
            })
          }
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'error.main',
            },
          }}
        >
          <BookmarkIcon />
        </IconButton>
      </Box>
    </Box>
  )
}