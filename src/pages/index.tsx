import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { BiPlusMedical } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import produce from "immer";
import {
  addTodo,
  deleteTodo,
  handleCheck,
  editTodo,
  editNumTodo,
  handleBlurRedux,
} from "./store/todoSlide";
import { TodoProp } from "./interfaces";
import { RootState } from "./store/store";
import { v4 } from "uuid";

export default function Home() {
  const todoList = useSelector((state: RootState) => state.todo);

  const [edit, setEdit] = useState(-1);

  const [prevValue, setPrevValue] = useState("");
  const [prevNum, setPrevNum] = useState(0);
  const [works, setWorks] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [point, setPoint] = useState(1);
  const [keyWords, setKeyWords] = useState("");
  const ref = useRef<Array<HTMLDivElement | null>>([]);
  const dispatch = useDispatch();

  const min = 1;
  const max = 100;



  const newStatus = ["High", "Medium", "Low"];
  const handleAddState = () => {
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

    setWorks("");
    setPoint(1);
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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

      setWorks("");
      setPoint(1);
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

  const handleCheckBox = (idx: number, newStatus: boolean) => {
    dispatch(handleCheck({ idx, newStatus }));
  };

  useEffect(() => {
    if (ref.current[edit]) {
      ref.current[edit]!.focus();
    }
    console.log(edit);
  }, [edit]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  const handleRadio = (e: React.FormEvent<HTMLFormElement>) =>{

  }

  return (
    <div className="flex items-center justify-center h-screen w-vw bg-[#489cc1]">
      <div className="flex flex-col h-auto gap-8 bg-white items-center relative ">
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
          <form className="flex justify-between" onChange={(e)=>handleRadio(e)}>
            <span>
              <input type="radio" name="chooseStatus" /> All
            </span>
            <span>
              <input type="radio" name="chooseStatus" /> Completed
            </span>
            <span>
         
              <input type="radio" name="chooseStatus" /> Todo
            </span>
          </form>
          
        </div>

        <ul className="w-[80%] box-border pl-5">
          {todoList
            .filter((item) => item.name.includes(keyWords))
            .map((todoProp: TodoProp, i: number) => (
              <li
                key={todoProp.id}
                className="grid grid-cols-3 gap-10 items-center justify-between"
              >
                <div className="flex">
                  <input
                    type="checkbox"
                    checked={todoProp.status}
                    onChange={() => handleCheckBox(i, !todoProp.status)}
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
                      onChange={(e) => handleSelect(e)}
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
        <div className="flex m-5">
          <div className="flex items-center justify-center ml-5 border border-black mr-9">
            <input
              value={works}
              type={"text"}
              onChange={(e) => setWorks(e.target.value)}
              className="outline-none px-4 py-2 w-[300px] box-border mr-2"
              placeholder="What needs to be done"
              onKeyDown={(e) => {
                handleEnter(e);
              }}
            />
            <input
              type="number"
              placeholder="point"
              className="w-10 mr-3"
              value={point}
              onChange={(e) => setPoint(Number(e.target.value))}
            />
            <select value={priority} onChange={(e) => handleSelect(e)}>
              <option value={"High"}>High</option>
              <option value={"Medium"}>Medium</option>
              <option value={"Low"}>Low</option>
            </select>
          </div>

          <button
            className="px-5 py-5 bg-[#489cc1] cursor-pointer text-black"
            onClick={handleAddState}
          >
            <BiPlusMedical size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
