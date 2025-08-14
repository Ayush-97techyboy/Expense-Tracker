import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import FlightIcon from "@mui/icons-material/Flight";
import CategoryIcon from "@mui/icons-material/Category";

function getCategory(tx) {
  const desc = tx.desc?.toLowerCase() || "";
  if (desc.includes("food")) return "Food";
  if (desc.includes("entertainment")) return "Entertainment";
  if (desc.includes("travel")) return "Travel";
  return "Other";
}
function getIcon(cat) {
  if (cat === "Food") return <FastfoodIcon sx={{ color: "#A259FF" }} />;
  if (cat === "Entertainment")
    return <LocalMoviesIcon sx={{ color: "#F4BB4A" }} />;
  if (cat === "Travel") return <FlightIcon sx={{ color: "#FFB443" }} />;
  return <CategoryIcon sx={{ color: "#43E6FC" }} />;
}
export default function TransactionList({ transactions, onDelete }) {
  if (!transactions.length)
    return (
      <Typography sx={{ color: "#bbb", fontStyle: "italic", p: 2 }}>
        No transactions yet.
      </Typography>
    );
  return (
    <Box>
      {transactions.map((tx) => {
        const cat = getCategory(tx);
        return (
          <Paper
            key={tx.id}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              mb: 2,
              borderRadius: 3,
              boxShadow: 2,
            }}
          >
            <Box sx={{ mr: 2 }}>{getIcon(cat)}</Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>{tx.desc}</Typography>
              <Typography variant="caption" sx={{ color: "#888" }}>
                {new Date(tx.date).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: tx.type === "expense" ? "#F4BB4A" : "#B5DC52",
                fontWeight: 700,
                minWidth: 80,
                textAlign: "right",
              }}
            >
              ₹{Math.abs(tx.amount).toLocaleString()}
            </Typography>
            <IconButton aria-label="edit" size="small" sx={{ ml: 1 }} disabled>
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              sx={{ ml: 1 }}
              onClick={() => onDelete(tx.id)}
            >
              <DeleteIcon sx={{ color: "#FF5858" }} />
            </IconButton>
          </Paper>
        );
      })}
    </Box>
  );
}
