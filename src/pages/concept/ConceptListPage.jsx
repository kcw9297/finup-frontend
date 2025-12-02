import { Box } from "@mui/material";
import ConceptList from "../../features/concept/components/ConceptList";
import ProgressCard from "../../features/concept/components/ProgressCard";
import { useConceptList } from "../../features/concept/hooks/useConceptList";
import MainLayout from "../../base/layouts/MainLayout";

export default function ConceptListPage() {

  const { list } = useConceptList();

  return (
    <MainLayout>

      {/* 전체 Wrapper */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between", // 양끝 정렬
          alignItems: "flex-start",
          width: "100%",
          mt: 4,
          gap: 8,
        }}
      >
        {/* 왼쪽 리스트 영역 */}
        <Box sx={{ flex: "00 100%", mr: 4 }}>
          <ConceptList list={list} />
        </Box>

        {/* 오른쪽 진척도 영역 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end", //  오른쪽 끝으로 밀기
            flexShrink: 0,
            minWidth: 380,
          }}
        >
          <ProgressCard />
        </Box>
      </Box>

    </MainLayout>
  );
}
