import { ActionCreater } from ".";

export const OPEN_FORM_ACTION = "OPEN_FORM_ACTION";

export const openFormAction: ActionCreater = () => ({
  type: OPEN_FORM_ACTION,
});

export const CLOSE_FORM_ACTION = "CLOSE_FORM_ACTION";

export const closeFormAction: ActionCreater = () => ({
  type: CLOSE_FORM_ACTION,
});
