import { ActionCreater } from ".";

export const QUERY_CHANGE_ACTION = "QUERY_CHANGE_ACTION";

export const querychangeAction: ActionCreater<String> = (query: string) => ({
  type: QUERY_CHANGE_ACTION,
  payload: query,
});
