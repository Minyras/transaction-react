/* eslint-disable react/prop-types */
import { useState } from "react";
import deleteSvg from "../../assets/svg/delete.svg";
import "./Modal.css";

const Modal = ({ setAdd, addTransaction }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!from || !to || !amount) {
      alert("All fields are required!");
      return;
    }
    addTransaction({ from, to, amount });
    setAdd(false);
  };

  return (
    <form className="modal" onSubmit={handleAdd}>
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
        Add New Transaction
      </button>
    </form>
  );
};

export default Modal;
