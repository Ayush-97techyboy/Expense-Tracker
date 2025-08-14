// Pie chart with legend for expense categories, styled to match the provided UI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const COLORS = [
  "#A259FF",
  "#F4BB4A",
  "#FF5858",
  "#43E6FC",
  "#B5DC52",
  "#FFB443",
];
const CATEGORY_COLORS = {
  Food: "#A259FF",
  Entertainment: "#F4BB4A",
  Travel: "#FFB443",
  Other: "#43E6FC",
};

function getCategory(tx) {
  // Simple category extraction from description
  const desc = tx.desc?.toLowerCase() || "";
  if (desc.includes("food")) return "Food";
  if (desc.includes("entertainment")) return "Entertainment";
  if (desc.includes("travel")) return "Travel";
  return "Other";
}

export default function PieChart({ transactions = [] }) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const total = expenses.reduce((a, b) => a + b.amount, 0);
  const byCategory = {};
  expenses.forEach((tx) => {
    const cat = getCategory(tx);
    byCategory[cat] = (byCategory[cat] || 0) + tx.amount;
  });
  const categories = Object.keys(byCategory);
  // Pie chart math
  let startAngle = 0;
  const radius = 60;
  const center = 70;
  const pieSlices = categories.map((cat, i) => {
    const value = byCategory[cat];
    const percent = value / total;
    const angle = percent * 360;
    const endAngle = startAngle + angle;
    // SVG arc math
    const largeArc = angle > 180 ? 1 : 0;
    const x1 = center + radius * Math.cos((Math.PI * startAngle) / 180);
    const y1 = center + radius * Math.sin((Math.PI * startAngle) / 180);
    const x2 = center + radius * Math.cos((Math.PI * endAngle) / 180);
    const y2 = center + radius * Math.sin((Math.PI * endAngle) / 180);
    const d = `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;
    const slice = (
      <path
        key={cat}
        d={d}
        fill={CATEGORY_COLORS[cat] || COLORS[i % COLORS.length]}
        stroke="#fff"
        strokeWidth={2}
      />
    );
    startAngle += angle;
    return slice;
  });

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <svg width={140} height={140}>
        <g>{pieSlices}</g>
        {/* Center label */}
        <text
          x={70}
          y={75}
          textAnchor="middle"
          fontSize={18}
          fill="#fff"
          fontWeight={700}
        >
          {total ? "100%" : "0%"}
        </text>
      </svg>
      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
        {categories.map((cat, i) => (
          <Box key={cat} sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <Box
              sx={{
                width: 14,
                height: 14,
                background: CATEGORY_COLORS[cat] || COLORS[i % COLORS.length],
                borderRadius: "50%",
                mr: 0.5,
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: CATEGORY_COLORS[cat] || COLORS[i % COLORS.length] }}
            >
              {cat}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
