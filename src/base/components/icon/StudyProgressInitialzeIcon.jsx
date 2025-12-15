import { IconButton, Tooltip } from '@mui/material';
import { useStudyProgress } from '../../hooks/useStudyProgress';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

/**
 * 학습 초기화 아이콘 컴포넌트
 * @since 2025-12-15
 * @author kcw
 */

export default function StudyProgressInitialzeIcon({ studyId }) {

  // [1] 북마크 상태
  const {
    loading, studyProgresses,
    initializeStudy
  } = useStudyProgress()

  // [2] 필요 함수 선언
  // 진도 존재 여부
  const isProgressExist = studyProgresses.some(progress => 
    Number(progress.studyId) === Number(studyId)
  )

  // [3] 컴포넌트 반환
  return (
    <Tooltip disabled={!isProgressExist} title="학습 초기화">
      <IconButton 
        onClick={() => initializeStudy(studyId)}
        disabled={loading || !isProgressExist} // 진도가 존재하지 않는 경우에도 비활성화
        sx={{ 
          padding: '1px',
          color: isProgressExist ? 'error.main' : 'grey.400',
          '&.Mui-disabled': {
            color: 'grey.400',
          }
        }}
      >
        <RestartAltIcon />
      </IconButton>
    </Tooltip>
  );
}