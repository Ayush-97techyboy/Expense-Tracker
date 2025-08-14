import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomModal({ open, onClose, children }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
      keepMounted
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#1a1717ff",
          borderRadius: 3,
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
          width: { xs: "95vw", sm: 400 },
          maxWidth: "98vw",
          maxHeight: "90vh",
          overflowY: "auto",
          outline: "none",
          boxSizing: "border-box",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box id="modal-content" sx={{ mt: 3 }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
}
