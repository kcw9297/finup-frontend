// src/base/contexts/SnackbarContext.jsx
import { createContext, useCallback, useContext, useState } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';


/**
 * 전역적으로 Snackbar를 제공하기 위한 Provider 컴포넌트
 * Provider = 상태 + 로직 + UI통제 기능
 */

// [1] Context 선언 (전역적으로 제공 목적)
const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {

  // [2] Snackbar 상태
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('error')

  // [3] Snackbar 열기/닫기 함수 선언
  const showSnackbar = useCallback((message, type = 'error') => {
    setMessage(message)
    setSeverity(type)
    setOpen(true)
  }, [])

  const hideSnackbar = useCallback(() => {
    setOpen(false)
  }, [])

  // [4] Provider 내 하단의 컴포넌트 저장 
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      
      {/* 전역 Snackbar */}
      <Snackbar 
        open={open} 
        onClose={hideSnackbar}
        autoHideDuration={5000}  // 지속 시간
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        slots={{ transition: Slide }}
        slotProps={{
          transition: { direction: 'left' }  // 오른쪽 → 왼쪽 슬라이드
        }}
      >
        <Alert severity={severity} onClose={hideSnackbar}>
          {message}
        </Alert>
      </Snackbar>

    </SnackbarContext.Provider>
  );
}

// [3] 외부에서 스낵바를 사용할 수 있도록 함수 제공
// eslint-disable-next-line react-refresh/only-export-components
export function useSnackbar() {
  return useContext(SnackbarContext);
}
