import { ActionCreater } from ".";

export const QUERY_CHANGE_ACTION = "QUERY_CHANGE_ACTION";
export const QUERY_CHANGE_ACTION_ARR = "QUERY_CHANGE_ACTION_ARR";

export const querychangeAction: ActionCreater<{
  id: number;
  query: string;
  priority: string;
  due_date: string;
}> = (id: number, query: string, priority: string, due_date: string) => ({
  type: QUERY_CHANGE_ACTION,
  payload: { id, query, priority, due_date },
});

export const EDITED_TODO_CHANGE_AC = "EDITED_TODO_CHANGE_AC";

export const EditedTodoChangeAction: ActionCreater<{
  id: number;
  query: string;
  select: string;
  due_date: string;
}> = (
  editedQuery: string,
  editedSelect: string,
  editedDate: string,
  id: number
) => ({
  type: EDITED_TODO_CHANGE_AC,
  payload: {
    query: editedQuery,
    select: editedSelect,
    due_date: editedDate,
    id,
  },
});

export const querychangeActionArr: ActionCreater<String[]> = (
  query: string[]
) => ({
  type: QUERY_CHANGE_ACTION_ARR,
  payload: query,
});

export const TODO_FILTERING_AC = "TODO_FILTERING_AC";

export const todosFilteringAction: ActionCreater<{
  filteredSelect: string;
  filteredDate: string;
}> = (filteredSelect: string, filteredDate: string) => ({
  type: TODO_FILTERING_AC,
  payload: { filteredDate, filteredSelect },
});
