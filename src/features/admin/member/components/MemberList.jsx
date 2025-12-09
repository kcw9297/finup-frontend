import { useNavigate } from "react-router-dom";
import { useMemberList } from "../hooks/useMemberList"
import AdminSidebar from "../../../../base/components/layout/AdminSidebar"
import {

  Box, IconButton, Paper, Table, TableHead,
  TableBody, TableRow, TableCell, Tooltip, Typography
} from "@mui/material";
import SearchBar from './../../../../base/components/bar/SearchBar';
import { useState } from "react";
import PageBar from './../../../../base/components/bar/PageBar';

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
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",

      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  // [1] 필요한 상수들

  const memberFilterOptions = [
    { value: "email", label: "이메일" },
    { value: "nickname", label: "닉네임" },
  ]


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

  const rows = memberList;

  // console.log("pagination >>>", pagination)
  const navigate = useNavigate();

  // [3] 반환 컴포넌트 구성
  return (
    <Box sx={{ display: "flex", width: "100%" }}>

      {/* 우측 콘텐츠 영역 */}
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Box sx={{ maxWidth: "980px", mx: "auto" }}>
          {/* 상단 타이틀 + 등록 버튼 */}
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              회원 목록 조회
            </Typography>
          </Box>


          { /* 검색 바 */}
          <SearchBar
            searchRq={searchRq}
            filterOnChange={handleFilter}
            onChange={handleChangeRq}
            onSubmit={handleSearch}
            selectItems={memberFilterOptions}
          />

          {/* 회원 목록 테이블 */}
          <Paper elevation={0} sx={{ width: "100%", overflow: "hidden", maxWidth: "1000px", mx: "auto" }}>
            <Table sx={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell sx={{ width: "25%" }}>이메일</TableCell>
                  <TableCell>활성여부</TableCell>
                  <TableCell>권한</TableCell>
                  <TableCell>소셜</TableCell>
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
                    <TableCell>{m.nickname}</TableCell>
                    <TableCell>{m.email}</TableCell>
                    <TableCell>{m.isActive ? "활성" : "비활성"}</TableCell>
                    <TableCell>{m.memberRoleValue}</TableCell>
                    <TableCell>{m.socialTypeValue}</TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </Paper>
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
