import { 
  Box, Typography, Paper, Button, IconButton, 
  Card, CardMedia, CardContent, Chip
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useState } from "react";
import WordCard from '../../../base/components/card/WordCard';


/**
 * 단계 학습 단어 카드 묶음 컴포넌트
 * @author kcw
 * @since 2025-12-09
 */

export default function StudyWords({ words = [], admin = false }) {

  // 페이지 상태
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(words.length / 4));

  // 렌더링
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>

        {/* 말머리 */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            color: 'text.main',
            position: 'relative',
            pl: 2,
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 4,
              height: '100%',
              bgcolor: 'base.main',
              borderRadius: 1
            }
          }}
        >
          용어
        </Typography>

        {/* 페이지 네비게이션 버튼 */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            size="small"
          >
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 1))}
            disabled={currentPage === pageCount - 1}
            size="small"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* 단어 그리드 (4개씩) */}
      {/* 관리자가 아니고, 단어가 없으면 빈 메세지 */}
      {!admin && words.length === 0 ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: 350 }}>
          <Typography variant="body2" color="text.secondary">
            등록된 단어가 없습니다.
          </Typography>
        </Box>
      ) : (

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>

          {/* 단어 카드들 */}
          {words.slice(currentPage * 4, currentPage * 4 + 4).map((word) => (
            <WordCard key={word.id} word={word} admin={admin} />
          ))}

          {/* 추가 버튼 (관리자 & 한 페이지가 4개 미만일 때만) */}
          {admin && words.slice(currentPage * 4, currentPage * 4 + 4).length < 4 && (
            <Paper 
              elevation={0}
              sx={{ 
                height: 350,
                maxHeight: 350,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed',
                borderColor: 'grey.300',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'base.main',
                  bgcolor: 'grey.50'
                }
              }}
              onClick={() => console.log('Add word')}
            >
              <AddIcon sx={{ fontSize: 48, color: 'grey.400' }} />
            </Paper>
          )}

        </Box>
      )}
    </>
  )
}