// WordCard.jsx
import { Box, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ImageIcon from '@mui/icons-material/Image';

/**
 * 단어 카드 컴포넌트
 * @param item - 단어 객체 { id, name, meaning }
 * @param handles - 수정, 삭제, 재정렬 등 핸들링 함수
 * @param admin - 관리자 여부
 */
export default function WordCard({ word, handles, admin }) {

  // 카드에 담을 정보
  const { id, imageUrl, meaning } = word

  // 카드 수정/삭제/재정렬 함수
  const { handleUploadImage, handleEdit, handleRemove, handleReorder } = handles ?? {}
  
  // 컴포넌트
  return (
    <Paper 
      key={id}
      elevation={0}
      sx={{ 
        height: 350,
        border: '1.5px solid',
        borderColor: 'base.main',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>

        {/* 단어 카드 제목(헤드) */}
        <Typography 
          variant="h6" 
          sx={{ 
            p: 2, 
            color: 'base.main', 
            fontWeight: 600, 
            fontSize: '1.1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '70%'
          }}
        >
          {word.name}
        </Typography>

        {/* 관리자 - 단어 카드 관리 버튼 */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {admin && (
            <>
              {/* 이미지 수정 */}
              {handleUploadImage && (
                <IconButton onClick={handleUploadImage} size="small" sx={{ p: 0.5 }}>
                  <ImageIcon fontSize="small" />
                </IconButton>
              )}

              {/* 단어 수정 */}
              {handleEdit && (
                <IconButton onClick={handleEdit} size="small" sx={{ p: 0.5 }}>
                  <EditIcon fontSize="small" />
                </IconButton>
              )}

              {/* 단어 삭제 */}
              {handleRemove && (
                <IconButton onClick={handleRemove} size="small" sx={{ p: 0.5 }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}

              {/* 단어 재정렬 */}
              {handleReorder && (
                <IconButton onClick={handleReorder} size="small" sx={{ p: 0.5 }}>
                  <DragIndicatorIcon fontSize="small" />
                </IconButton>
              )}
            </>
          )}
        </Box>
      </Box>

      {/* 이미지 영역 (★ 추가됨) */}
      {(imageUrl || admin) && (
        <Box
          sx={{
            width: '100%',
            mb: 1.2,
            borderRadius: 1,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: imageUrl ? 'transparent' : '#f5f5f5',
          }}
        >
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={word.name}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          ) : (
            admin && <ImageIcon sx={{ fontSize: 180, color: 'grey.400' }} />
          )}
        </Box>
      )}



      {/* 단어 카드 본문 */}
      <Typography 
        variant="body2" 
        color="text.main" 
        sx={{ 
          p: 2, 
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 6,
          WebkitBoxOrient: 'vertical'
        }}
      >
        {meaning}
      </Typography>
    </Paper> 
  )
}