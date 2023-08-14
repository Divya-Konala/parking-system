import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addNew } from "../redux/actions";

const AddForm = () => {
  const dispatch = useDispatch();

  const [regis, setRegis] = useState("");
  const [colour, setColour] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [error, setError] = useState("");

  const { total_slots, available, filled, duplicate_err } = useSelector(
    (state) => ({
      total_slots: state.total_slots,
      available: state.available_slots.length,
      filled: state.filled,
      duplicate_err: state.dup_err,
    })
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "regis") {
      setRegis(value.toUpperCase());
    } else if (name === "colour") {
      setColour(value.toUpperCase());
    } else if (name === "vehicle_type") {
      setVehicleType(e.target.id);
    }
  };

  const handleSubmit = () => {
    let er = "";
    if (regis.match(/^[A-Z]{2}-\d{2}-[A-Z]{2}-[1-9]\d{3}$/)) {
      if (colour.match(/[A-Za-z]+/)) {
        if (vehicleType !== "") {
          if (
            total_slots - filled >= 1 ||
            (total_slots - filled === 0.5 && vehicleType === "bike")
          ) {
            dispatch(addNew(regis, colour, vehicleType));
            setRegis("");
            setColour("");
            setVehicleType("");
          } else {
            er = "space not enough to accomodate new vehicle";
          }
        } else {
          er = "Please select vehicle type";
        }
      } else {
        er = "Enter correct colour value";
      }
    } else {
      er = "Enter registration number in correct format - AB-12-XY-1234";
    }

    setError(er);
  };

  if (available === 0) {
    return "";
  }

  return (
    <div className="AddForm card">
      <div className="card-body">
        <div>
          <div style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            Available space: {total_slots - filled}
          </div>
          <div className="error">{error}</div>
          <div className="error">
            {error === "" && duplicate_err
              ? "This Registration number already exist. Please enter correct number."
              : ""}
          </div>
          <div className="row">
            <div>
              <span className="col-6">Registration No </span>
              <input
                type="text"
                name="regis"
                placeholder="AB-12-XY-1234"
                value={regis}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Colour </span>
              <input
                type="text"
                name="colour"
                value={colour}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Vehicle Type </span>
              <input
                type="radio"
                name="vehicle_type"
                id="car"
                checked={vehicleType === "car"}
                onChange={handleChange}
              />
              <span>Car </span>
              <input
                type="radio"
                name="vehicle_type"
                id="bike"
                checked={vehicleType === "bike"}
                onChange={handleChange}
              />
              <span>Bike </span>
            </div>
            <div>
              <button
                style={{ backgroundColor: "#28a745" }}
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
