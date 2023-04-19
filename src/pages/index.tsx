import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import { HiPencil } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { BiPlusMedical } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "antd";
import ReactPaginate from "react-paginate";
import Pagination from "../pages/Pagination";
import _ from "lodash";
import {
  addTodo,
  deleteTodo,
  handleCheck,
  editTodo,
  editNumTodo,
  handleBlurRedux,
  handleChangeOption,
} from "./store/todoSlide";
import { TodoProp } from "./interfaces";
import { RootState } from "./store/store";
import { v4 } from "uuid";
import ReactDOM from "react-dom";
import { current } from "immer";

export default function Home() {
  const todoList = useSelector((state: RootState) => state.todo);

  const [edit, setEdit] = useState(-1);

  const [prevValue, setPrevValue] = useState("");
  const [prevNum, setPrevNum] = useState(0);
  const [works, setWorks] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [point, setPoint] = useState(1);
  const [keyWords, setKeyWords] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(true);
  const [checkValue, setCheckValue] = useState<String>("All");
  const ref = useRef<Array<HTMLDivElement | null>>([]);
  const dispatch = useDispatch();
  const [currentItems, setCurrentItems] = useState<TodoProp[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const newStatus = ["High", "Medium", "Low"];
  const itemsPerPage = 2;
  const [totalPage,setTotalPage ] = useState<number>(1)
  const [currentPage,setCurrentPage] = useState<number>(1)
  
  const handleAddState = () => {
    if (works)
      dispatch(
        addTodo({
          id: v4(),
          name: works,
          status: false,
          point: point,
          priority: priority,
          flag: false,
        })
      );

    setOpen(false);
    setShowModal(false);
    // setCurrentItems(todoList)
    setWorks("");
    setPoint(1);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddState();
    }
    
  };

  const handleDeleteJob = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const handleEditJob = (id: number) => {
    setEdit(id);
  };

  const handleBlur = (id: string) => {
    dispatch(handleBlurRedux({ id, prevValue, prevNum }));
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    idItem: string
  ) => {
    if (event.key === "Enter") {
      setEdit(-1);
    }
  };

  const handleCheckBox = (id: string, newStatus: boolean) => {
    dispatch(handleCheck({ id, newStatus }));
    
  };

  useEffect(() => {
    if (ref.current[edit]) {
      ref.current[edit]!.focus();
    }
  }, [edit]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckValue(event.target.value);
  };
  const handleChangePriority = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    dispatch(handleChangeOption({ value: e.target.value, id }));
  };

  const handleModal = () => {
    setShowModal(true);
    setOpen(true);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    
    setCurrentItems(fillterItems.slice(itemOffset, endOffset));
    
    setTotalPage(Math.ceil(todoList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage,todoList]);
  
  // đoạn này xử lý để lấy ra vị trí đầu tiên của danh sách những phần tử muốn lấy ra ở trang hiện tại
  const handlePageChange = (selected: number ) => {
    const newOffset = (selected * itemsPerPage) % todoList.length;

    setItemOffset(newOffset);

  };

  const fillterItems = useMemo(()=>{
    return _.filter(todoList,(item: { name: string | string[]; }) =>item.name.includes(keyWords))
  },[todoList,keyWords])

  return (
    <div className="relative flex items-center justify-center h-screen w-vw bg-[#489cc1] ">
      <div className="flex flex-col h-auto gap-8 bg-white items-center p-20">
        <div className="flex w-full items-center justify-center text-5xl font-bold">
          TODOLIST
        </div>

        <div className="flex flex-col gap-y-3">
          <div className="font-bold">Search Anything you want</div>
          <div className="flex items-center border border-black">
            <input
              // value={keyWords}
              type={"text"}
              onChange={(e) => setKeyWords(e.target.value)}
              className="outline-none px-4 py-2 w-[300px] box-border mr-2"
              placeholder="Please input key word need search"
            />
          </div>
        </div>

        <div className="flex flex-col w-[300px] gap-y-3">
          <div className="font-bold">Filter By Status</div>
          <Radio.Group>
            <Radio value={"All"} onChange={radioHandler}>
              All
            </Radio>
            <Radio value={"Completed"} onChange={radioHandler}>
              Completed
            </Radio>
            <Radio value={"Todo"} onChange={radioHandler}>
              Todo
            </Radio>
          </Radio.Group>
        </div>
  
        <ul className="w-[80%] box-border pl-5">
          {currentItems &&
            currentItems
              .filter((item: TodoProp) => {
                if (item.name.includes(keyWords)) {
                  {
                    switch (checkValue) {
                      case "Completed":
                        return item.status === true;
                      case "Todo":
                        return item.status === false;
                      default:
                        return item;
                    }
                  }
                }
               }
              )
              .map((todoProp: TodoProp, i: number) => (
                <li
                  key={todoProp.id}
                  className="grid grid-cols-3 gap-10 items-center justify-between"
                >
                  <div className="flex">
                    <input
                      type="checkbox"
                      checked={todoProp.status}
                      onChange={() => handleCheckBox(todoProp.id, !todoProp.status)}
                      className="w-full inline-block"
                    />
                    <input
                      disabled={edit !== i}
                      id={`${todoProp.id}`}
                      type="text"
                      ref={(el) => (ref.current[i] = el)}
                      value={todoProp.name}
                      className={`pl-3 ${
                        todoProp.status ? "line-through" : {}
                      } w-full flex justify-between`}
                      onBlur={() => handleBlur(todoProp.id)}
                      onFocus={() => {
                        setPrevValue(todoProp.name);
                      }}
                      onChange={(e) => {
                        dispatch(
                          editTodo({ value: e.target.value, id: todoProp.id })
                        );
                      }}
                      onKeyDown={(e) => {
                        handleKeyDown(e, todoProp.id);
                      }}
                    />
                  </div>

                  <div className="flex justify-between">
                    <input
                      type="number"
                      value={todoProp.point}
                      onBlur={() => handleBlur(todoProp.id)}
                      onFocus={() => {
                        setPrevNum(todoProp.point);
                      }}
                      onChange={(e) => {
                        dispatch(
                          editNumTodo({
                            value: Number(e.target.value),
                            id: todoProp.id,
                          })
                        );
                        // handleNumChange
                      }}
                      onKeyDown={(e) => {
                        handleKeyDown(e, todoProp.id);
                      }}
                      disabled={edit !== i}
                      className="w-10"
                      min={1}
                      max={100}
                    />

                    <div className="">
                      <select
                        value={todoProp.priority}
                        onChange={(e) => {
                          handleChangePriority(e, todoProp.id);
                        }}
                      >
                        {newStatus.map((status, i) => {
                          return (
                            <option key={i} value={status}>
                              {status}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-5">
                    <button
                      onClick={() => handleDeleteJob(todoProp.id)}
                      className="my-2 cursor-pointer px-2 py-2 bg-blue-300 hover:bg-red-600 "
                    >
                      <AiFillDelete />
                    </button>
                    <button
                      onClick={() => handleEditJob(i)}
                      className="my-2 cursor-pointer px-2 py-2 bg-blue-300 hover:bg-red-600 "
                    >
                      <HiPencil />
                    </button>
                  </div>
                </li>
              ))}
        </ul>
                        <Pagination

                          currentPage={currentPage}
                          totalPage={totalPage}
                          setCurrentPage={setCurrentPage}
                          onChangePage= {handlePageChange}
                        />
              
        <div className="flex m-5">
          <button
            className="px-5 py-5 bg-[#489cc1] cursor-pointer text-black"
            // onClick={handleAddState}
            onClick={handleModal}
          >
            <BiPlusMedical size={24} />
          </button>
        </div>

        <Transition.Root show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() =>setShowModal(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="flex flex-col gap-3 relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <input
                      value={works}
                      type={"text"}
                      onChange={(e) => setWorks(e.target.value)}
                      className="outline-none px-4 py-2 w-[300px] border border-black mr-2"
                      placeholder="What needs to be done"
                      onKeyDown={(e) => {
                        handleEnter(e);
                      }}
                    />
                    <div>
                      <label className="mr-8 font-bold">Score:</label>
                      <input
                        type="number"
                        placeholder="point"
                        className="w-10 mr-3"
                        value={point}
                        onChange={(e) => setPoint(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <span className="mr-8 font-bold">Status:</span>
                      <select
                        value={priority}
                        onChange={(e) => handleSelect(e)}
                      >
                        <option value={"High"}>High</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"Low"}>Low</option>
                      </select>
                    </div>
                    <button
                      className="p-2 bg-green-500 rounded flex justify-center w-full"
                      onClick={handleAddState}
                    >
                      Save
                    </button>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
}
