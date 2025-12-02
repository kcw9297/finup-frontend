import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'

/**
 * 공용으로 사용하는 검색 바 컴포넌트
 * @param searchRq 검색 요청 상태
 * @param onSubmit 검색 처리 함수 (검색 버튼 혹은 엔터 입력 시 처리할 함수)
 * @param onChange 검색어가 변경되었을 때, 처리할 함수 (ex. updateSearchRq) 
 * @param filterOnChange 필터가 존재하는 경우, 필터 변경을 처리할 함수 (ex. handleFilter) 필터가 없는 경우는 사용 x
 */
export default function SearchBar({ searchRq, onSubmit, onChange, filterOnChange}) {
  
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
        <Box 
          component="form" 
          onSubmit={(e) => { onSubmit(e); }}
          sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}
        >
          
          {filterOnChange && (
            <FormControl size="small" sx={{ minWidth: 120, }}>
              <InputLabel>필터</InputLabel>
              <Select
                value={searchRq.filter}
                onChange={e => filterOnChange(e.target.value)}
                autoWidth
                label="필터"
                sx={{ minWidth: 100, height: 40, }}
              >
                <MenuItem value=""><em>선택</em></MenuItem>
                <MenuItem value="name">이름</MenuItem>
                <MenuItem value="subject">제목</MenuItem>
                <MenuItem value="content">내용</MenuItem>
                <MenuItem value="subjectContent">제목+내용</MenuItem>
              </Select>
            </FormControl>
          )}

          <TextField
            name="keyword"
            placeholder="검색어 입력"
            value={searchRq.keyword}
            onChange={e => onChange({ keyword: e.target.value })}
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