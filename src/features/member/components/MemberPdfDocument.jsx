import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import MemberPdfTable from "./MemberPdfTable";
import { Font } from "@react-pdf/renderer";
import { registerPdfFonts } from "../../../base/config/pdfFontConfig";
/**
 * 회원 목록 리스트 PDF 변환 저장
 * @author khj
 * @since 2025-12-09
 * 
 * 일반 MUI 컴포넌트가 아닌 react-pdf 전용 스타일
 */

// 폰트 설정
registerPdfFonts();

export default function MemberPdfDocument({ list }) {

  // [1] 스타일 정의
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontFamily: "NotoSansKR"
    },
    title: { fontSize: 18, marginBottom: 10, fontFamily: "NotoSansKR" },
    cell: {
      fontFamily: "NotoSansKR",
      fontSize: 10,
      padding: 6,
      borderBottomWidth: 1,
      borderRightWidth: 1
    },
    headerText: {
      fontFamily: "NotoSansKR-Bold",   // 굵기 있는 폰트
      fontSize: 11
    }
  })

  // [2] 반환
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>회원 목록</Text>
        <MemberPdfTable list={list || []} />
      </Page>
    </Document>
  )
}