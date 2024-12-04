/* eslint-disable react/prop-types */
import "./PopUp.css";
import deleteSvg from "../../assets/svg/delete.svg";
import checkSvg from "../../assets/svg/check.svg";

const PopUp = ({ confirmDelete, cancelDelete }) => {
  return (
    <div className="pop-up">
      <p>Are you sure you want to delete this transaction?</p>
      <div className="buttons">
        <img
          className="x"
          src={deleteSvg}
          onClick={cancelDelete}
          alt="Cancel"
        />
        <img
          className="check"
          src={checkSvg}
          onClick={confirmDelete}
          alt="Confirm"
        />
      </div>
    </div>
  );
};

export default PopUp;
