import produce from "immer";
import { Action } from "../actions";
import { QUERY_CHANGE_ACTION } from "../actions/queryChange";
import {
  CHECKBOX_CLICKED_ACTION,
  DONE_LIST_CHECKBOX,
  DONE_LIST_DELETE_ACTION,
  TODO_DELETE_ACTION,
} from "../actions/saareActions";

export type State = {
  query: string[];
  index: number;
  doneQuery: string[];
};

export const initialState: State = {
  query: [],
  index: 0,
  doneQuery: [],
};

function queryChangeReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case QUERY_CHANGE_ACTION:
      return produce(state, (draft) => {
        draft.query = [...draft.query, action.payload];
      });

    case TODO_DELETE_ACTION:
      return produce(state, (draft) => {
        draft.query = draft.query.filter((element, i) => {
          return i !== action.payload;
        });
      });

    case CHECKBOX_CLICKED_ACTION:
      return produce(state, (draft) => {
        draft.doneQuery = [...draft.doneQuery, draft.query[action.payload]];
      });

    case DONE_LIST_DELETE_ACTION:
      return produce(state, (draft) => {
        draft.doneQuery = draft.doneQuery.filter((element, i) => {
          return i !== action.payload;
        });
      });

    case DONE_LIST_CHECKBOX:
      return produce(state, (draft) => {
        draft.query = [...draft.query, draft.doneQuery[action.payload]];
      });

    default:
      return state;
  }
}

export default queryChangeReducer;
