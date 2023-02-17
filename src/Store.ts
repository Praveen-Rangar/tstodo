import { combineReducers, createStore } from "redux";
import formReducer from "./reducers/formReducer";
import queryChangeReducer from "./reducers/queryChange";

const reducer = combineReducers({
  showForm: formReducer,
  query: queryChangeReducer,
});

export type State = ReturnType<typeof reducer>;

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
