import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { closeFormAction, openFormAction } from "./actions/formActions";
import { querychangeAction } from "./actions/queryChange";
import { formSelector } from "./Selectors/formSelector";
import { doneListSelector, querySelector } from "./Selectors/querySelector";
import { MdDelete } from "react-icons/md";
import {
  checkboxClickedAction,
  doneListCheckboxAction,
  doneListDeleteAction,
  todoDeleteAction,
} from "./actions/saareActions";

const Content = () => {
  const [query, setQuery] = useState<string>();

  const dispatch = useDispatch();

  const handleFormOpenDispatch = () => {
    dispatch(openFormAction());
  };

  const handleFormCloseDispatch = () => {
    dispatch(closeFormAction());
  };

  const handleQueryChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(querychangeAction(query));
    setQuery("");
  };

  const handleDelete = (index: number) => {
    console.log("index", index);
    dispatch(todoDeleteAction(index));
  };

  const handleDoneDelete = (index: number) => {
    console.log("index", index);
    dispatch(doneListDeleteAction(index));
  };

  const handleCheckbox = (index: number) => {
    console.log("index", index);
    dispatch(checkboxClickedAction(index));
    dispatch(todoDeleteAction(index));
  };

  const handledoneListCheckbox = (index: number) => {
    dispatch(doneListCheckboxAction(index));
    dispatch(doneListDeleteAction(index));
  };
  const formSelect = useSelector(formSelector);
  const querySelect = useSelector(querySelector);
  const doneListSelect = useSelector(doneListSelector);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Things to get done</h1>
      <h3 className="mt-10 text-xl font-semibold">Things to do</h3>
      <div className="mt-3 ">
        {querySelect.map((value, index: number) => {
          if (value === "") {
            return;
          }
          return (
            <div className="flex items-center space-x-2.5">
              <input
                onClick={() => {
                  handleCheckbox(index);
                }}
                type="checkbox"
              />
              <div className="text-base font-semibold text-gray-700">
                {value}
              </div>
              <MdDelete
                onClick={() => handleDelete(index)}
                className="text-2xl text-red-500 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={handleFormOpenDispatch}
        className="flex items-center justify-center gap-1 px-5 py-2 mt-5 text-white bg-blue-500 rounded-full"
      >
        {" "}
        <span>
          {" "}
          <AiOutlinePlus />
        </span>
        Add a todo{" "}
      </button>{" "}
      <form
        onSubmit={handleSubmit}
        className={
          formSelect === false
            ? "hidden"
            : "p-6 mt-5 space-y-4 border border-gray-100 rounded-md shadow-sm"
        }
      >
        <h3 className="text-lg font-medium">Write your todo</h3>
        <input
          onChange={handleQueryChange}
          required
          type="text"
          placeholder="Write your todo here"
          className="p-3 border border-gray-300 rounded-md shadow-sm h-9 w-72 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <div>
          <button
            type="submit"
            className="font-medium px-4 py-1.5 text-white bg-blue-500 border border-blue-500 rounded-md"
          >
            Save
          </button>
          <button
            onClick={handleFormCloseDispatch}
            type="button"
            className="px-4 py-1.5 ml-3 font-medium border border-gray-300 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
      <h3 className="mt-4 text-xl font-semibold">Things done</h3>
      <div className="mt-3 ">
        {doneListSelect.map((value, index) => {
          return (
            <div className="flex items-center space-x-2.5">
              <input
                onClick={() => {
                  handledoneListCheckbox(index);
                }}
                checked={true}
                type="checkbox"
              />
              <div className="text-base font-semibold text-gray-700">
                {value}
              </div>

              <MdDelete
                onClick={() => handleDoneDelete(index)}
                className="text-2xl text-red-500 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
