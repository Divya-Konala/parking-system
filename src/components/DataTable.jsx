import { useDispatch, useSelector } from "react-redux";
import { clearSlot, updateFilter } from "../redux/actions";
import { useEffect, useState } from "react";

const DataTable = () => {
  const dispatch = useDispatch();
  const { vehicles, regfilter, colorfilter, slotfilter, vehicleTypefilter } =
    useSelector((state) => ({
      vehicles: state.vehicles,
      regfilter: state.regfilter,
      colorfilter: state.colorfilter,
      slotfilter: state.slotfilter,
      vehicleTypefilter: state.vehicleTypefilter,
    }));
  const [vehiclesState, setVehiclesState] = useState(
    useSelector((state) => state.vehicles)
  );
  const handleExit = (slot, registration) => {
    dispatch(clearSlot(slot, registration));
  };
  const handleFilter = (e) => {
    const { name, value } = e.target;
    if (name === "slotfilter") {
      let n = value === "" ? "" : parseInt(e.target.value, 10);
      dispatch(updateFilter(name, value));
      if (n === "") setVehiclesState(vehicles);
      else
        setVehiclesState(vehicles.filter((vehicle) => vehicle.slot.slot === n));
    } else {
      dispatch(updateFilter(name, value.toUpperCase()));
      if (name === "regfilter") {
        setVehiclesState(
          vehicles.filter((vehicle) =>
            vehicle.registration.includes(value.toUpperCase())
          )
        );
      } else if (name === "colorfilter") {
        setVehiclesState(
          vehicles.filter((vehicle) =>
            vehicle.color.includes(value.toUpperCase())
          )
        );
      } else if (name === "vehicleTypefilter") {
        setVehiclesState(
          vehicles.filter((vehicle) =>
            vehicle.vehicleType.includes(value.toLowerCase())
          )
        );
      }
    }
  };
  useEffect(() => {
    setVehiclesState(vehicles);
  }, [vehicles]);
  if (vehicles.length === 0) {
    return (
      <div style={{ padding: "60px" }}>
        <h2>NO PARKING</h2>
      </div>
    );
  }
  return (
    <div className="DataTable">
      <div className="table-header data-table-row">
        <div>Registration Number</div>
        <div>Vehicle Type</div>
        <div>Colour</div>
        <div>Slot</div>
        <div> </div>
      </div>
      <hr />
      <div className=" filters data-table-row">
        <div>
          <input
            type="text"
            name="regfilter"
            value={regfilter}
            onChange={(e) => handleFilter(e)}
          />
        </div>
        <div>
          <input
            type="text"
            name="vehicleTypefilter"
            value={vehicleTypefilter}
            onChange={(e) => handleFilter(e)}
          />
        </div>
        <div>
          <input
            type="text"
            name="colorfilter"
            value={colorfilter}
            onChange={(e) => handleFilter(e)}
          />
        </div>
        <div>
          <input
            type="number"
            name="slotfilter"
            value={slotfilter}
            onChange={(e) => handleFilter(e)}
          />
        </div>
        <div></div>
      </div>
      <div className="table">
        {vehiclesState.map((vehicle, index) => {
          return (
            <div key={index} className="table-row data-table-row">
              <div>{vehicle.registration}</div>
              <div>{vehicle.vehicleType}</div>
              <div>{vehicle.color}</div>
              <div>{vehicle.slot.slot}</div>
              <div>
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => handleExit(vehicle.slot, vehicle.registration)}
                >
                  Exit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataTable;
