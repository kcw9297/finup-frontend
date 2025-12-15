import { Fab, Zoom } from "@mui/material";
import { useNewsList } from "../hooks/useNewsList"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useGenericNews from "../hooks/useGenericNews";

export default function NewsScrollToTop({show, onClick}){
  return(
    <Zoom in={show}>
      <Fab
        size="small"
        onClick={onClick}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 2000,
          backgroundColor: "#3B5BDB",
          color: "#fff",
          "&:hover": { backgroundColor: "#3048b5" },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  )
}