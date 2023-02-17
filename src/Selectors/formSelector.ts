import { State } from "../Store";

export const formSelector = (state: State) => {
  return state.showForm?.showForm;
};
