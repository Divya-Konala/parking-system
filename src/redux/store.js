import { createStore } from "redux";
import parking_lot from "./reducer";

const store = createStore(parking_lot);

// store.subscribe(() => console.log(store.getState()));

export default store;
