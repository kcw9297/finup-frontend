import { IconButton, Tooltip } from '@mui/material';
import { useStudyProgress } from '../../hooks/useStudyProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

/**
 * 학습 완료 아이콘 컴포넌트
 * @since 2025-12-14
 * @author kcw
 */

export default function StudyProgressCompleteIcon({ studyId }) {

  // [1] 북마크 상태
  const {
    loading, studyProgresses,
    progressStudy, completeStudy
  } = useStudyProgress()

  // [2] 필요 함수 선언
  // 학습 진도 완료 여부
  const isCompleted = studyProgresses.some(progress => 
    Number(progress.studyId) === Number(studyId) && 
    progress.studyStatus === 'COMPLETED'
  )

  // 토글 함수
  const handleToggle = () => {
    if (isCompleted) progressStudy(studyId)
    else completeStudy(studyId)
  }

  // [3] 컴포넌트 반환
  return (
    <Tooltip title="학습 완료">
      <IconButton 
        onClick={handleToggle}
        disabled={loading}
        sx={{ 
          padding: '1px',
          color: isCompleted ? 'success.main' : 'grey.400',
        }}
      >
        {isCompleted ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
      </IconButton>
    </Tooltip>
  );
}