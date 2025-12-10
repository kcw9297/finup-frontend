import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'

/**
 * 공용으로 사용하는 검색 바 컴포넌트
 * @param searchRq 검색 요청 상태
 * @param onSubmit 검색 처리 함수 (검색 버튼 혹은 엔터 입력 시 처리할 함수)
 * @param onChange 검색어가 변경되었을 때, 처리할 함수 (ex. updateSearchRq) 
 * @param filterOnChange 필터가 존재하는 경우, 필터 변경을 처리할 함수 (ex. handleFilter) 필터가 없는 경우는 사용 x
 * @param selectItems 필터 옵션 메뉴 커스터마이징
 */
export default function SearchBar({ searchProps }) {

  /*
    keyword 검색어
    filter 검색 필터
    onKeywordChange 검색어 변경 함수
    filterOnChange 필터가 존재하는 경우, 필터 변경을 처리할 함수 (ex. handleFilter) 필터가 없는 경우는 사용 x
    onSubmit 검색 폼 제출 (검색 수행)
    selectItems 필터 옵션 메뉴 커스터마이징
  */
  const [ keyword, filter, onKeywordChange, onFilterChange, onSubmit, filterItems ] = searchProps

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box
        component="form"
        onSubmit={(e) => { onSubmit(e); }}
        sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}
      >

        {filter && onFilterChange && (
          <FormControl size="small" sx={{ minWidth: 120, }}>
            <InputLabel>필터</InputLabel>
            <Select
              value={filter}
              onChange={e => onFilterChange(e.target.value)}
              autoWidth
              label="필터"
              sx={{ minWidth: 100, height: 40, }}
            >
              {/* 옵션 목록을 동적으로 생성 (커스터마이징 항목 없으면 기본 디폴트 옵션으로)*/}
              {filterItems.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))
              }

            </Select>
          </FormControl>
        )}

        <TextField
          name="keyword"
          placeholder="검색어 입력"
          value={keyword}
          onChange={e => onKeywordChange({ keyword: e.target.value })}
          size="small"
          sx={{ width: 500 }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            minWidth: 40,
            width: 40,
            height: 40,
            borderRadius: 1,
            p: 0,
            boxShadow: 'none' // 그림자 제거
          }}
        >
          <SearchIcon />
        </Button>
      </Box>
    </Paper>
  )
}