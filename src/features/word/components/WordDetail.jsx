import { Box, Typography, Divider, Button, Tooltip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useWordDetail } from '../hooks/useWordDetail';
import { useMemberWordbook } from './../../wordbook/hooks/useMemberWordbook';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function WordDetail() {
  const navigate = useNavigate();



  const { detail, loading } = useWordDetail()

  const termId = detail?.termId

  const { added, add, remove } = useMemberWordbook(termId)


  if (loading) {
    return <Box sx={{ p: 4 }}>로딩 중...</Box>;
  }

  if (!detail) {
    return <Box sx={{ p: 4 }}>데이터가 없습니다.</Box>;
  }

  const data = {
    title: detail.name,
    category: '금융',
    content: detail.description,
    aiSummary: '' // 추후 AI 연동
  }


  return (
    <Box sx={{ width: '100%', minHeight: '100%', py: 4, p: 2 }}>
      {/* 메인 컨테이너 */}
      <Box
        sx={{
          maxWidth: 940,
          mx: 'auto',
          mb: 6,
        }}
      >
        {/* ========== 상단 영역 ========== */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, flex: 1 }}
          >
            {data.title}
          </Typography>
        </Box>


        <Divider sx={{ mb: 4 }} />

        {/* ========== 본문 내용 ========== */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-line',
              lineHeight: 1.8,
              textAlign: 'left',   // ★ 본문도 왼쪽 정렬
            }}
          >
            {data.content}
          </Typography>
        </Box>
        {/* 
          ========== AI 요약 ========== 
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
              textAlign: 'left'     // ★ 왼쪽 정렬
            }}
          >
            AI요약
          </Typography>
          */}
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            textAlign: 'left'     // ★ 왼쪽 정렬
          }}
        >
          {data.aiSummary}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 7,
          mb: 3,
          p: 3,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 1 }}
        >
          이 단어를 단어장에 저장해두세요
        </Typography>

        <Button
          variant="contained"
          startIcon={added ? <CheckCircleIcon /> : <AddCircleOutlineIcon />}
          onClick={added ? remove : add}
          sx={{ borderRadius: '999px', px: 3 }}
        >
          {added ? '저장됨' : '단어장에 저장'}
        </Button>
      </Box>

      {/* ========== 목록 버튼 ========== */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant="outlined"
          sx={{
            minWidth: 120,
            px: 4,
            borderRadius: '10px',
          }}
          onClick={() => navigate(-1)}
        >
          목록
        </Button>
      </Box>
    </Box>
  );
}
