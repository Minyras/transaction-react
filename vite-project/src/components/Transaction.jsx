import { useState } from "react";
import TransactionContainer from "./TransactionContainer/TransactionContainer";
import Modal from "./Modal/Modal";
import PopUp from "./PopUp/PopUp";

const Transaction = () => {
  const [add, setAdd] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const addTransaction = async (newTransaction) => {
    const url = "https://acb-api.algoritmika.org/api/transaction";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });
      if (!response.ok) throw new Error("Error adding transaction");
      setAdd(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTransaction = async () => {
    const url = `https://acb-api.algoritmika.org/api/transaction/${transactionToDelete}`;
    try {
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) throw new Error("Error deleting transaction");
      setPopUp(true);
      setTransactionToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  const editTransaction = async (id, updatedTransaction) => {
    const url = `https://acb-api.algoritmika.org/api/transaction/${id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTransaction),
      });
      if (!response.ok) throw new Error("Error editing transaction");
      setAdd(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <button onClick={() => setAdd(true)} className="add-transaction">
        Add Transaction
      </button>
      <TransactionContainer
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
        setPopUp={setPopUp}
        setTransactionToDelete={setTransactionToDelete}
        setAdd={setAdd}
      />
      {add && <Modal setAdd={setAdd} addTransaction={addTransaction} />}
      {popUp && (
        <PopUp
          confirmDelete={deleteTransaction}
          cancelDelete={() => setPopUp(false)}
        />
      )}
    </div>
  );
};

export default Transaction;
