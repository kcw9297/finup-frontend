import { Box, IconButton, Paper, Typography } from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from "react-router-dom";
import StudyStatusBox from "../../study/components/StudyStatusBox";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useEffect, useState } from "react";

export default function BookmarkCard({
  row = {},
  onRemove,
  onAdd,
  isBookmarked = false,
}) {

  const [localBookmarked, setLocalBookmarked] = useState(isBookmarked)
  const navigate = useNavigate()

  const handleBookmarkToggle = (e) => {
    e.stopPropagation();

    const target = {
      targetId: row.studyId,
      bookmarkTarget: "STUDY",
    };

    if (localBookmarked) {
      // 👉 즉시 UI만 해제
      setLocalBookmarked(false);
      onRemove(target); // 서버 요청
    } else {
      setLocalBookmarked(true);
      onAdd(target);
    }
  }


  useEffect(() => {
    setLocalBookmarked(isBookmarked);
  }, [isBookmarked])




  return (
    <Box
      sx={{
        minHeight: 96,
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
        {row.level}
      </Box>

      {/* 제목 + 요약 */}
      <Box
        sx={{ flex: 1, cursor: 'pointer' }}
        onClick={() => navigate(`/studies/${row.studyId}`)}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {row.name}
        </Typography>
        <Typography variant="body2" color="text.secondary"
          sx={{
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
          {row.summary}
        </Typography>
      </Box>

      {/* 우측 액션 (StudyStatusBox 자리) */}
      {/* 우측 학습 진도 */}
      {
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
          <StudyStatusBox studyId={row.studyId} />
          <IconButton
            onClick={handleBookmarkToggle}
            sx={{
              color: localBookmarked ? 'base.main' : 'grey.400'
            }}
          >
            {localBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>
      }
    </Box>
  )
}