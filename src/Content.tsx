import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closeFormAction, openFormAction } from "./actions/formActions";
import {
  EditedTodoChangeAction,
  fireBaseTodoAction,
  querychangeAction,
  querychangeActionArr,
  todosFilteringAction,
} from "./actions/queryChange";
import { formSelector } from "./Selectors/formSelector";
import { doneListSelector, querySelector } from "./Selectors/querySelector";
import { MdDelete } from "react-icons/md";
import {
  checkboxClickedAction,
  doneListCheckboxAction,
  doneListDeleteAction,
  todoDeleteAction,
} from "./actions/saareActions";
import SettingDropdown from "./SettingDropdown";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Content = (props: any) => {
  const [query, setQuery] = useState<string>();
  const [multiInputQuery, setMultiInputQuery] = useState<string[]>([]);
  const [editedquery, setEditedQuery] = useState<string>();
  const [select, setSelect] = useState();
  const [editedSelect, setEditedSelect] = useState();
  const [date, setDate] = useState();
  const [editedDate, setEditedDate] = useState();
  const [filterSelect, setFilterSelect] = useState();
  const [filterDate, setFilterDate] = useState();
  const [todoForm, setTodoForm] = useState(false);
  const [editedId, setEditedId] = useState(0);
  const [multiInput, setMultiInput] = useState<number[]>([]);
  const [callApi, setCallApi] = useState(0);

  let todoId: number = Math.random();

  const dispatch = useDispatch();

  const fetchpost = async () => {
    await getDocs(collection(db, "todos")).then((querySnapShot) => {
      const newData = querySnapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      newData.map((data) =>
        dispatch(
          fireBaseTodoAction(data.id, data.date, data.query, data.select)
        )
      );
    });
  };

  useEffect(() => {
    fetchpost();
  }, [callApi]);

  const handleFormOpenDispatch = () => {
    dispatch(openFormAction());
  };

  const handleFormCloseDispatch = () => {
    dispatch(closeFormAction());
  };

  const handleQueryChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setCallApi(callApi + 1);
    dispatch(querychangeAction(todoId, query, select, date));
    await addDoc(collection(db, "todos"), {
      query,
      select,
      date,
    });
    setQuery("");
  };

  const handleDelete = (index: number) => {
    dispatch(todoDeleteAction(index));
  };

  const handleDoneDelete = (index: number) => {
    dispatch(doneListDeleteAction(index));
  };

  const handleCheckbox = (index: number) => {
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

  useEffect(() => {
    dispatch(querychangeActionArr(querySelect));
  }, []);

  const handleSelectChange = (e: any) => {
    setSelect(e.target.value);
  };

  const handleDateChange = (e: any) => {
    setDate(e.target.value);
  };

  const handleFilteringSelect = (e: any) => {
    setFilterSelect(e.target.value);
  };

  const handleFilteringDate = (e: any) => {
    setFilterDate(e.target.value);
  };

  const handleSubmitFilteredTodo = () => {
    dispatch(todosFilteringAction(filterSelect, filterDate));
  };

  const handleTodoFormSubmit = (e: any) => {
    e.preventDefault();
    setTodoForm(false);
    dispatch(
      EditedTodoChangeAction(editedquery, editedSelect, editedDate, editedId)
    );
  };

  function editTodoQuery(query: string) {
    setEditedQuery(query);
  }

  function handleEdit(formStatus: boolean, query: string, id: number) {
    setTodoForm(formStatus);
    setEditedQuery(query);
    setEditedId(id);
  }

  const handleMultiInput = () => {};

  return (
    <div className="p-8 flex justify-between ">
      <div className="">
        <h1 className="text-3xl font-bold">Things to get done </h1>
        <div className="flex  items-center space-x-5 ">
          <h3 className="mt-10 text-xl font-semibold">Things to do</h3>
          <div className="mt-10">
            <select name="cars" id="cars" onChange={handleFilteringSelect}>
              <option value="all"> All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <input onChange={handleFilteringDate} className="mt-10" type="date" />
          <button
            onClick={handleSubmitFilteredTodo}
            disabled={filterDate && filterSelect ? false : true}
            className=" mt-10 font-medium px-2 py-0.5 text-white bg-blue-500 border border-blue-500 rounded-md"
          >
            ok
          </button>
        </div>
        <div className="mt-3 ">
          {querySelect?.map(
            (todo: {
              id: number;
              query: string;
              priority: string;
              due_date: string;
            }) => {
              if (todo.query === "") {
                return;
              }
              console.log("select is", todo.priority);

              return (
                <div key={todo.id} className="">
                  <div className="flex items-center space-x-8">
                    <input
                      onClick={() => {
                        handleCheckbox(todo.id);
                      }}
                      type="checkbox"
                    />
                    <div className="text-base font-semibold text-gray-700">
                      {todo.query}
                    </div>

                    <div className="">{todo.priority}</div>
                    <div className="">{todo.due_date}</div>
                    <MdModeEditOutline
                      onClick={() => handleEdit(!todoForm, todo.query, todo.id)}
                      className="cursor-pointer"
                    />
                    <MdDelete
                      onClick={() => handleDelete(todo.id)}
                      className="text-2xl text-red-500 cursor-pointer"
                    />
                  </div>
                  {todoForm ? (
                    <form
                      onSubmit={handleTodoFormSubmit}
                      className={
                        formSelect === false
                          ? "hidden"
                          : "p-6 mt-5 space-y-4 border border-gray-100 rounded-md shadow-sm"
                      }
                    >
                      {/* <h3 className="text-lg font-medium">Edit your todo here</h3> */}
                      <input
                        value={editedquery}
                        onChange={(e: any) => editTodoQuery(e.target.value)}
                        required
                        type="text"
                        placeholder="Edit here"
                        className="p-3 border border-gray-300 rounded-md shadow-sm h-9 w-72 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      <div className="flex space-x-10">
                        <select
                          onChange={(e: any) => setEditedSelect(e.target.value)}
                          name="cars"
                          id="cars"
                        >
                          <option value=""> Priority</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>

                        <input
                          onChange={(e: any) => setEditedDate(e.target.value)}
                          type="date"
                        />
                      </div>
                      <div>
                        <button
                          onClick={handleTodoFormSubmit}
                          type="submit"
                          className="font-medium px-4 py-1.5 text-white bg-blue-500 border border-blue-500 rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setTodoForm(false)}
                          type="button"
                          className="px-4 py-1.5 ml-3 font-medium border border-gray-300 rounded-md"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    ""
                  )}
                </div>
              );
            }
          )}
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
          <div className="flex items-center">
            <input
              onChange={handleQueryChange}
              required
              type="text"
              placeholder="Write your todo here"
              className="p-3 border border-gray-300 rounded-md shadow-sm h-9 w-72 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <AiOutlinePlus
              className="cursor-pointer ml-5 text-xl"
              onClick={() => setMultiInput([...multiInput, todoId])}
            />
          </div>
          <div className="flex flex-col space-y-3">
            {multiInput.map(() => (
              <input
                onChange={(e: any) => setMultiInputQuery([e.target.value])}
                required
                type="text"
                placeholder="Write your todo here"
                className="p-3 border border-gray-300 rounded-md shadow-sm h-9 w-72 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            ))}
          </div>

          <div className="flex space-x-10">
            <select name="cars" id="cars" onChange={handleSelectChange}>
              <option value=""> Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <input onChange={handleDateChange} type="date" />
          </div>
          <div>
            <button
              disabled={query && select && date ? false : true}
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
      <div className="">
        {props.settingOpen ? (
          <SettingDropdown
            darkMode={props.darkMode}
            setDarkMode={props.setDarkMode}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Content;
