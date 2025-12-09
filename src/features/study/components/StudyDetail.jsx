import { 
  Box, Typography, Paper, Button, IconButton, 
  Card, CardMedia, CardContent, Chip
} from '@mui/material';
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useNavigate } from 'react-router-dom';

/**
 * 단계학습 상세 페이지
 * @author kcw
 * @since 2025-12-09
 */

export default function StudyDetail({admin}) {
  
  const navigate = useNavigate();
  
  // 임시 데이터
  const study = {
    name: '주식 핵심 개념',
    summary: '주식의 기본으로 살펴보 ...',
    description: '주식의 기본으로 살펴보는 주식의 중요 개념들',
    level: 1
  };

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // 임시 단어 데이터
  const words = [
    { id: 1, name: '주식회사', meaning: '주식의 방법으로 ...' },
    { id: 2, name: '배당금', meaning: '회사가 이익을 ...' },
    { id: 3, name: '시가총액', meaning: '회사의 전체 가치 ...' },
    { id: 4, name: '시가총액', meaning: '회사의 전체 가치 ...' },
    { id: 5, name: '시가총액', meaning: '회사의 전체 가치 ...' },
    { id: 6, name: '시가총액', meaning: '회사의 전체 가치 ...' },
    { id: 7, name: '시가총액', meaning: '회사의 전체 가치 ...' },
  ];

  // 임시 영상 데이터
  const videos = [
    { 
      id: 1, 
      title: 'Aiobahn +81 feat. ななひら & P丸様。- 天天天国地獄国',
      thumbnail: 'https://i.ytimg.com/vi/example1/hqdefault.jpg',
      likes: '340,921',
      views: '19,435,901'
    },
    { 
      id: 2, 
      title: '[블루 아카이브] Gregorius | Symphony | OST',
      thumbnail: 'https://i.ytimg.com/vi/example2/hqdefault.jpg',
      likes: '3,800',
      views: '239,281'
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 4 }}>
  
  {/* ✅ 제목 섹션 (말머리 + 레벨 칩 + 수정 버튼) */}
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    mb: 3, 
    pb: 2, 
    borderBottom: '1px solid', 
    borderColor: 'divider' 
  }}>
    {/* 왼쪽: 말머리 + 제목 + 레벨 칩 */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Chip 
          label={`레벨 ${study.level}`} 
          sx={{ 
            bgcolor: 'base.main', 
            color: 'white',
            borderRadius: '8px',
            fontWeight: 600,
            height: 32
          }} 
      />
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 700, 
          color: 'base.main',
          position: 'relative',
          
        }}
      >
        {study.name}
      </Typography>
    </Box>

    {/* 오른쪽: 수정 버튼 */}
    <Button
      variant="contained"
      startIcon={<EditIcon />}
      onClick={() => alert("수정버튼")}
      sx={{
        bgcolor: 'base.main',
        '&:hover': { bgcolor: 'base.dark' }
      }}
    >
      수정
    </Button>
  </Box>

  {/* 요약 */}
  <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
      요약
    </Typography>
    <Typography variant="body1">
      {study.summary}
    </Typography>
  </Box>

  {/* 설명 */}
  <Box sx={{ mb: 4, pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
      설명
    </Typography>
    <Typography variant="body1">
      {study.description}
    </Typography>
  </Box>

  {/* 단어장 섹션 */}
  <Box sx={{ mb: 4 }}>
    {/* 말머리와 페이지 버튼 */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 700, 
          color: 'base.main',
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
        단어장
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
          onClick={() => setCurrentPage(Math.min(Math.ceil(words.length / 4) - 1, currentPage + 1))}
          disabled={currentPage === Math.ceil(words.length / 4) - 1}
          size="small"
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>

    {/* 단어 그리드 (4개씩) */}
    {words.length > 0 ? (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
        {words.slice(currentPage * 4, currentPage * 4 + 4).map((word) => (
          <Paper 
            key={word.id}
            elevation={0}
            sx={{ 
              p: 2.5, 
              height: 220,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1.5 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'base.main', 
                  fontWeight: 600, 
                  fontSize: '1.1rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '60%'
                }}
              >
                {word.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton size="small" sx={{ p: 0.5 }}>
                  <DragIndicatorIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ p: 0.5 }}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ p: 0.5 }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 6,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {word.meaning}
            </Typography>
          </Paper>
        ))}

        {/* 추가 버튼 */}
        {words.slice(currentPage * 4, currentPage * 4 + 4).length < 4 && (
          <Paper 
            elevation={0}
            sx={{ 
              height: 220,
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
    ) : (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 180 }}>
        <Typography variant="body2" color="text.secondary">
          등록된 단어가 없습니다.
        </Typography>
      </Box>
    )}
  </Box>

  {/* 하단 버튼 */}
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
    <Button 
      variant="outlined"
      size="large"
      onClick={() => navigate('/admin/studies')}
      sx={{ minWidth: 150 }}
    >
      목록으로
    </Button>
  </Box>
</Box>
  );
}