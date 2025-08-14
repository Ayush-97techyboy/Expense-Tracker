import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const categories = [
  { value: "Food", label: "Food" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Travel", label: "Travel" },
  { value: "Other", label: "Other" },
];

export default function AddExpense({
  onAdd,
  onCancel,
  initial = {},
  editing = false,
}) {
  const [title, setTitle] = useState(initial.desc || "");
  const [price, setPrice] = useState(initial.amount || "");
  const [category, setCategory] = useState(initial.category || "");
  const [date, setDate] = useState(initial.date || "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !price || !category || !date) return;
    onAdd({
      id: editing && initial.id ? initial.id : Date.now(),
      desc: title,
      amount: Number(price),
      category,
      type: "expense",
      date,
    });
    // Reset fields
    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
    // Close modal
    if (onCancel) onCancel();
  }

  return (
    <Box
      sx={{
        borderRadius: 4,
        p: { xs: 2, sm: 3 },
        width: { xs: "100vw", sm: 400 },
        maxWidth: "98vw",
        boxShadow: 3,
        background: "#fff",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Add Expenses
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <TextField
          fullWidth
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            background: "#f8f8f8",
            borderRadius: 2,
            boxShadow: 1,
            input: { fontWeight: 500 },
          }}
        />
        <TextField
          fullWidth
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{
            background: "#f8f8f8",
            borderRadius: 2,
            boxShadow: 1,
            input: { fontWeight: 500 },
          }}
        />
        <TextField
          select
          fullWidth
          placeholder="Select category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{
            background: "#f8f8f8",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{
            background: "#f8f8f8",
            borderRadius: 2,
            boxShadow: 1,
            input: { fontWeight: 500 },
          }}
          InputLabelProps={{ shrink: true }}
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
            width: "100%",
            mb: 1,
            "&:hover": { background: "#FFD580" },
          }}
        >
          {editing ? "Update" : "Add Expense"}
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
            width: "100%",
          }}
        >
          Cancel
        </Button> */}
      </Box>
    </Box>
  );
}
