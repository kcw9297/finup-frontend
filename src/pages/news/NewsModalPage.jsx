import MainLayout from "../../base/layouts/MainLayout"
import NewsDetailModal from "../../features/news/components/NewsDetailModal"
/**
 * /news/list 대응 페이지 컴포넌트
 */
export default function NewsModalPage() {

    return (
      <>
        <MainLayout>
          <NewsDetailModal/>
        </MainLayout>
      </>
    )
}