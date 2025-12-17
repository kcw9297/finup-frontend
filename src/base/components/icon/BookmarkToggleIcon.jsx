import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useBookmark } from '../../hooks/useBookmark';

/**
 * 북마크 아이콘 컴포넌트
 * @param target 현재 북마크 대상 객체 (targetId, bookmarkTarget)
 * @since 2025-12-14
 * @author kcw
 */

export default function BookmarkToggleIcon({ target }) {

  // [1] 북마크 상태
  const {
    loading, bookmarks,
    addBookmark, removeBookmark
  } = useBookmark()

  // [2] 필요 함수 선언
  // 북마크 상태
  const isBookmarked = bookmarks.some(bookmark =>
    Number(bookmark.targetId) === Number(target.targetId) &&
    bookmark.bookmarkTarget === target.bookmarkTarget
  )

  // 북마크 토글 함수
  const handleToggle = () => {
    if (isBookmarked) removeBookmark(target)
    else addBookmark(target)
  }

  // [3] 컴포넌트 반환
  return (
    <Tooltip title="북마크">
      <IconButton
        onClick={handleToggle}
        disabled={loading}
        sx={{
          padding: '1px',
          color: isBookmarked ? 'base.main' : 'grey.400',
        }}
      >
        {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </Tooltip>
  );
}