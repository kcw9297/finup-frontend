import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import theme from './base/design/thema.js'; // 커스텀 테마
import { SnackbarProvider } from './base/provider/SnackbarProvider.jsx';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}> {/* 커스텀 테마 적용 */}
    <CssBaseline /> {/* MUI 기본 스타일 초기화 (브라우저마다 다른 기본 스타일을 제거) */}
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </ThemeProvider>
);