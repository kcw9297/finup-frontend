import { useNavigate } from "react-router-dom";
import { useYoutubeList } from "../hooks/useYoutubeList";
import AdminSidebar from "../../../../base/components/layout/AdminSidebar";
import YoutubeCard from "./YoutubeCard";

import {
  Box, Paper, Table, TableHead,
  TableBody, TableRow, TableCell, Typography, IconButton, Tooltip, Grid
} from "@mui/material";

import SearchBar from "../../../../base/components/bar/SearchBar";
import PageBar from "../../../../base/components/bar/PageBar";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';

// 검색 요청 초기값 (MemberList와 동일 구조 유지)
const INITIAL_SEARCH_RQ = {
  keyword: "",
  filter: "",
  pageNum: 1,
  size: 10,
};

/**
 * 유튜브 영상 목록 리스트
 * @since 2025-12-10
 * @author khj
 */

export default function YoutubeList() {

  // [1] 검색 요청 상태
  const [searchRq, setSearchRq] = useState(INITIAL_SEARCH_RQ)

  const changeSearchRq = (rq) => {
    setSearchRq(prev => ({ ...prev, ...rq }))
  }
  // [2] 훅 호출
  const {
    youtubeList,
    pagination,
    loading,
    fetchYoutubeList
  } = useYoutubeList(searchRq)

  // 검색 조건 바뀔 때마다 리스트 자동 조회
  useEffect(() => {
    fetchYoutubeList();
  }, [searchRq]);

  const navigate = useNavigate()

  // [3] 필터 옵션 (원하는 만큼 추가 가능)
  const youtubeFilterOptions = [
    { value: "title", label: "제목" },
    { value: "url", label: "영상링크" },
  ]


  const handleFilter = (value) => {
    changeSearchRq({ filter: value })
  }

  // [4] 페이지 계산 (pagination.dataCount 사용)
  const totalPages = (pagination && pagination.dataCount)
    ? Math.ceil(pagination.dataCount / pagination.pageSize)
    : 1

  // [5] 반환 UI
  return (
    <Box sx={{ display: "flex", width: "100%" }}>

      {/* 좌측 관리자 메뉴 */}
      <AdminSidebar />

      {/* 우측 콘텐츠 영역 */}
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        {/* 상단 타이틀 */}
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          maxWidth: "750px",
          mx: "auto"
        }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            유튜브 영상 목록 조회
          </Typography>
          <Tooltip title="유튜브 링크 등록">
            <IconButton
              size="large"
              onClick={() => navigate("/admin/youtube/write")}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
        {/* 검색 바 */}
        <SearchBar
          searchRq={searchRq}
          onChange={(rq) => changeSearchRq(rq)}
          onSubmit={(e) => {
            e.preventDefault();
            fetchYoutubeList();
          }}
          filterOnChange={handleFilter}
          selectItems={youtubeFilterOptions}
        />
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {youtubeList.length === 0 && (
              <Typography sx={{ mx: "auto", mt: 5 }}>
                영상 데이터가 없습니다.
              </Typography>
            )}

            {youtubeList.map((item) => (
              <Grid item key={item.videoId} xs={12} sm={6} md={4} lg={3}>
                <YoutubeCard item={item} onClick={item.videoUrl} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 페이지네이션 */}
        {pagination && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <PageBar
              pagination={pagination}
              page={pagination.pageNum + 1}
              count={totalPages}
              onChange={(value) => {
                changeSearchRq({ pageNum: value });
                fetchYoutubeList({});
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}