import { useState } from "react";

export function useNewsModal() {
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);

  const openModal = (basicInfo) => {
    setArticle(basicInfo);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setArticle(null);
    setLoading(false);
  };

  return {
    open,
    openModal,
    closeModal,
    article,
    setArticle,
    loading: false,
  };
}
