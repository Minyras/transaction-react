/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Transaction.css";
import trash from "../../assets/svg/trash.svg";
import edit from "../../assets/svg/edit.svg";

const TransactionContainer = ({
  setTransactionToEdit,
  setAdd,
  setDeleteId,
  setPopUp,
}) => {
  const url = "https://acb-api.algoritmika.org/api/transaction";
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error fetching transactions");
      const data = await response.json();
      setTransactions(data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTransactions();
  });

  return (
    <div className="transaction-container">
      {transactions.map((item) => (
        <div key={item.id} className="card">
          <div className="information">
            <p>From: {item.from}</p>
            <p>To: {item.to}</p>
            <p>Amount: {item.amount}</p>
          </div>
          <div className="buttons">
            <button
              className="delete"
              onClick={() => {
                setPopUp(true);
                setDeleteId(item.id);
              }}
            >
              <img src={trash} alt="Delete" />
            </button>
            <button
              className="edit"
              onClick={() => {
                setTransactionToEdit(item);
                setAdd(true);
              }}
            >
              <img src={edit} alt="Edit" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionContainer;
