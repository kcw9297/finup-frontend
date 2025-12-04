import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

export default function ConfirmDialog({ open, title, content, onConfirm, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText
          sx={{
            fontSize: "0.95rem",    // 15px
            color: "text.secondary",
            whiteSpace: "pre-line",
          }}>{content}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 2.2,
            py: 0.8,

          }}
        >취소</Button>
        <Button onClick={onConfirm} color="error" variant="contained" sx={{
          borderRadius: 2,
          textTransform: "none",
          px: 2.2,
          py: 0.8,
        }}>
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}