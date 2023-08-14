import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import bikeImg from "../images/bike.png";
import carImg from "../images/car.png";

const VisualRepresentation = () => {
  const { total_slots, vehicles } = useSelector((state) => ({
    total_slots: state.total_slots,
    vehicles: state.vehicles,
  }));

  const [slots, setSlots] = useState([]);

  function updateSlotsWithParkedVehicles(parkedVehicles) {
    const updatedSlots = [...Array(total_slots).keys()].map((key) => ({
      key: key + 1,
    }));

    parkedVehicles.forEach((vehicle) => {
      const slotIndex = vehicle.slot.slot - 1; // SlotId is 1-based, while array indices are 0-based

      if (slotIndex >= 0 && slotIndex < updatedSlots.length) {
        const slot = updatedSlots[slotIndex];
        if (!slot.vehicles) {
          slot.vehicles = []; // Initialize the vehicles array if it doesn't exist
        }

        const existingVehicle = slot.vehicles.find(
          (v) => v.vehicleType === vehicle.vehicleType
        );

        if (existingVehicle) {
          existingVehicle.count += 1; // Increment the count if the vehicle type already exists
        } else {
          slot.vehicles.push({ vehicleType: vehicle.vehicleType, count: 1 }); // Add a new vehicle type
        }
      }
    });
    setSlots(updatedSlots);
  }

  useEffect(() => {
    if (total_slots !== "") {
      setSlots([...Array(total_slots).keys()].map((key) => ({ key: key + 1 })));
    }
  }, [total_slots]);

  useEffect(() => {
    if (vehicles.length !== 0) {
      updateSlotsWithParkedVehicles(vehicles);
    } else {
      setSlots(
        [...Array(total_slots).keys()].map((key) => ({
          key: key + 1,
        }))
      );
    }
  }, [vehicles,total_slots]);

  return (
    <div className="VisualRepresentation card">
      <div className="card-body">
        <div className="parking">
          {slots.map((item) => {
            const vehiclesArray = item.vehicles || [];

            return (
              <div className="parking-space" key={item.key}>
                <h4>{item.key}</h4>
                {vehiclesArray.length > 0 && (
                  <div className="parked-vehicles">
                    {vehiclesArray[0].vehicleType === "car" ? (
                      <img className="car" src={carImg} alt="Car" />
                    ) : (
                      vehiclesArray[0].vehicleType === "bike" &&
                      Array.from({ length: vehiclesArray[0].count }).map(
                        (_, index) => (
                          <img
                            className="bike"
                            src={bikeImg}
                            alt="Bike"
                            key={`${item.key}-${vehiclesArray[0].vehicleType}-${index}`}
                          />
                        )
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VisualRepresentation;
