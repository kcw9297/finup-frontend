import { Modal, Box } from "@mui/material";
import WordBookContent from "./WordBookContent";

export default function WordbookPopup({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          maxHeight: "85vh",
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          p: 3,
          overflowY: "auto",
        }}
      >
        <WordBookContent />
      </Box>
    </Modal>
  );
}
