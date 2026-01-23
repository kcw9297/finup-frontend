import MainLayout from "../../base/layouts/MainLayout";
import WordDetail from "../../features/word/components/WordDetail";
import WordLayout from "../../features/word/components/WordLayout";


/**
 * 단어장 단어 상세 페이지 컴포넌트
 * @author khj
 * @since 2025-12-14
 */

export default function WordDetailPage() {
  return (
    <MainLayout>
      <WordLayout>
        <WordDetail />
      </WordLayout>
    </MainLayout>
  )
}