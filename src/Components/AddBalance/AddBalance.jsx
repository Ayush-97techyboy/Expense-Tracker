import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AddBalance({
  onAdd,
  onCancel,
  initialAmount = "",
  editing = false,
}) {
  const [amount, setAmount] = useState(initialAmount);

  function handleSubmit(e) {
    e.preventDefault();
    if (!amount) return;
    onAdd({
      id: Date.now(),
      desc: "Income",
      amount: Number(amount),
      type: "income",
      date: new Date().toISOString().slice(0, 10),
    });
    setAmount("");
  }

  return (
    <Box
      sx={{
        background: "rgba(255,255,255,0.95)",
        borderRadius: 4,
        p: { xs: 2, sm: 3 },
        minWidth: { xs: "90vw", sm: 350 },
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Add Balance
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          width: "100%",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          placeholder="Income Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          sx={{
            background: "#fff",
            borderRadius: 2,
            boxShadow: 1,
            input: { fontWeight: 500 },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            background: "#FFC34A",
            color: "#222",
            fontWeight: 700,
            borderRadius: 2,
            boxShadow: 1,
            px: 3,
            width: { xs: "100%", sm: "auto" },
            mt: { xs: 2, sm: 0 },
          }}
        >
          {editing ? "Update" : "Add Balance"}
        </Button>
        {/* <Button
          variant="outlined"
          onClick={onCancel}
          sx={{
            background: "#f5f5f5",
            color: "#222",
            fontWeight: 700,
            borderRadius: 2,
            boxShadow: 1,
            px: 3,
            width: { xs: "100%", sm: "auto" },
            mt: { xs: 2, sm: 0 },
          }}
        >
          Cancel
        </Button> */}
      </Box>
    </Box>
  );
}
