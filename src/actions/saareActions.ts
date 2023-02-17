import { ActionCreater } from ".";

export const TODO_DELETE_ACTION = "TODO_DELETE_ACTION";

export const todoDeleteAction: ActionCreater<number> = (index: number) => ({
  type: TODO_DELETE_ACTION,
  payload: index,
});

export const CHECKBOX_CLICKED_ACTION = "CHECKBOX_CLICKED_ACTION";

export const checkboxClickedAction: ActionCreater<number> = (
  index: number
) => ({
  type: CHECKBOX_CLICKED_ACTION,
  payload: index,
});

export const DONE_LIST_DELETE_ACTION = "DONE_LIST_DELETE_ACTION";

export const doneListDeleteAction: ActionCreater<Number> = (index: number) => ({
  type: DONE_LIST_DELETE_ACTION,
  payload: index,
});

export const DONE_LIST_CHECKBOX = "DONE_LIST_CHECKBOX";

export const doneListCheckboxAction: ActionCreater<number> = (
  index: number
) => ({
  type: DONE_LIST_CHECKBOX,
  payload: index,
});
