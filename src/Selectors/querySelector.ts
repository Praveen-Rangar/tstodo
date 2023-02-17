import { State } from "../Store";

export const querySelector = (state: State) => {
  return state.query.query;
};

export const doneListSelector = (state: State) => {
  return state.query.doneQuery;
};
