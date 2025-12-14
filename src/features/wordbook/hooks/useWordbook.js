import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

/**
 * 내 단어장 상태 및 API 관리 훅(api 여러개라 성공/실패/콜백 별도 분리)
 * @author khj
 * @since 2025-12-14
 */

export function useWordbook(open) {
  // [1] 상태
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { showSnackbar } = useSnackbar();

  // [2] 단어장 조회
  const fetchWordbook = () => {
    setLoading(true);

    api.get("/members/wordbook", {
      onSuccess: rp => {
        setList(rp.data);
      },
      onError: () => {
        showSnackbar("단어장을 불러오지 못했습니다.", "error");
      },
      onFinally: () => {
        setLoading(false);
      }
    });
  };

  // [3] 단어장 삭제 (Optimistic Update)
  const removeWord = wordId => {
    // [3-1] UI 즉시 반영
    setList(prev => prev.filter(w => w.wordId !== wordId));

    api.delete("/members/wordbook", {
      onError: () => {
        showSnackbar("삭제에 실패했습니다.", "error");
        // 실패 시 복구
        fetchWordbook();
      }
    }, { wordId });
  };

  // [4] 모달 열릴 때 자동 조회
  useEffect(() => {
    if (open) fetchWordbook();
  }, [open]);

  // [5] 반환
  return {
    list,
    loading,
    removeWord,
    refresh: fetchWordbook
  };
}