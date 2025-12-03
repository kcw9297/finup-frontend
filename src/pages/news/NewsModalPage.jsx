import MainLayout from "../../base/layouts/MainLayout"
import NewsModal from "../../features/news/components/NewsModal"
/**
 * /news/list 대응 페이지 컴포넌트
 */
export default function NewsModalPage() {

    return (
      <>
        <MainLayout>
          <NewsModal/>
        </MainLayout>
      </>
    )
}