import MainLayout from "../../base/layouts/MainLayout"
import NewsList from "../../features/news/components/NewsList"
/**
 * /news/list 대응 페이지 컴포넌트
 */
export default function NewsPage() {

    return (
      <>
        <MainLayout>
          <NewsList/>
        </MainLayout>
      </>
    )
}