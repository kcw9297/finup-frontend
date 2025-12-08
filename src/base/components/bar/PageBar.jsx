import { Box, Pagination } from '@mui/material';

/**
 * 공용으로 사용하는 페이징 바 컴포넌트
 * @param pagination 페이징 정보
 * @param onChange 페이지 변동 시, 변경을 처리할 콜백 함수
 */

export default function PageBar({ pagination, onChange }) {

  if (!pagination) return null;  // 초기 렌더링 보호막(로딩 스피너)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Pagination
        count={pagination.totalPage || 1}
        page={pagination.pageNum}
        onChange={(event, value) => onChange(value)}
        shape="rounded"
        showFirstButton
        showLastButton
        siblingCount={1}  // 현재 페이지 양옆에 보이는 페이지 수
        boundaryCount={1} // 처음/끝에 보이는 페이지 수
        sx={(theme) => ({
          '& .MuiPaginationItem-root.Mui-selected': {
            color: theme.palette.text.contrastText, // base 테마의 대비 색상
            backgroundColor: theme.palette.base.main, // base 테마 메인 색상
            '&:hover': {
              backgroundColor: theme.palette.base.main, // palette 색상 유지
              cursor: 'default',
            }
          }
        })}
      />
    </Box>
  );
}
