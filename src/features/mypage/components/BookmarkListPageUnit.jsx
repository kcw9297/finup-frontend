import { useEffect } from "react";
import { useBookmark } from "../../../base/hooks/useBookmark";
import BookmarkList from "./BookmarkList";

export default function BookmarkListPageUnit() {

  const {
    bookmarks,
    loading,
    loadBookmark,
    removeBookmark,
  } = useBookmark();

  useEffect(() => {
    loadBookmark();
  }, []);

  return (
    <BookmarkList
      list={bookmarks}
      loading={loading}
      onRemove={removeBookmark}
    />
  );
}
