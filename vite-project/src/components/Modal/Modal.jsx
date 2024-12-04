/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import deleteSvg from "../../assets/svg/delete.svg";
import "./Modal.css";

const Modal = ({
  setAdd,
  addTransaction,
  editTransaction,
  transactionToEdit,
}) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (transactionToEdit) {
      setFrom(transactionToEdit.from);
      setTo(transactionToEdit.to);
      setAmount(transactionToEdit.amount);
    } else {
      setFrom("");
      setTo("");
      setAmount("");
    }
  }, [transactionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!from || !to || !amount) {
      alert("All fields are required!");
      return;
    }

    if (transactionToEdit) {
      editTransaction(transactionToEdit.id, { from, to, amount });
    } else {
      addTransaction({ from, to, amount });
    }
  };

  return (
    <form className="modal" onSubmit={handleSubmit}>
      <img
        className="cancel"
        src={deleteSvg}
        onClick={() => setAdd(false)}
        alt="Cancel"
      />
      <input
        className="from-input"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From"
      />
      <input
        className="to-input"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
      />
      <input
        className="amount-input"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button type="submit" className="add">
        {transactionToEdit ? "Update Transaction" : "Add New Transaction"}
      </button>
    </form>
  );
};

export default Modal;
