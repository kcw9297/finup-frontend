
import {
  Box,
  Typography,
  List,
} from '@mui/material';
import StudyStatusBox from './StudyStatusBox';
import BookmarkToggleIcon from '../../../base/components/icon/BookmarkToggleIcon';
import { useNavigate } from 'react-router-dom';
import { useStudyProgress } from '../../../base/hooks/useStudyProgress';
import { useStudyProgressStartModal } from '../../studyprogress/hooks/useStudyProgressStartModal';
import ConfirmModal from '../../../base/components/modal/ConfirmModal';


/**
 * 학습 리스트 목록을 표현하는 Box 컴포넌트
 * @since 2025-12-13
 * @author kcw
 */

export default function StduyListBox({ admin = false, row = {} }) {

  // 학습진도 전역상태
  const { studyProgresses } = useStudyProgress()

  // 사용 모달
  const { openStartModal, startProps } = useStudyProgressStartModal({admin})

  // 현재 학습에 대한 진도 존재 여부
  const isExist = studyProgresses.find(progress => row.studyId === progress.studyId)

  // Redirect Hook
  const navigate = useNavigate()
  



  return (
    <>
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
          backgroundColor: 'background.base'
        }}
      >
        {/* 난이도 */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '12px',
            backgroundColor: 'base.main',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            flexShrink: 0
          }}
        >
          {row.level}
        </Box>
        
        {/* 좌측 학습 제목 & 요약 */}
        <Box 
          onClick={() => {
            if (isExist) navigate(`/studies/${row.studyId}`)
            else openStartModal(row)
          }} 
          sx={{ flex: 1, cursor: 'pointer' }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {row.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {row.summary}
          </Typography>
        </Box>

        {/* 우측 학습 진도 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
          <StudyStatusBox studyId={row.studyId} />
          <BookmarkToggleIcon target={{ targetId: row.studyId, bookmarkTarget: 'STUDY'}} />
        </Box>

          {/* 모달 영역 */}
          <ConfirmModal modalProps={startProps} />
      </Box>
    </>
      
  )
}