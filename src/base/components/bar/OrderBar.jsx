// SortBar.jsx
import { Box, Typography } from '@mui/material';

/**
 * 정렬 옵션 선택 바 컴포넌트
 * @param {Array} options - 정렬 옵션 배열 [{value: 'latest', label: '최신순'}, ...]
 * @param {string} selected - 현재 선택된 정렬 값
 * @param {Function} onChange - 정렬 변경 콜백 함수
 */
export default function OrderBar({ options, selected, onChange }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
      }}
    >
      {options.map((option, index) => (
        <Typography
          key={option.value}
          onClick={() => onChange(option.value)}
          sx={{
            fontSize: '14px',
            color: selected === option.value ? 'base.main' : 'text.secondary',
            fontWeight: selected === option.value ? 600 : 400,
            textDecoration: selected === option.value ? 'underline' : 'none',
            cursor: 'pointer',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {option.label}
        </Typography>
      ))}
    </Box>
  );
}