import { useNavigate } from "react-router-dom";
import { useMemberList } from "../hooks/useMemberList"
import {

  Box, IconButton, Paper, Table, TableHead, Button,
  TableBody, TableRow, TableCell, Tooltip, Typography
} from "@mui/material";
import PageBar from './../../../../base/components/bar/PageBar';
import { PDFDownloadLink, Page, Text, Document } from '@react-pdf/renderer';
import MemberPdfDocument from "./MemberPdfDocument";
import { pdf } from "@react-pdf/renderer";
import { api } from "../../../../base/utils/fetchUtils";
import SearchBar2 from "../../../../base/components/bar/SearchBar2";
import { TableContainer } from "@mui/material";
import { maskEmail, maskName } from "../../../../base/utils/mask";


const INITIAL_SEARCH_RQ = {
  keyword: "",
  filter: "",
  pageNum: 1,
  size: 10
}

/**
 * 회원 목록 리스트
 * @author khj
 * @since 2025-12-05
 */
export default function MemberList() {


  // [0] 날짜 포맷 함수
  function formatDate(dateString) {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",

      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  }
  // [1] 필요한 상수들

  const memberFilterOptions = [
    { value: "email", label: "이메일" },
    { value: "nickname", label: "닉네임" },
  ]

  // PDF 렌더링
  const handleDownload = async () => {
    // [1] 회원 전체 목록 조회 요청 (PDF Export 전용 엔드포인트 사용)
    const allMembers = await api.get("/members/list/all", {
      params: {
        size: 9999  // 전체 불러오기
      },
    })
    // [2] 응답 데이터에서 실제 회원 배열만 추출
    const list = allMembers.data

    // [3] React-PDF Document를 Blob(binary 데이터)으로 변환
    const blob = await pdf(<MemberPdfDocument list={list} />).toBlob()

    // [4] Blob을 브라우저 임시 URL로 변환하여 다운로드 링크 생성
    const url = URL.createObjectURL(blob)

    // [5] 가상의 <a> 태그를 만들어 자동으로 다운로드 트리거
    const a = document.createElement("a")
    a.href = url
    a.download = "회원목록.pdf"
    a.click()

    // [6] 메모리 누수 방지를 위해 URL 해제
    URL.revokeObjectURL(url)
  }

  // [2] 필요 데이터 정의

  const {
    memberList,
    pagination,
    searchRq,
    handlePage,
    handleFilter,
    handleSearch,
    handleChangeRq,
    loading
  } = useMemberList()

  const rows = memberList

  // console.log("pagination >>>", pagination)
  const navigate = useNavigate()

  // [3] 반환 컴포넌트 구성
  return (
    <Box sx={{ display: "flex", width: "100%" }}>

      {/* 우측 콘텐츠 영역 */}
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Box sx={{
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
          maxWidth: "950px",
          mx: "auto"
        }}>
          {/* 상단 타이틀 + 등록 버튼 */}
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
            maxWidth: 750,
            mx: "auto",
          }}
          >
            <Typography Typography variant="h4" sx={{ fontWeight: 600 }}>
              회원 목록 조회
            </Typography>
          </Box>


          { /* 검색 바, PDF 다운로드 */}
          <SearchBar2
            searchRq={searchRq}
            filterOnChange={handleFilter}
            onChange={handleChangeRq}
            onSubmit={handleSearch}
            selectItems={memberFilterOptions}
          />

          <Button onClick={handleDownload}>
            PDF 다운로드
          </Button>


          {/* 회원 목록 테이블 */}
          <TableContainer component={Paper} sx={{ width: "100%", maxWidth: "950px", mx: "auto", overflowX: "auto" }}>
            <Paper elevation={0} sx={{ width: "100%", overflow: "hidden", maxWidth: "950px", mx: "auto" }}>
              <Table sx={{ tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 60 }}>ID</TableCell>
                    <TableCell sx={{ width: 140 }}>이름</TableCell>
                    <TableCell sx={{ width: 300 }}>이메일</TableCell>
                    <TableCell sx={{ width: 120 }}>활성여부</TableCell>
                    <TableCell sx={{ width: 120 }}>권한</TableCell>
                    <TableCell sx={{ width: 120 }}>소셜</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                        회원 목록이 없습니다.
                      </TableCell>
                    </TableRow>
                  )}

                  {rows?.map((m, index) =>
                    <TableRow
                      key={m.memberId}
                      hover
                      sx={{ cursor: "pointer" }}
                    /*onClick={() => navigate(`/admin/members/${m.memberId}`)*/
                    >
                      <TableCell sx={{ width: 60 }}>{index + 1}</TableCell>
                      <Tooltip
                        title={m.nickname}
                        followCursor
                      >
                        <TableCell>{maskName(m.nickname)}</TableCell>
                      </Tooltip>
                      <Tooltip
                        followCursor
                        title={m.email}
                      >
                        <TableCell>{maskEmail(m.email)}</TableCell>
                      </Tooltip>
                      <TableCell>{m.isActive ? "활성" : "비활성"}</TableCell>
                      <TableCell>{m.memberRoleValue}</TableCell>
                      <TableCell>{m.socialTypeValue}</TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
          {/* 페이지네이션 */}
          {/* 하단 페이징 */}
          {pagination && pagination.totalPage > 0 && (
            <PageBar pagination={pagination} onChange={handlePage} />
          )}
        </Box>
      </Box>
    </Box>
  )
}
