import { collection, getDocs } from "firebase/firestore";
import produce from "immer";
import { useEffect } from "react";
import { Action } from "../actions";
import {
  EDITED_TODO_CHANGE_AC,
  FIREBASE_TODO_AC,
  QUERY_CHANGE_ACTION,
  QUERY_CHANGE_ACTION_ARR,
  TODO_FILTERING_AC,
} from "../actions/queryChange";
import {
  CHECKBOX_CLICKED_ACTION,
  DONE_LIST_CHECKBOX,
  DONE_LIST_DELETE_ACTION,
  TODO_DELETE_ACTION,
} from "../actions/saareActions";
import { db } from "../firebase";

export type State = {
  todos: {
    [id: number]: {
      id: number;
      query: string;
      priority: string;
      due_date: string;
    };
  };
  firebaseTodo: {
    [id: string]: {
      id: string;
      query: string;
      priority: string;
      due_date: string;
    };
  };
  index: number;
  doneQuery: string[];
  filteredSelect: string;
  filteredDate: string;
};

export const initialState: State = {
  todos: {},
  index: 0,
  doneQuery: [],
  filteredSelect: "",
  filteredDate: "",
  firebaseTodo: {},
};

function queryChangeReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case QUERY_CHANGE_ACTION:
      return produce(state, (draft) => {
        const { id } = action.payload;
        console.log("payload", action.payload);

        draft.todos = { ...draft.todos, [id]: action.payload };
        //localStorage.setItem("query", JSON.stringify([...draft.todos]));
        console.log("query", draft.todos);
      });

    case EDITED_TODO_CHANGE_AC:
      return produce(state, (draft) => {
        draft.todos = { ...draft.todos, [action.payload.id]: action.payload };
      });

    case FIREBASE_TODO_AC:
      return produce(state, (draft) => {
        draft.firebaseTodo = {
          ...draft.firebaseTodo,
          [action.payload.id]: action.payload,
        };
      });

    case TODO_FILTERING_AC:
      return produce(state, (draft) => {
        console.log(
          "action.payload.filteredSelect",
          action.payload.filteredSelect
        );
        console.log("action.payload.filtereddate", action.payload.filteredDate);

        draft.filteredSelect = action.payload.filteredSelect;
        draft.filteredDate = action.payload.filteredDate;
      });

    // case QUERY_CHANGE_ACTION_ARR:
    //   return produce(state, (draft) => {
    //     draft.query = [...action.payload];
    //     localStorage.setItem("query", JSON.stringify([...draft.query]));
    //   });

    // case TODO_DELETE_ACTION:
    //   return produce(state, (draft) => {
    //     draft.query = draft.query.filter((element, i) => i !== action.payload);
    //     localStorage.setItem("query", JSON.stringify([...draft.query]));
    //   });

    // case CHECKBOX_CLICKED_ACTION:
    //   return produce(state, (draft) => {
    //     draft.doneQuery = [...draft.doneQuery, draft.query[action.payload]];
    //     localStorage.setItem("query", JSON.stringify([...draft.doneQuery]));
    //   });

    // case DONE_LIST_DELETE_ACTION:
    //   return produce(state, (draft) => {
    //     draft.doneQuery = draft.doneQuery.filter((element, i) => {
    //       return i !== action.payload;
    //     });
    //   });

    // case DONE_LIST_CHECKBOX:
    //   return produce(state, (draft) => {
    //     draft.query = [...draft.query, draft.doneQuery[action.payload]];
    //   });

    default:
      return state;
  }
}

export default queryChangeReducer;
