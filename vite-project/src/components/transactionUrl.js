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
    handleAddTransaction();
  } catch (err) {
    console.error(err);
  }
};

const deleteTransaction = async (id) => {
  const url = `https://acb-api.algoritmika.org/api/transaction/${id}`;
  try {
    const response = await fetch(url, { method: "DELETE" });
    if (!response.ok) throw new Error("Error deleting transaction");
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
    setPopUp(!popUp);
  } catch (err) {
    console.error(err);
  }
};
