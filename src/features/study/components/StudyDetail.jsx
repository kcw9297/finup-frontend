import {
  Box, Typography, Paper, Button, Chip,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import FormModal from '../../../base/components/modal/FormModal';
import { useStudyDetail } from '../hooks/useStudyDetail';
import { useStudyEditModal } from '../hooks/useStudyEditModal';
import StudyWords from '../../studyword/components/StudyWords';
import BookmarkToggleIcon from '../../../base/components/icon/BookmarkToggleIcon';
import StudyProgressCompleteIcon from '../../../base/components/icon/StudyProgressCompleteIcon';
import StudyProgressInitialzeIcon from '../../../base/components/icon/StudyProgressInitialzeIcon';
import StudyVideos from './../../videolink/components/StudyVideos';
import { useReloadStore } from '../../../base/stores/useReloadStore';


/**
 * 단계학습 상세 페이지
 * @author kcw
 * @since 2025-12-09
 */

export default function StudyDetail({ admin = false }) {

  const { reload } = useReloadStore()
  // 사용 상태
  const { openEditModal, editProps } = useStudyEditModal({
    admin: true,
    handleAfterEdit: () => {
      reload()
    }
  })
  const { detailRp, loading } = useStudyDetail({ admin })
  const { studyId } = useParams()
  const navigate = useNavigate()

  // 사용 데이터
  const data = detailRp?.data ?? {}
  const { name, summary, detail, level } = data

  // 렌더링
  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', p: 4 }}>

      {/* 제목 */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 3,
        pb: 2,
      }}>
        {/* 말머리 + 제목 + 레벨 칩 */}
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
          <Box sx={{ height: 40, display: 'flex', alignItems: 'center' }}>
            {loading ? (
              <CircularProgress size={22} />
            ) : (
              <Typography
                variant="h5"
                sx={{ fontSize: '25px', fontWeight: 700, color: 'text.main', position: 'relative', ml: 0.5 }}>{name}
              </Typography>
            )}
          </Box>
        </Box>

        {/* 수정 버튼 (관리자) / 북마크 & 학습 완료 및 초기화 버튼 (일반 사용자) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

          {admin && (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => openEditModal(data)}
              sx={{
                bgcolor: 'base.main',
                '&:hover': { bgcolor: 'base.dark' }
              }}>수정</Button>
          )}

          {!admin && (
            <BookmarkToggleIcon target={{ targetId: studyId, bookmarkTarget: 'STUDY' }} />
          )}

          {!admin && (
            <StudyProgressCompleteIcon studyId={studyId} />
          )}

          {!admin && (
            <StudyProgressInitialzeIcon studyId={studyId} />
          )}

        </Box>

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
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{detail}</Typography>
          )}
        </Box>
      </Box>

      {/* 추천 개념 용어 */}
      <Box sx={{ mb: 4 }}>
        <StudyWords admin={admin} />
      </Box>

      {/* 추천 개념 영상 */}
      <Box sx={{ mb: 4 }}>
        <StudyVideos admin={admin} />
      </Box>

      {/* 하단 버튼 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          //gap: 2,          // 버튼 간 간격
          mt: 10
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate(-1)}
          sx={{
            minWidth: 150,
            bgcolor: 'base.main',
            '&:hover': {
              bgcolor: 'base.dark'
            }
          }}
        >
          목록으로
        </Button>
      </Box>

      {/* 모달 */}
      <FormModal modalProps={editProps} />
    </Box>
  );
}