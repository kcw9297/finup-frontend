import { 
  Box, Typography, Paper, Button, Chip,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import StudyWords from '../../studyword/components/StudyWords';
import FormModal from '../../../base/components/modal/FormModal';
import { useStudyDetail } from '../hooks/useStudyDetail';
import { useEditModal } from '../hooks/useEditModal';


  // 임시 단어 데이터
  const words = [
    { id: 1, name: '주식회사', meaning: '주식의 방법으로 ...' },
    { id: 2, name: '배당금', meaning: '회사가 이익을 ...' },
    { id: 3, name: '시가총액', meaning: '회사의 전체 가치 회사의 전체 가치 회사의 전체 가치 회사의 전체 가치...' },
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



/**
 * 단계학습 상세 페이지
 * @author kcw
 * @since 2025-12-09
 */

export default function StudyDetail({admin}) {
  
  // 사용 상태
  const { openEditModal, editProps } = useEditModal({admin})
  const { detailRp, loading } = useStudyDetail({admin})
  const navigate = useNavigate();
  
  // 사용 데이터
  const data = detailRp?.data ?? {}
  const { name, summary, description, level } = data

  // 렌더링
  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 4 }}>
  
      {/* 제목 섹션 (말머리 + 레벨 칩 + 수정 버튼) */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 3, 
        pb: 2, 
      }}>
        {/* 왼쪽: 말머리 + 제목 + 레벨 칩 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Chip 
              label={`레벨 ${level}`} 
              sx={{ 
                bgcolor: 'base.main', 
                color: 'white',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 500,
                height: 40,
                width: 70,
              }} 
          />
          <Typography>
            <Box sx={{ height: 40, display: 'flex', alignItems: 'center' }}>
              {loading ? (
                <CircularProgress size={22} />
              ) : (
                <Typography 
                  variant="h5" 
                  sx={{ fontSize: '25px', fontWeight: 700, color: 'text.main', position: 'relative', ml: 0.5}}>{name}
                </Typography>
              )}
            </Box>
          </Typography>
        </Box>

        {/* 오른쪽: 수정 버튼 */}
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => openEditModal(data)}
          sx={{
            bgcolor: 'base.main',
            '&:hover': { bgcolor: 'base.dark' }
          }}
        >
          수정
        </Button>
      </Box>

      {/* 요약 */}
      <Box sx={{ mb: 3, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          요약
        </Typography>
        <Box sx={{ height: 25, display: 'flex', alignItems: 'center' }}>
          {loading ? (
            <CircularProgress size={22} />
          ) : (
            <Typography variant="body1">{summary}</Typography>
          )}
        </Box>
      </Box>

      {/* 설명 */}
      <Box sx={{ mb: 8, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          설명
        </Typography>
        <Box sx={{ minHeight: 25, display: 'flex', alignItems: 'center' }}>
          {loading ? (
            <CircularProgress size={22} />
          ) : (
            <Typography variant="body1" sx={{whiteSpace: 'pre-wrap'}}>{description}</Typography>
          )}
        </Box>
      </Box>

      {/* 학습 용어 */}
      <Box sx={{ mb: 4 }}>
        <StudyWords words={words} admin={admin} />
      </Box>

      {/* 하단 버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <Button 
          variant="outlined"
          size="large"
          onClick={() => navigate('/admin/studies')}
          sx={{ minWidth: 150 }}
        >
          목록으로
        </Button>
      </Box>

      {/* 모달 */}
      <FormModal modalProps={editProps} />
    </Box>
  );
}