import {
  ADD_NEW,
  CLEAR_SLOT,
  POPULATE,
  UPDATE_FILTER,
  UPDATE_FORM,
} from "./actionTypes";

const localStorageKey = "parking_lot_state";

const initialState = localStorage.getItem(localStorageKey)
  ? JSON.parse(localStorage.getItem(localStorageKey))
  : {
      total_slots: "",
      filled: 0,
      vehicles: [],
      available_slots: [],
      dup_err: 0,
      regfilter: "",
      colorfilter: "",
      slotfilter: "",
      vehicleTypefilter: "",
    };

const parking_lot = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case UPDATE_FORM:
      newState = {
        ...state,
        [action.field.name]: action.field.value,
      };
      break;

    case POPULATE:
      {
        let s = [];
        for (let i = state.filled + 1; i <= state.total_slots; i++) {
          s.push({ slot: i, vehicleType: null });
        }
        newState = {
          ...state,
          available_slots: s,
        };
      }
      break;
    case CLEAR_SLOT:
      {
        const exitVehicleType = action.slot.vehicleType;

        const exitVehicle = state.vehicles.find(
          (item) => item.registration === action.registration
        );
        const currentDate = Date.now();
        const prevDate = new Date(exitVehicle.date).getTime();
        const parkedTime = Math.floor((currentDate - prevDate) / (1000 * 60));
        const parkingCharges = 20 + parkedTime * 1;
        const userConfirmed = window.confirm(
          `parking charges: ${parkingCharges}. Payment completed?`
        );

        if (!userConfirmed) {
          newState = state;
          break;
        }

        const updatedAvailableSlots = [...state.available_slots];
        const slotIndex = updatedAvailableSlots.findIndex(
          (slot) => slot.slot === action.slot.slot
        );

        if (slotIndex === -1) {
          updatedAvailableSlots.push(action.slot);
          updatedAvailableSlots.sort((m, n) => m.slot - n.slot);
        } else {
          updatedAvailableSlots[slotIndex].vehicleType = null;
        }

        newState = {
          ...state,
          vehicles: state.vehicles.filter(
            (item) => item.registration !== action.registration
          ),
          filled:
            state.filled - parseFloat(exitVehicleType === "bike" ? 0.5 : 1),
          available_slots: updatedAvailableSlots,
        };
      }
      break;
    case ADD_NEW:
      if (!checkExists(state.vehicles, action.reg)) {
        // Find the first available slot for the vehicle type
        let available = state.available_slots;
        let slot = state.available_slots.find(
          (slot) =>
            slot.vehicleType === null || slot.vehicleType === action.vehicleType
        );
        if (slot) {
          if (
            (slot.vehicleType === null && action.vehicleType === "car") ||
            (slot.vehicleType === "bike" && action.vehicleType === "bike")
          ) {
            available = available.filter((item) => item.slot !== slot.slot);
          } else {
            available = available.map((item) => {
              if (item.slot === slot.slot) {
                item.vehicleType = action.vehicleType;
              }
              return item;
            });
          }
          newState = {
            ...state,
            vehicles: [
              {
                slot,
                registration: action.reg,
                color: action.colour,
                vehicleType: action.vehicleType,
                date: Date.now(),
              },
              ...state.vehicles,
            ],
            available_slots: available,
            filled:
              state.filled +
              parseFloat(action.vehicleType === "bike" ? 0.5 : 1),
            dup_err: 0,
          };
        }
      } else {
        newState = {
          ...state,
          dup_err: 1,
        };
      }
      break;

    case UPDATE_FILTER:
      newState = {
        ...state,
        [action.filter.name]: action.filter.val,
      };
      break;
    default:
      newState = state;
      break;
  }
  localStorage.setItem(localStorageKey, JSON.stringify(newState));
  return newState;
};

function checkExists(data, key) {
  let result = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].registration === key) {
      result = true;
      break;
    }
  }
  return result;
}

export default parking_lot;
