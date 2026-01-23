import { pdf } from "@react-pdf/renderer";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";
import MemberPdfDocument from "../components/MemberPdfDocument";

// 불가피하게 HTML 태그 사용을 위해 JSX 확장자 사용

export function useMemberPdfExport() {
  const { showSnackbar } = useSnackbar()


  const exportMemberPdf = async () => {
    try {
      // [1] 전체 회원 조회
      const rp = await api.get("/members/list/all", {
        params: { size: 10000 },
      })

      const list = rp.data ?? []

      // [2] PDF Blob 생성
      const blob = await pdf(
        <MemberPdfDocument list={list} />
      ).toBlob()

      // [3] 다운로드 트리거
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "회원목록.pdf"
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      showSnackbar("PDF 다운로드 중 오류가 발생했습니다.", "error")
    }
  }

  return { exportMemberPdf }
}