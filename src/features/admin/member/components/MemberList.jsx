import { useNavigate } from "react-router-dom";
import { useMemberList } from "../hooks/useMemberList"
import {

  Box, IconButton, Paper, Table, TableHead, Button,
  TableBody, TableRow, TableCell, Tooltip, Typography
} from "@mui/material";
import PageBar from './../../../../base/components/bar/PageBar';
import SearchBar2 from "../../../../base/components/bar/SearchBar2";
import { TableContainer } from "@mui/material";
import { maskEmail, maskName } from "../../../../base/utils/mask";
import theme from "../../../../base/design/thema";
import { downloadXlsx } from "../../../../base/utils/downloadXlsx";
import { useMemberPdfExport } from "../hooks/useMemberPdfExport";
import { useMemberExport } from "../hooks/useMemberExport";


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

  const { exportMemberPdf } = useMemberPdfExport();
  const { fetchAllMembers } = useMemberExport();


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

  // [3] 엑셀 다운로드용 함수
  const handleXlsxDownload = async () => {
    const members = await fetchAllMembers(searchRq);

    const xlsxData = members.map(m => ({
      "회원 ID": m.memberId,
      "이메일": m.email,
      "닉네임": m.nickname,
      "권한": m.memberRoleValue,
      "활성여부": m.isActive ? "활성" : "비활성",
      "소셜": m.socialTypeValue,
    }));

    downloadXlsx({
      data: xlsxData,
      fileName: "회원 목록",
      sheetName: "Members",
    });
  };



  // console.log("pagination >>>", pagination)
  const navigate = useNavigate()



  // [4] 반환 컴포넌트 구성
  return (
    <Box sx={{ display: "flex", width: "100%" }}>

      {/* 우측 콘텐츠 영역 */}
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Box sx={{
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
          maxWidth: '950px',
          mx: 'auto'
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



          {/* 회원 목록 테이블 */}
          <TableContainer component={Paper} sx={{ width: "100%", maxWidth: "950px", mx: "auto", overflowX: "auto", mt: 3 }}>
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

          {/* 하단 */}
          {/* 중앙: 페이징 바 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1,
              mt: 3,
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)'
              }}>
              {pagination && pagination.totalPage > 0 && (
                <PageBar pagination={pagination} onChange={handlePage} />
              )}
            </Box>
            {/* 오른쪽: 다운로드 버튼들 */}
            <Box
              sx={{
                marginLeft: 'auto',
                display: 'flex',
                gap: 1,
              }}
            >
              <Button
                onClick={exportMemberPdf}
                variant="outlined"
                size="small"
                sx={{
                  mt: 3,
                  fontWeight: 600,
                  borderRadius: '10px',
                  px: 2,
                  height: 36,
                  color: theme.palette.base.main,
                  borderColor: 'primary.main',
                  '&:hover': {
                    bgcolor: theme.palette.background.light,
                    borderColor: 'primary.main',
                  },
                }}
              >
                PDF 다운로드
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  mt: 3,
                  fontWeight: 600,
                  borderRadius: '10px',
                  px: 2,
                  height: 36,
                  color: '#15803D',
                  borderColor: '#15803D',
                  '&:hover': {
                    bgcolor: 'rgba(21, 128, 61, 0.08)',
                    borderColor: '#15803D',
                  },
                }}
                onClick={handleXlsxDownload}
              >엑셀(xlsx) 다운로드</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
