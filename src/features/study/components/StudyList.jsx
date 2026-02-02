import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  List,
  Button,
  LinearProgress,
  CircularProgress,
  Pagination,
} from '@mui/material';
import StduyListBox from './StduyListBox';
import OrderBar from '../../../base/components/bar/OrderBar'
import { SORT_OPTIONS, SORT_OPTIONS_ADMIN } from '../constants/studyConstant';
import { useStudyList } from '../hooks/useStudyList';
import { useStudyProgress } from '../../../base/hooks/useStudyProgress';
import { useStudyProgressStartModal } from '../../studyprogress/hooks/useStudyProgressStartModal';
import ConfirmModal from '../../../base/components/modal/ConfirmModal';
import { navigate } from './../../../base/config/globalHookConfig';
import { useNavigate } from 'react-router-dom';
import PageBar from '../../../base/components/bar/PageBar';

/**
 * 학습 리스트 컴포넌트
 * @since 2025-12-13
 * @author kcw
 */

export default function StudyList({ admin = false }) {

  // [1] 사용 Hook
  const {
    rows, loading, order, handleOrder
  } = useStudyList()

  // 북마크 이동
  const navigate = useNavigate()

  // 학습진도 전역상태
  const { studyProgresses } = useStudyProgress()

  // 완료된 진도 개수
  const completedCount = studyProgresses.filter((progress) => progress.studyStatus === 'COMPLETED').length


  // 사용 데이터
  // const pagination = searchRp?.pagination ?? {}
  const totalCount = rows.length
  const percentage = totalCount === 0
    ? 0
    : Math.round((completedCount / totalCount) * 100)


  // 학습 메세지
  const getProcessMessage = () => {
    if (percentage === 100) return '🎉 모든 학습을 완료했습니다 🎉'
    if (percentage >= 61) return '조금만 더 힘내세요! 거의 다 왔어요!'
    if (percentage >= 21) return '좋은 페이스로 진행 중이에요!'
    if (percentage >= 1) return '좋은 시작이에요! 계속 진행해 볼까요?'
    return '아직 완료한 학습이 없습니다'
  }



  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4 }}>

      {/* 제목 섹션 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          개념 정리
        </Typography>
        <Typography variant="body2" color="text.secondary">
          처음부터 차차 기초부터 탄탄히
        </Typography>
      </Box>

      {/* 메인 콘텐츠 */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2   // 하단 마진
      }}>
        <OrderBar options={SORT_OPTIONS} selected={order} onChange={handleOrder} />
      </Box>

      {/* 메인 콘텐츠 */}
      <Box sx={{ display: 'flex', gap: 4 }}>

        {/* 좌측 목록 영역 */}
        <Box sx={{ flex: 1 }}>
          <List sx={{ p: 0 }}>
            {/* 1. 로딩 중 */}
            {loading && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 200,
                }}
              >
                <CircularProgress size={24} />
              </Box>
            )}

            {/* 2. 로딩 완료 + 데이터 없음 */}
            {!loading && rows.length === 0 && (
              <Box
                sx={{
                  py: 6,
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  아직 등록된 학습이 없습니다
                </Typography>
                <Typography variant="body2">
                  곧 새로운 학습 콘텐츠가 추가될 예정이에요 🙂
                </Typography>
              </Box>
            )}

            {loading ? (
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px'  // 또는 원하는 높이
              }}>
                <CircularProgress size={24} sx={{ color: 'white' }} />
              </Box>) :
              (rows.map(row => (<StduyListBox key={row.studyId} admin={admin} row={row} />)))
            }

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress size={20} />
              </Box>
            )}

            {/* {searchRp?.pagination?.totalPage > 0 && (
              <PageBar
                pagination={pagination}
                onChange={handlePageChange}
              />
            )} */}

            {/* 스크롤 바닥 감지용 */}
            {/* <Box ref={bottomRef} sx={{ height: 1 }} /> */}
          </List>
        </Box>

        {/* 우측 진척도 영역 */}
        <Box sx={{ width: 300 }}>
          <Box sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'line.dark',
            borderRadius: 2,
            backgroundColor: 'background.base'
          }}>
            <Typography variant="h6" color='text.main' sx={{ fontWeight: 'bold', mb: 3 }}>
              진척도
            </Typography>

            {/* 진행률 바 */}
            <Box sx={{ mb: 3 }}>
              <LinearProgress
                variant="determinate"
                value={percentage || 0}
                sx={{
                  height: 8,
                  borderRadius: 1,
                  mb: 1,
                  backgroundColor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'base.main'  // 진행된 부분 색상
                  }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="caption" color="text.main">
                  {percentage}%
                </Typography>
              </Box>
            </Box>

            {/* 총 개수 */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: 'base.main',
                textAlign: 'center',
                mb: 1
              }}
            >
              {completedCount} / {totalCount}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'base.main',
                textAlign: 'center',
                mb: 3
              }}
            >
              {getProcessMessage()}
            </Typography>

            {/* 북마크 목록 이동 버튼 */}
            <Button
              variant="contained"
              fullWidth
              disabled={admin}
              sx={{
                borderRadius: 2,
                backgroundColor: "base.main",
                '&:hover': {
                  backgroundColor: 'base.dark'
                }
              }}
              onClick={() => navigate('/mypage/bookmarks')}
            >
              북마크로 이동
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
