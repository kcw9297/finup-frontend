import { Slide } from "@mui/material";
import { createTheme } from "@mui/material/styles";


// 전역 테마 생성
const theme = createTheme({
  
  // 색상 커스터마이징
  palette: {

    // 사이트 기본 색상
    base: {
      main: '#003fbf',  // 메인 색상. focus 등 이벤트에 적용
      light: '#3064ccff',
      dark: '#002f8f', // hover 시 적용
      contrastText: '#ffffff', // primary 배경 적용 시 글씨 색상
    },

    // 사이트 텍스트 색상
    text: {
      main: '#000000',  
      light: '#003fbf',
      dark: '#002f8f',
      contrastText: '#ffffff',
    },

    // 사이트 에러 색상
    err: {
      main: '#ca2b2bff',
      light: '#d33e3eff',
      dark: '#7b0707ff',
      contrastText: '#ffffff',
    },

    // 색상 - background (배경)
    background: {
      //default: '#f5f5f5' // 기본 색상
    },


    // action - hover, active, disabled, ...
    action: {
      hover: '#ede7f6',
      selected: '#d1c4e9',
      disabled: '#bdbdbd',
      disabledBackground: '#e0e0e0',
      active: '#7e57c2',
    }
  },

  // 사이트 기본 폰트
  // 브라우저가 위에서부터 사용 가능한 폰트를 순서대로 검색하여, 설치된 폰트를 찾으면 사용하는 방식
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },


  // Component 커스터마이징
  components: {

    // Paper
    MuiPaper: {
      styleOverrides: {

        // 항상 적용
        root: ({ theme }) => ({

          backgroundColor: '#ffffff', // 배경색
          borderRadius: 16, // 모서리
          padding: 40, // 여백

          borderWidth: 2, // 테두리 선 굵기
          borderStyle: 'solid', // 테두리 스타일
          borderColor: theme.palette.base.main, // 테두리 색상
        }),
        
      },

      // 기본 프롭스
      defaultProps: {
        elevation: 8, // 기본 elevation(그림자) 값
      },

    },

    // Typography
    MuiTypography: {
      styleOverrides: {

        root: ({ theme }) => ({

          color: theme.palette.text.light, // 버튼 색
          marginBottom: 24, 
          textAlign: 'center',
          fontWeight: 'bold'
        }),
      },
    },
    

    // Button
    MuiButton: {
      styleOverrides: {

        root : {
          textTransform: 'none',  // 버튼 단어가 강제로 대문자로 변환되는걸 방지
          borderRadius: 8,        // 버튼 모서리
        }
      },

      defaultProps: {
        color: 'base',  // 버튼 색상
      }
    },

    // TextField
    MuiTextField: {

      defaultProps: {
        variant: 'outlined',
      },
    },

    // TextField - Outlined
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        }
      }
    },


    // IconButton
    MuiIconButton: {
      defaultProps: {
        color: 'inherit', // 모든 IconButton의 기본 색상
      },
    },



    // Snackbar
    MuiSnackbar: {

      styleOverrides: {
       //root: {
       //  top: '80px !important', // 헤더 높이만큼 띄움
       //}
      },

      defaultProps: {
        anchorOrigin: { vertical: 'bottom', horizontal: 'left', }, // 바 등장 위치
        TransitionComponent: Slide, // Slide 컴포턴트를 이용해, 슬라이드 방식으로 나타나게 함
        TransitionProps: { direction: 'right' }, // 슬라이드 방향
        autoHideDuration: 5000,   // 지속 시간 (이 시간이 지나면 자동 숨김 처리)
      },
    },

    // Snackbar 내 MulAlert
    MuiAlert: {
      defaultProps: {
        variant: 'filled',        // Alert 기본 variant 
      },
      styleOverrides: {
        root: ({ theme }) => ({
          border: 'none',               // 테두리 없음
          fontSize: '18px',             // 글씨크기
          padding: '10px 18px',         // 크기/내부 여백
          minWidth: '220px',            // 공통 최소 너비
          display: 'flex',
          alignItems: 'center',
        }),
        message: {
          display: 'flex',
          alignItems: 'center',
          padding: 0, // 기본 패딩 값 제거
          marginRight: 40 // 우측 마진
        },

      // SnackBar 우측 X 버튼(action 영역)
      action: {
        padding: 0, // 기본 패딩 값 제거
        display: 'flex',
        alignItems: 'center',
      },

      // 아이콘 
      icon: {
        fontSize: '1.7rem',
      }
      },
    },

  },
});

export default theme;