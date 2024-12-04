import { useState } from "react";
import TransactionContainer from "./TransactionContainer/TransactionContainer";
import Modal from "./Modal/Modal";
import PopUp from "./PopUp/PopUp";

const Transaction = () => {
  const [add, setAdd] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

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
    if (!deleteId) return;
    const url = `https://acb-api.algoritmika.org/api/transaction/${deleteId}`;
    try {
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) throw new Error("Error deleting transaction");
      setPopUp(false);
      setDeleteId(null);
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
      setAdd(false);
      setTransactionToEdit(null);
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
        setTransactionToEdit={setTransactionToEdit}
        setAdd={setAdd}
        setPopUp={setPopUp}
        setDeleteId={setDeleteId}
      />
      {add && (
        <Modal
          setAdd={setAdd}
          addTransaction={addTransaction}
          editTransaction={editTransaction}
          transactionToEdit={transactionToEdit}
        />
      )}
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
