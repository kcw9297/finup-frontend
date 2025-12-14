import MainLayout from "../../base/layouts/MainLayout";
import WordSearch from "../../features/word/components/WordSearch";

/**
 * 단어장 검색 페이지 컴포넌트
 * @author khj
 * @since 2025-12-13
 */

export default function WordSearchPage() {
  return (
    <MainLayout>
      <WordSearch />
    </MainLayout>
  )
}