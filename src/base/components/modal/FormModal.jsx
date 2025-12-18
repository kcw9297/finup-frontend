import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, IconButton, Box,
  MenuItem,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import { showSnackbar } from '../../config/globalHookConfig';

/**
 * 공용 폼 모달 컴포넌트
 * @since 2025-12-09
 * @author kcw
 */
export default function FormModal({ modalProps }) {

  /*
    modalProps 내 내용
    open - 모달 열림 상태
    setOpen - 모달 열림을 제어할 함수
    title - 모달 제목
    initialValues - 모달 내 필드의 초기 값
    fields - 입력 필드 정의 [{name, label, type, required}, ...]
    submitText - 제출 버튼 텍스트 (기본 텍스트 : "등록")
    submit - 제출 시 처리하는 REST API 요청 정보를 담는 객체
  */
  const { open, setOpen, title, initialValues = [], fields = [], submitText = "등록", submit = {} } = modalProps;

  // Ref 추가
  const dialogContentRef = useRef(null);

  // 기본 제출 옵션
  const modalSubmit = {
    endpoint: '', // REST API URL
    admin: false, // 관리자 API
    public: false, // 공용 API
    handleSubmit: null, // 제출 함수 (REST API 호출)
    ...submit
  }

  // [1] 내부 상태 관리
  const [rq, setRq] = useState({}) // 모달 요청 상태
  const [errors, setErrors] = useState({}) // 유효성 검사 오류 상태
  const [loading, setLoading] = useState(false) // 로딩 상태

  const [fieldErrors, setFieldErrors] = useState({});
  const [globalError, setGlobalError] = useState(null);


  // [2] 필요 함수 선언
  // 입력 변경 처리 함수
  const handleChangeRq = (changeRq) => {
    setRq(prev => ({ ...prev, ...changeRq }));

    // 입력 시 해당 필드 에러 제거
    const fieldName = Object.keys(changeRq)[0]

    if (fieldErrors?.[fieldName]) {
      setFieldErrors(prev => {
        const copy = { ...prev };
        delete copy[fieldName];
        return copy;
      });
    }

    if (globalError) {
      setGlobalError(null);
    }
  };

  // helperText 생성
  const getHelperText = (field) => {

    // 에러가 있으면 에러 메시지 우선
    if (errors?.[field.name]) {
      return errors[field.name];
    }

    // 에러가 없으면 안내 메시지
    if (field.helperText) {
      return field.helperText;
    }

    return '';
  };

  // 모달 초기화 함수
  const init = () => {
    setRq(initialValues || {});
    setErrors(null);
    setLoading(false);
  }
  const isEdited = () => {
    if (!initialValues) return true;

    return Object.keys(initialValues).some(key => {
      const init = initialValues[key] ?? '';
      const curr = rq[key] ?? '';
      return String(init) !== String(curr);
    });
  };

  // 모달 닫기 처리 함수
  const handleClose = () => {

    if (loading) return; // 로딩 중에는 닫기 불가
    init(); // 초기화
    setOpen(false); // 모달 닫기 (부모에서 제어 중인 상태를 false로)
  };

  // 포커스 해제 함수
  const removeAllFocus = () => {
    // 현재 포커스된 요소에서 포커스 제거
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // DialogContent에 포커스를 주어 TextField의 포커스 제거
    if (dialogContentRef.current) {
      dialogContentRef.current.focus();
    }
  };


  // [4] useEffect 및 API 요청 함수 정의
  useEffect(() => {
    init()
  }, [open])

  // 폼 제출 처리 
  const handleSubmit = async () => {

    if (!isEdited()) {
      setGlobalError('변경된 내용이 없습니다.');
      return;
    }

    // 제출 수행
    try {

      // 빈 문자열 및 null/undefined 제거
      const cleanedRq = Object.entries(rq).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) acc[key] = value;
        return acc;
      }, {});

      // 제출 수행
      const json = await modalSubmit.handleSubmit(cleanedRq)

      if (!json.success) {

        // 🔹 필드 유효성 오류
        if (json.inputErrors && !json.inputErrors.global) {
          setFieldErrors(json.inputErrors);
        }

        // 🔹 비즈니스 메시지 (수정된 정보 없음 등)
        if (json.inputErrors?.global || json.message) {
          setGlobalError(json.inputErrors?.global || json.message);
        }

        return;
      }

      setGlobalError(null);
      setFieldErrors({});
      // 모달 닫기
      setOpen(false)

    } finally {
      setLoading(false)
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
      <DialogContent
        ref={dialogContentRef}
        tabIndex={-1}
        sx={{
          px: 5,
          '&:focus': {
            outline: 'none' // 포커스 시 outline 제거
          }
        }}
      >

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
          {fields.map(field => (
            <TextField
              key={field.name}
              type={field.type || 'text'}
              select={field.select} // select 여부
              label={field.label}
              value={rq[field.name] || ''}
              onChange={(e) => handleChangeRq({ [field.name]: e.target.value })}
              multiline={field.multiline} // TextArea 이용 시
              rows={field.multiline ? (field.rows || 4) : undefined} // multiline 적용 시에만
              error={!!errors?.[field?.name]} // 오류 여부 (true - 활성화)
              helperText={getHelperText(field)} // 안내 메세지 (오류 발생 시엔 오류 메세지로 대체)
              disabled={loading} // 로딩 중에는 비활성화
              fullWidth
              autoComplete="off"
              sx={{
                // helperText 왼쪽 마진 조정
                '& .MuiFormHelperText-root': {
                  marginLeft: 1,
                  marginTop: '4px',
                  whiteSpace: 'pre-line'
                }
              }}
              slotProps={{
                htmlInput: {
                  ...(field.type === 'number' && {
                    min: field.min ?? 0,           // 최소값 (기본 0)
                    max: field.max,                // 최대값 (선택)
                    step: field.step ?? 1          // 증감 단위 (기본 1)
                  })
                }
              }}
            >
              {/* select 옵션 렌더링 */}
              {field.select && field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ))}
        </Box>
      </DialogContent>

      {/* 전역 오류 메시지 영역 */}
      <Box sx={{
        minHeight: '32px', // 고정 높이
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 3,
        py: 1
      }}>
        {globalError && (
          <Box sx={{ color: 'error.main', fontSize: '14px' }}>
            {globalError}
          </Box>
        )}
      </Box>

      {/* 버튼 */}
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
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || Object.keys(fieldErrors).length !== 0} // 로딩 중에는 비활성화
          sx={{
            minWidth: 100,
            bgcolor: 'base.main',
            '&:hover': { bgcolor: 'base.dark' }
          }}
        >
          {loading ? (<CircularProgress size={24} sx={{ color: 'white' }} />) : (submitText)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}