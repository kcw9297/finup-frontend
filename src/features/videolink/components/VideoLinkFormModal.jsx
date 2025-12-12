import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, IconButton, Box, 
  MenuItem,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import VideoCard from '../../../base/components/card/VideoCard';
import { showSnackbar } from '../../../base/config/globalHookConfig';

/**
 * 공용 폼 모달 컴포넌트
 * @since 2025-12-09
 * @author kcw
 */
export default function VideoLinkFormModal({ modalProps }) {
  
  /*
    modalProps 내 내용
    open - 모달 열림 상태
    setOpen - 모달 열림을 제어할 함수
    title - 모달 제목
    submitText - 제출 버튼 텍스트 (기본 텍스트 : "등록")
    submit - 제출 시 처리하는 REST API 요청 정보를 담는 객체
  */
  const { open, setOpen, title, submitText = "등록", submit = {}} = modalProps;

  // 기본 제출 옵션
  const modalSubmit = {
    endpoint: '', // REST API URL
    admin: false, // 관리자 API
    public: false, // 공용 API
    handleVerify: null, // 영상 정보 검증 함수 (미리보기 호출)
    handleSubmit: null, // 제출 함수 (REST API 호출)
    ...submit
  }

  // [1] 내부 상태 관리
  const [videoUrl, setVideoUrl] = useState('') // 입력 url
  const [error, setError] = useState('') // url 입력 오류
  const [preview, setPreview] = useState('') // 영상 정보 미리보기
  const [verifying, setVerifying] = useState(false) // 검증 중
  const [verified, setVerified] = useState(false) // 검증 완료
  const [loading, setLoading] = useState(false) // 로딩 상태

  // [2] 필요 함수 선언
  // 입력 변경 처리 함수
  const handleChangeRq = (newUrl) => {
    setVideoUrl(newUrl)
    setError('') // 입력 시 에러 제거
    setVerified(false) // URL 변경 시 검증 상태 초기화
  };

  // helperText 생성
  const getHelperText = () => {

    // 에러가 있으면 에러 메시지 우선
    if (error) return error;
    
    // 에러가 없으면 안내 메시지
    return "영상번호가 포함된 영상 전체 URL을 입력해 주세요\nex. https://www.youtube.com/watch?v=17fQ_XxoBLs"
  };

  // 모달 초기화 함수
  const init = () => {
    videoUrl('')
    setError('')
    setLoading(false)
    setVerified(false)
    setPreview(null)
  }

  // 모달 닫기 처리 함수
  const handleClose = () => {

    if (loading) return // 로딩 중에는 닫기 불가
    init() // 초기화
    setOpen(false) // 모달 닫기 (부모에서 제어 중인 상태를 false로)
  };

  // [4] useEffect 및 API 요청 함수 정의
  useEffect(() => {
    init()
  }, [open])

  // 영상 검증 버튼 처리
  const handleVerify = async () => {

    try {

      // 검증 중 활성화
      setVerifying(true)

      // 검증 로직호출
      const json = await modalSubmit.handleVerify(videoUrl)
      if (!json.success) {
        setError(json.inputErrors?.videoUrl ?? {}) // 유효성 검사 오류 시 (필드 하나만 검증)
        return
      }

      // 조회 성공 시 미리보기 데이터 표시
      setPreview(json.data || {})

      // 검증 성공 처리
      setVerified(true)

    } finally {
      // 검증 중 상태 해제
      setVerifying(false)
    }

  }


  // 폼 제출 처리 
  const handleSubmit = async () => {

    // 제출 수행
    try {

      if (!verified) {
        setError("입력한 영상 URL을 확인해야 합니다")
        return
      }
      
      // 로딩 활성화
      setLoading(true)

      // 제출 수행 (url만 제출)
      const json = await modalSubmit.handleSubmit({videoUrl})
      if (!json.success && json.inputErrors) {
        setError(json.inputErrors.videoUrl) // 유효성 검사 오류 시 (필드 하나만 검증)
        return
      }

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
        tabIndex={-1} 
        sx={{ 
          px: 5,
          '&:focus': {
            outline: 'none' // 포커스 시 outline 제거
          }
        }}
      >
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>

          {/* URL 등록 */}
          <TextField
            type="text"
            name="videoUrl"
            value={videoUrl}
            onChange={(e) => handleChangeRq({'videoUrl' : e.target.value})}
            error={error} // 오류 여부 (true - 활성화)
            helperText={getHelperText()} // 안내 메세지 (오류 발생 시엔 오류 메세지로 대체)
            disabled={loading} // 로딩 중에는 비활성화
            fullWidth
            autoComplete="off"
            sx={{
              // helperText 왼쪽 마진 조정
              '& .MuiFormHelperText-root': {
                marginLeft: 1,
                marginTop: '4px'
              }
            }}
          >
          </TextField>

          {/* 미리보기 */}
          {/* 미리보기 영역 */}
          {preview && (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                p: 3,
                bgcolor: 'grey.50',
                borderRadius: 2
              }}
            >
              <VideoCard 
                video={preview} 
                admin={false}
                customWidth={400}
                customHeight={420}
              />
            </Box>
          )}

        </Box>
      </DialogContent>

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
          disabled={loading} // 로딩 중에는 비활성화
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