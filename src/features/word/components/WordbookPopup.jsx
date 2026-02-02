import { Modal, Box } from "@mui/material";
import WordBookContent from "./WordBookContent";

export default function WordbookPopup({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 800,
          margin: '120px auto',
          backgroundColor: 'background.base',
          border: 5,
          borderColor: 'base.dark',
          borderRadius: '20px',
          outline: 'none',
        }}
      >
        <WordBookContent onClose={onClose} open={open} />
      </Box>
    </Modal>
  );
}