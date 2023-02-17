import produce from "immer";
import { Action } from "../actions";
import { CLOSE_FORM_ACTION, OPEN_FORM_ACTION } from "../actions/formActions";

export type State = {
  showForm: boolean;
};

export const initialState: State = {
  showForm: false,
};

function formReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case OPEN_FORM_ACTION:
      return produce(state, (draft) => {
        draft.showForm = true;
      });

    case CLOSE_FORM_ACTION:
      return produce(state, (draft) => {
        draft.showForm = false;
      });

    default:
      return state;
  }
}

export default formReducer;
