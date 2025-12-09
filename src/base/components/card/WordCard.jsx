// WordCard.jsx
import { Box, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

/**
 * 단어 카드 컴포넌트
 * @param word - 단어 객체 { id, name, meaning }
 * @param onEdit - 수정 버튼 클릭 핸들러
 * @param onDelete - 삭제 버튼 클릭 핸들러
 * @param onReorder - 재정렬 버튼 클릭 핸들러
 */
export default function WordCard({ item, options }) {

  // 카드에 담을 정보
  const { id, meaning } = item;

  // 카드 수정/삭제/재정렬 함수
  const { onReorder, onEdit, onDelete } = options
  
  // 컴포넌트
  return (
    <Paper sx={{ p: 3, minHeight: 200 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
        <Typography variant="h5" sx={{ color: 'base.main', fontWeight: 600 }}>
          {item.name}
        </Typography>
        <Box>
          {onReorder && (
            <IconButton size="small" onClick={() => onReorder(id)}>
              <DragIndicatorIcon />
            </IconButton>
          )}
          {onEdit && (
            <IconButton size="small" onClick={() => onEdit(id)}>
              <EditIcon />
            </IconButton>
          )}
          {onDelete && (
            <IconButton size="small" onClick={() => onDelete(id)}>
              <DeleteIcon />
            </IconButton>
          )}

        </Box>
      </Box>
      <Typography variant="body1" color="text.secondary">
        {meaning}
      </Typography>
    </Paper>
  );
}