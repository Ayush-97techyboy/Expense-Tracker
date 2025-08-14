import { useState, useEffect } from "react";
import AddExpense from "../Components/Add Expenses/Add Expense";
import AddBalance from "../Components/AddBalance/AddBalance";
import TransactionList from "../Components/TransactionList/TransactionList";
import PieChart from "../Components/PieChart/PieChart";
import BarChart from "../Components/BarChart/BarChart";
import Modal from "../Components/Modals/Modals";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTx, setEditTx] = useState(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("transactions"));
    if (localData) setTransactions(localData);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  function handleAdd(tx) {
    setTransactions([tx, ...transactions]);
    setShowModal(false);
  }

  function handleDelete(id) {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  }

  function handleEditSave(updatedTx) {
    setTransactions(
      transactions.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx))
    );
    setEditTx(null);
  }

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);
  const balance = totalIncome - totalExpense;

  const theme = useTheme();

  return (
    <Box
      sx={{
        // maxWidth: 1100,
        margin: "0 auto",
        p: { xs: 1, sm: 3 },
        background: "#222", // dark background
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#fff",
          fontWeight: 700,
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: "1.5rem", sm: "2.125rem" },
        }}
      >
        Expense Tracker
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Card
          sx={{
            flex: 1,
            background: "#333",
            boxShadow: 3,
            p: 2,
            mb: { xs: 2, sm: 0 },
            minWidth: 0,
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
              Wallet Balance:{" "}
              <span style={{ color: "#B5DC52" }}>
                ₹{balance.toLocaleString()}
              </span>
            </Typography>
            <Modal
              open={showModal === "income"}
              onClose={() => setShowModal(false)}
            >
              <AddBalance
                onAdd={(tx) => {
                  handleAdd(tx);
                  setShowModal(false);
                }}
              />
            </Modal>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #B5DC52, #89E148)",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 2,
                mt: 1,
                width: { xs: "100%", sm: "auto" },
              }}
              onClick={() => setShowModal("income")}
            >
              + Add Income
            </Button>
          </CardContent>
        </Card>
        <Card
          sx={{
            flex: 1,
            background: "#333",
            boxShadow: 3,
            p: 2,
            mb: { xs: 2, sm: 0 },
            minWidth: 0,
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
              Expenses:{" "}
              <span style={{ color: "#F4BB4A" }}>
                ₹{totalExpense.toLocaleString()}
              </span>
            </Typography>
            <Modal
              open={showModal === "expense"}
              onClose={() => setShowModal(false)}
            >
              <AddExpense
                onAdd={(tx) => {
                  handleAdd(tx);
                  setShowModal(false);
                }}
              />
            </Modal>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #F857A6, #FF5858)",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 2,
                mt: 1,
                width: { xs: "100%", sm: "auto" },
              }}
              onClick={() => setShowModal("expense")}
            >
              + Add Expense
            </Button>
          </CardContent>
        </Card>
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            background: "#333",
            borderRadius: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: { xs: 2, sm: 0 },
          }}
        >
          <PieChart transactions={transactions} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
        }}
      >
        <Box
          sx={{
            flex: 2,
            background: "#222",
            borderRadius: 2,
            p: 2,
            mb: { xs: 2, sm: 0 },
            minWidth: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#fff", fontStyle: "italic", mb: 1 }}
          >
            Recent Transactions
          </Typography>
          <TransactionList
            transactions={transactions}
            onDelete={handleDelete}
            onEdit={setEditTx}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            background: "#fff", // light background for Top Expenses
            borderRadius: 2,
            p: 2,
            minWidth: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#110d0dff", fontStyle: "italic", mb: 1 }}
          >
            Top Expenses
          </Typography>
          <BarChart transactions={transactions} />
        </Box>
      </Box>
      <Modal open={!!editTx} onClose={() => setEditTx(null)}>
        {editTx && editTx.type === "expense" ? (
          <AddExpense
            onAdd={handleEditSave}
            onCancel={() => setEditTx(null)}
            initial={editTx}
            editing
          />
        ) : editTx ? (
          <AddBalance
            onAdd={handleEditSave}
            onCancel={() => setEditTx(null)}
            initialAmount={editTx.amount}
            editing
          />
        ) : null}
      </Modal>
    </Box>
  );
}
