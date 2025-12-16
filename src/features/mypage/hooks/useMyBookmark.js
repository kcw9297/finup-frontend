import { useMemo } from "react";
import { useBookmark } from "../../../base/hooks/useBookmark";
import { filter } from 'd3';

export function useMyBookmark() {
  const { bookmarks, loadBookmark, removeBookmark } = useBookmark()


  return {
    removeBookmark,
  }
}