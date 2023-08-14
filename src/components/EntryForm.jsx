import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeInput, populateData } from "../redux/actions";
import { useState } from "react";

const EntryForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const { total_slots } = useSelector((state) => ({
    total_slots: state.total_slots,
  }));

  const handleTotalSlotsChange = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
    dispatch(changeInput("total_slots", value));
  };

  const submitHandler = () => {
    let er = "";
    if (total_slots !== "") {
      if (!isNaN(total_slots)) {
        dispatch(populateData());
      } else {
        er = "Enter correct value for total slots";
      }
    } else {
      er = "Enter total number of parking slots";
    }

    setError(er);
  };

  return (
    <div className="EntryForm card">
      <div className="card-body">
        <div className="row">
          <div>
            <span>Total Parking Slots </span>
            <input
              type="number"
              name="total_slots"
              value={total_slots}
              onChange={handleTotalSlotsChange}
            />
          </div>
          <button style={{backgroundColor: "#0d6efd"}} onClick={submitHandler}>Generate</button>
        </div>
        <div className="error">{error}</div>
      </div>
    </div>
  );
};

export default EntryForm;
