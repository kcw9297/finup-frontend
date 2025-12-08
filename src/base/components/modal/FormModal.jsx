// FormModal.jsx
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, IconButton, Box 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useSnackbar } from '../../provider/SnackbarProvider';
import { api } from '../../utils/fetchUtils';

/**
 * 공용 폼 모달 컴포넌트
 * @param open - 모달 열림 상태
 * @param setOpen - 모달 열림을 제어할 함수
 * @param title - 모달 제목
 * @param fields - 입력 필드 정의 [{name, label, type, required}, ...]
 * @param submitText - 제출 버튼 텍스트 (기본 텍스트 : "등록")
 * @param submit - 제출 시 처리하는 REST API 요청 정보를 담는 객체
 */
export default function FormModal({ open, setOpen, title, fields = [], submitText, submit = {} }) {
  
  // [1] 내부 상태 관리
  const [rq, setRq] = useState({}) // 모달 요청 상태
  const [errors, setErrors] = useState({}) // 유효성 검사 오류 상태
  const [loading, setLoading] = useState(false) // 로딩 상태
  const { showSnackbar } = useSnackbar()

  // 기본 제출 옵션
  const modalSubmit = {
    endpoint: '',
    method : 'POST',
    admin: false,
    public: false,
    ...submit
  }

  // [2] 필요 함수 선언
  // 입력 변경 처리 함수
  const handleChangeRq = (changeRq) => {
    setRq(prev => ({ ...prev, ...changeRq }));
  };

  // 모달 초기화 함수
  const init = () => {
    setRq({});
    setErrors({});
    setLoading(false);
  }

  // 모달 닫기 처리 함수
  const handleClose = () => {

    if (loading) return; // 로딩 중에는 닫기 불가
    init(); // 초기화
    setOpen(false); // 모달 닫기 (부모에서 제어 중인 상태를 false로)
  };


  // [3] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    showSnackbar(rp.message, 'success')
    init() // 초기화
    setOpen(false) // 모달 닫기
  }

  const onError = rp => {
    if (rp.inputErrors) setErrors(rp.inputErrors) // 유효성 검사 오류인 경우 추가
  }

  const onFinally = () => {
    setLoading(false) // 로딩 상태 해제
  }


  // [4] API 요청 함수 정의
  const handleSubmit = async () => {

    // 제출 수행
    switch (modalSubmit.method.toUpperCase()) {
      case 'POST':
        await api.post(modalSubmit.endpoint, { onSuccess, onError, onFinally, admin : modalSubmit.admin, public: modalSubmit.public }, rq)
        break
      case 'PUT':
        await api.put(modalSubmit.endpoint, { onSuccess, onError, onFinally, admin : modalSubmit.admin, public: modalSubmit.public }, rq)
        break
      case 'PATCH':
        await api.patch(modalSubmit.endpoint, { onSuccess, onError, onFinally, admin : modalSubmit.admin, public: modalSubmit.public }, rq)
        break
      default:
        throw new Error(`잘못된 메소드 입력 : ${modalSubmit.method}`)
    }
  };

  return (
    <Dialog 
      open={open} 
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

      {/* 내용 */}
      <DialogContent sx={{ px: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
          {fields.map(field => (
            <TextField
              key={field.name}
              type={field.type || 'text'}
              label={field.label}
              value={rq[field.name] || ''}
              onChange={(e) => handleChangeRq({[field.name] : e.target.value})}
              error={!!errors[field.name]} // 오류 여부 (true - 활성화)
              helperText={errors[field.name]} // 오류 메세지 (errors 상태 변화에 반응)
              fullWidth
            />
          ))}
        </Box>
      </DialogContent>

      {/* 버튼 */}
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button 
          onClick={handleClose}
          variant="outlined"
          sx={{ minWidth: 100 }}
        >
          취소
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          sx={{ 
            minWidth: 100,
            bgcolor: 'base.main',
            '&:hover': { bgcolor: 'base.dark' }
          }}
        >
          {submitText || '등록'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}