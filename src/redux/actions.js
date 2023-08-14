import {
  ADD_NEW,
  CLEAR_SLOT,
  POPULATE,
  UPDATE_FILTER,
  UPDATE_FORM,
} from "./actionTypes";

export const changeInput = (name, value) => {
  return {
    type: UPDATE_FORM,
    field: { name, value },
  };
};

export const populateData = () => {
  return {
    type: POPULATE,
  };
};

export const clearSlot = (slot,registration) => {
  return {
    type: CLEAR_SLOT,
    slot,
    registration
  };
};

export const addNew = (reg, colour, vehicleType) => {
  return {
    type: ADD_NEW,
    reg,
    colour,
    vehicleType
  };
};

export const updateFilter = (name, val) => {
  return {
    type: UPDATE_FILTER,
    filter: { name, val },
  };
};
