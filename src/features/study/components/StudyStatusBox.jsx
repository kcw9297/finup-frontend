import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  LinearProgress,
  Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { useStudyProgress } from '../../../base/hooks/useStudyProgress';

export default function StudyStatusBox({ studyId }) {

  // [1] 학습진도 전역상태
  const { studyProgresses } = useStudyProgress()
  
  // 존재 여부
  const curProgress = studyProgresses.find((progress) => progress.studyId === studyId)

  // [2] 판별 값
  const isBefore = !curProgress // 존재하지 않으면 false
  const isInProgress = !isBefore && curProgress.studyStatus === 'IN_PROGRESS'
  const isCompleted = !isBefore && curProgress.studyStatus === 'COMPLETED'

  // [3] 컴포넌트 반환
  return (
    <Box sx={{ 
      display: 'inline-flex', 
      alignItems: 'center',
      gap: 1.5,
      p: 1.5,
      pl: 2,
      minWidth: '200px',
      borderRadius: 1,
      backgroundColor: isCompleted ? '#e8f5e9' : isInProgress ? '#e3f2fd' : '#f5f5f5'
    }}>
      {
        isCompleted ? <CheckCircleIcon sx={{ color: '#2e7d32' }} /> : 
        isInProgress ? <InfoOutlinedIcon sx={{ color: '#1976d2' }} /> :
        isBefore ? <CancelIcon sx={{ color: '#bdbdbd' }} /> : ''
      }
      <Typography 
        variant="body2" 
        sx={{ 
        fontWeight: 500,
        color: isCompleted ? '#2e7d32' : isInProgress ? '#1976d2' : '#9e9e9e'
      }}>
        {isCompleted ? '학습 완료' : isInProgress ? '학습 중' : isBefore ? '학습 전' : ''}
      </Typography>
    </Box>
  )
}