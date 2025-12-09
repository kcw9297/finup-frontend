import { useNavigate } from "react-router-dom";
import { useYoutubeList } from "../hooks/useYoutubeList";
import AdminSidebar from "../../../../base/components/layout/AdminSidebar";
import YoutubeCard from "./YoutubeCard";

import {
  Box, Paper, Table, TableHead,
  TableBody, TableRow, TableCell, Typography, IconButton, Tooltip, Grid
} from "@mui/material";

import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// 검색 요청 초기값 (MemberList와 동일 구조 유지)
const INITIAL_SEARCH_RQ = {
  keyword: "",
  filter: "",
  pageNum: 1,
  size: 10,
};
// 한 화면에 몇 개를 보여줄지(밑 슬라이드)
const VISIBLE_COUNT = 3;
/**
 * 유튜브 영상 목록 리스트
 * @since 2025-12-10
 * @author khj
 */

export default function YoutubeList() {

  // [1] 검색 요청 상태
  const [searchRq, setSearchRq] = useState(INITIAL_SEARCH_RQ)
  const [slideIndex, setSlideIndex] = useState(0)


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

  // 총 슬라이드 페이지 수
  const maxIndex = Math.ceil(youtubeList.length / VISIBLE_COUNT) - 1;
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

  // 슬라이드 버튼/위치 인덱스
  const handlePrev = () => {
    setSlideIndex(prev => Math.max(prev - 1, 0));
  }
  const handleNext = () => {
    setSlideIndex(prev => Math.min(prev + 1, maxIndex))
  }

  // 필터 옵션
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

      {/* 우측 콘텐츠 영역 */}
      <Box sx={{ flexGrow: 1, padding: 4, pt: 6, pl: 6, position: "relative" }}>

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
        <Box sx={{
          position: "absolute",
          top: 20, right: 20,
          display: "flex",
          gap: 1, zIndex: 10
        }}>
          <IconButton size="small" onClick={handlePrev}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <IconButton size="small" onClick={handleNext}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{
          mt: 4, ml: 10,
          overflow: "hidden",
          width: "80%"
        }}>
          <Box
            sx={{
              display: "flex",
              transition: "transform 0.4s ease",
              transform: `translateX(-${slideIndex * (100 / VISIBLE_COUNT)}%)`,
            }}
          >
            {youtubeList.length === 0 && (
              <Typography sx={{ mx: "auto", mt: 5 }}>
                영상 데이터가 없습니다.
              </Typography>
            )}

            {youtubeList.map((item) => (
              <Box
                key={item.videoId}
                sx={{
                  flex: `0 0 calc(100% / ${VISIBLE_COUNT})`,
                  p: 1,
                }}>
                <YoutubeCard item={item} onClick={item.videoUrl} />
              </Box>

            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}