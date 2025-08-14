// Not used directly, but can be used for row rendering in TransactionList if needed
export default function TransactionRow({ tx, onDelete }) {
	return (
		<tr>
			<td>{new Date(tx.date).toLocaleDateString()}</td>
			<td>{tx.desc}</td>
			<td>{tx.type}</td>
			<td>{tx.type === "expense" ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}</td>
			<td>
				<button onClick={() => onDelete(tx.id)}>&times;</button>
			</td>
		</tr>
	);
}
