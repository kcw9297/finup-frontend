import { View, Text, StyleSheet } from "@react-pdf/renderer";

/**
 * 회원 목록 PDF 테이블 컴포넌트
 * @author khj
 * @since 2025-12-09
 * 
 * 일반 MUI 컴포넌트가 아닌 react-pdf 전용 스타일
 */

// Enum 변환

const ROLE_LABEL = {
  ADMIN: "관리자",
  NORMAL: "일반회원"
};

const SOCIAL_LABEL = {
  NORMAL: "일반로그인",
  NAVER: "네이버",
  KAKAO: "카카오",
  GOOGLE: "구글",
  LINE: "라인"
};



export default function MemberPdfTable({ list = [] }) {

  // [1] 스타일 정의
  const styles = StyleSheet.create({
    table: {
      width: "100%",
      marginTop: 10,
      flexDirection: "column",
    },
    row: {
      flexDirection: "row",
      minHeight: 20,
    },
    header: {
      backgroundColor: "#eeeeee",
    },
    cell: {
      flexGrow: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderWidth: 1,
      padding: 6,
      fontSize: 10,
    },
    smallCell: {
      width: "15%",
      borderWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      padding: 6,
      fontSize: 10
    },
    largeCell: {
      width: "40%",
      borderRightWidth: 1,
      borderBottomWidth: 1,
      padding: 6,
      fontSize: 10,
      borderWidth: 1
    }
  })


  // [2] 반환 : 테이블 전체 구조
  return (
    <View style={styles.table} wrap={true}>
      {/* 헤더 영역 */}
      <View style={[styles.row, styles.header]}>
        <Text style={styles.smallCell}>회원번호</Text>
        <Text style={styles.smallCell}>이름</Text>
        <Text style={styles.largeCell}>이메일</Text>
        <Text style={styles.smallCell}>권한</Text>
        <Text style={styles.smallCell}>소셜</Text>
      </View>

      {/* 데이터 영역 */}
      {list.length === 0 && (
        <View style={styles.row}>
          <Text style={styles.cell}>회원 목록이 존재하지 않습니다.</Text>
        </View>
      )}

      {list.map(m => (
        <View key={m.memberId} style={styles.row}>
          <Text style={styles.smallCell}>{m.memberId}</Text>
          <Text style={styles.smallCell}>{m.nickname}</Text>
          <Text style={styles.largeCell}>{m.email}</Text>
          <Text style={styles.smallCell}>{ROLE_LABEL[m.memberRole]}</Text>
          <Text style={styles.smallCell}>{SOCIAL_LABEL[m.socialType]}</Text>
        </View>
      ))}

    </View>
  )
}