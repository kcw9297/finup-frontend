import BookmarkCard from "./BookmarkCard";
import BookmarkEmpty from "./BookmarkEmpty";

export default function MypageBookmarkList({ items, onRemove }) {

  if (!items || items.length === 0) {
    return <BookmarkEmpty />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map(item => (
        <BookmarkCard
          key={item.studyId}
          item={item}
          onRemove={onRemove}
        />
      ))}
    </Box>
  );
}
