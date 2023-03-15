import { State } from "../Store";

function stateSelector(stateObject: any) {
  return Object.keys(stateObject).map((id: any) => stateObject[id as any]);
}

export const querySelector = (state: State) => {
  if (
    state.query.filteredSelect &&
    state.query.filteredDate &&
    state.query.todos
  ) {
    console.log("chl raha hai");

    if (state.query.filteredSelect === "") {
      let array = stateSelector(state.query.todos);
      return array;
    } else if (state.query.filteredSelect === "all") {
      console.log("select", state.query.filteredSelect);

      return stateSelector(state.query.todos);
    } else if (state.query.filteredSelect === "high") {
      return stateSelector(state.query.todos).filter(
        (t: any) =>
          t.priority === state.query.filteredSelect &&
          t.due_date === state.query.filteredDate
      );
    } else if (state.query.filteredSelect === "medium") {
      console.log("state.query.todos", state.query.todos);
      return stateSelector(state.query.todos).filter(
        (t: any) =>
          t.priority === state.query.filteredSelect &&
          t.due_date === state.query.filteredDate
      );
    } else if (state.query.filteredSelect === "low") {
      return stateSelector(state.query.todos).filter(
        (t: any) =>
          t.priority === state.query.filteredSelect &&
          t.due_date === state.query.filteredDate
      );
    }
  } else {
    return stateSelector(state.query.firebaseTodo);
  }
};

export const doneListSelector = (state: State) => {
  return state.query.doneQuery;
};
