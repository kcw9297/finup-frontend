import { Box } from "@mui/material";


/**
 * Header / Footer 가 없는 빈 레이아웃 (중앙 정렬)
 */
export default function EmptyLayout({ children }) {

  return (
    // 외부 박스 영역 (높이 결정 가능)
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* 중앙 메인 영역 (너비 관리) */}
      <Box 
        component="main"
        sx={{ 
          flex: 1, // 남은 공간 차지
          
          // 너비 설정
          maxWidth: 1200, 
          margin: '0 auto', 
          padding: 2,
          width: '100%',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>

    </Box>
  )
}