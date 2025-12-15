import * as XLSX from "xlsx";

/**
 * JSON 배열 XLSX 파일 변환 다운로드
 */

export function downloadXlsx({ data, fileName, sheetName }) {
  // [1] 워크시트 생성
  const worksheet = XLSX.utils.json_to_sheet(data)

  // [2] 워크북 생성
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  // [3] 파일 다운로드
  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}