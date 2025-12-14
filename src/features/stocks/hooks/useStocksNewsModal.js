import { useNewsModal } from "../../news/hooks/useNewsModal";
import { useStocksNewsAi } from "./useStocksNewsAi";
export function useStocksNewsModal() {
  const { open, openModal, closeModal, article, setArticle } = useNewsModal();
  const { fetchAi, loading } = useStocksNewsAi();

  const openWithAi = async (item) => {
    openModal({
      ...item,
      summary: item.summary ?? { summary: "", keywords: [] },
    });
    if (!item?.summary && item.link) {
      try {
        const ai = await fetchAi(item);
        if (ai) {
          setArticle((prev) => ({
            ...prev,
            summary: ai,
          }));
        }
      } catch (e) {
        console.error("Stock AI failed", e);
      }
    }
  };
  return {
    open,
    article,
    openWithAi,
    closeModal,
    loading,
  };
}
