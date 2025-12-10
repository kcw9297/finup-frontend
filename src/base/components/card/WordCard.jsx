// WordCard.jsx
import { Box, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ImageIcon from '@mui/icons-material/Image';

/**
 * 단어 카드 컴포넌트
 * @param item - 단어 객체 { id, name, meaning }
 * @param clickFunctions - 수정, 삭제, 재정렬 등 핸들링 함수
 * @param admin - 관리자 여부
 */
export default function WordCard({ word, clickFunctions, admin }) {

  // 카드에 담을 정보
  const { id, name, meaning, imageUrl } = word

  // 카드 버튼 클릭 이벤트
  const { 
    onClickUploadImage = () => {}, 
    onClickRemoveImage = () => {},
    onClickEdit = () => {},
    onClickRemove = () => {},
  } = clickFunctions ?? {}
  
  // 컴포넌트
  return (
    <Paper 
      key={id}
      elevation={0}
      sx={{ 
        height: 380,
        width: 300,
        border: '2px solid',
        borderColor: 'base.main',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >

      {/* 이미지 상단 헤드 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>

        {/* 단어 카드 제목 */}
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
          {name}
        </Typography>
      </Box>

      {/* 이미지 영역 */}
      <Box
        sx={{
          position: "relative", // 부모를 relative로 설정
          width: "100%",
          height: 180,
          bgcolor: "grey.200",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          // 이 Box에 hover 시 자식 버튼들이 나타남
          "&:hover .image-buttons": {
            opacity: 1,
          }
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <ImageIcon sx={{ fontSize: 100, color: "grey.400" }} />
        )}

        {/* 이미지 수정/삭제 버튼 (관리자) */}
        {admin && (
          <Box
            className="image-buttons" // hover 타겟용 클래스
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              display: "flex",
              gap: 1,
              opacity: 0, // 기본은 숨김
              transition: "opacity 0.2s",
            }}
          >
            {/* 단어 이미지 수정 아이콘 */}
            <IconButton
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.9)",
                "&:hover": { bgcolor: "white" }
              }}
              onClick={(e) => {onClickUploadImage}}
            >
              <AddPhotoAlternateIcon fontSize="small" />
            </IconButton>

            {/* 단어 이미지 삭제 아이콘 */}
            <IconButton
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.9)",
                "&:hover": { bgcolor: "white" }
              }}
              onClick={(e) => {onClickRemoveImage}}
            >
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
            
          </Box>
        )}
      </Box>

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
          WebkitBoxOrient: 'vertical',
          whiteSpace: 'pre-wrap',
        }}
      >
        {meaning}
      </Typography>



      {admin && (
        <Box sx={{ 
          position: 'relative',
          display: 'flex',  
          justifyContent: 'flex-end',
          p: 1
        }}>
          {/* 단어 수정 아이콘 */}
          <IconButton onClick={onClickEdit} size="small" sx={{ p: 0.5 }}>
            <EditIcon fontSize="small" />
          </IconButton>

          {/* 단어 삭제 아이콘 */}
          <IconButton onClick={onClickRemove} size="small" sx={{ p: 0.5 }}>
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Box>
      )}
    </Paper> 
  )
}