import MainLayout from "../../base/layouts/MainLayout";
import WordHome from './../../features/word/components/WordHome';
import WordLayout from "../../features/word/components/WordLayout";


/**
 * 단어장 홈 페이지 컴포넌트
 * @author khj
 * @since 2025-12-13
 */

export default function WordVocaPage() {
  return (
    <MainLayout>
      <WordLayout>
        <WordHome />
      </WordLayout>
    </MainLayout>
  )
}