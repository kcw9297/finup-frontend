import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, CircularProgress,
  DialogContentText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';



/**
 * DELETE 요청 확인 모달 컴포넌트
 * @since 2025-12-10
 * @author kcw
 */
export default function DeleteConfirmModal({ modalProps }) {

  /*
    modalProps 내 내용
    open - 모달 열림 상태
    setOpen - 모달 열림을 제어할 함수
    title - 모달 제목
    content - 모달 본문
    submit - 제출 시 처리하는 REST API 요청 정보를 담는 객체
  */
  const { open, setOpen, title, content, submit = {} } = modalProps;

  // 기본 제출 옵션
  const modalSubmit = {
    endpoint: '', // REST API URL
    admin: false, // 관리자 API
    public: false, // 공용 API
    handleSubmit: null, // 확인 클릭 시 처리할 함수
    ...submit
  }

  // [1] 모달 상태
  const [loading, setLoading] = useState(false) // 로딩 상태

  // [2] 필요 함수 선언
  // 모달 닫기 처리 함수
  const handleClose = () => {
    if (loading) return; // 로딩 중에는 닫기 불가
    setLoading(false);
    setOpen(false); // 모달 닫기 (부모에서 제어 중인 상태를 false로)
  }

  // [3] useEffect 및 API 요청 함수 정의
  // 폼을 열 시 로딩상태 초기화
  useEffect(() => {
    setLoading(false);
  }, [open])

  // 폼 확인 클릭 처리 
  const handleConfirm = async () => {

    try {

      // 로딩 활성화
      setLoading(true)

      // 제출 수행
      await modalSubmit.handleSubmit()

      // 모달 닫기
      setOpen(false)

    } finally {
      setLoading(false)
    }
  };
  

  // [4] 모달 컴포넌트 반환
  return (
    <Dialog open={open} 
      onClose={handleClose}
      maxWidth="sm"
      disableRestoreFocus  // 포커스 복원 비활성화
      keepMounted={false}  // 닫힐 때 DOM에서 제거
      fullWidth
    >
      {/* 제목 + 닫기 버튼 */}
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        fontWeight: 700,
        fontSize: '26px',
        px: 4,
        py: 4,

      }}>
        {title}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* 본문 */}
      <DialogContent sx={{ px: 4, py: 6}}>
        <DialogContentText sx={{ 
          fontSize: '16px',
          color: 'text.primary',
          lineHeight: 1.6
        }}>
          {content}
        </DialogContentText>
      </DialogContent>



      {/* 하단 버튼 */}
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button 
          onClick={handleClose}
          variant="outlined"
          disabled={loading} // 로딩 중에는 비활성화
          sx={{ minWidth: 100 }}
        >
          취소
        </Button>
        <Button 
          onClick={handleConfirm}
          variant="contained"
          disabled={loading} // 로딩 중에는 비활성화
          sx={{ 
            minWidth: 100,
            bgcolor: 'base.main',
            '&:hover': { bgcolor: 'base.dark' }
          }}
        >
          {loading ? (<CircularProgress size={24} sx={{ color: 'white' }} />) : '삭제'}
        </Button>
      </DialogActions>


    </Dialog>
  );
}