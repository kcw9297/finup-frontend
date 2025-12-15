import { useState } from "react";

export function useNewsModal() {
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);

  const openModal = (basicInfo) => {
    //  if (!sessionStorage.getItem("jwt")) {
    //   alert("로그인이 필요한 기능입니다.");
    //   navigate("/login");
    //   return;
    // }
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
