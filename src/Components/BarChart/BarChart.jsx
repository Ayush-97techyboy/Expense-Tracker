import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CATEGORY_COLORS = {
  Food: "#A259FF",
  Entertainment: "#F4BB4A",
  Travel: "#FFB443",
  Other: "#43E6FC",
};

function getCategory(tx) {
  const desc = tx.desc?.toLowerCase() || "";
  if (desc.includes("food")) return "Food";
  if (desc.includes("entertainment")) return "Entertainment";
  if (desc.includes("travel")) return "Travel";
  return "Other";
}

export default function BarChart({ transactions = [] }) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const byCategory = {};
  expenses.forEach((tx) => {
    const cat = getCategory(tx);
    byCategory[cat] = (byCategory[cat] || 0) + tx.amount;
  });
  const categories = ["Food", "Entertainment", "Travel", "Other"];
  const max = Math.max(...Object.values(byCategory), 1);

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      {categories.map((cat) => (
        <Box key={cat} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography variant="body2" sx={{ minWidth: 90, color: "#222" }}>
            {cat}-
          </Typography>
          <Box
            sx={{
              flex: 1,
              height: 16,
              background: "#eee",
              borderRadius: 2,
              position: "relative",
              mr: 1,
            }}
          >
            <Box
              sx={{
                width: `${((byCategory[cat] || 0) / max) * 100}%`,
                height: "100%",
                background: CATEGORY_COLORS[cat],
                borderRadius: 2,
              }}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{ color: CATEGORY_COLORS[cat], fontWeight: 700 }}
          >
            {byCategory[cat] ? `₹${byCategory[cat].toLocaleString()}` : ""}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
