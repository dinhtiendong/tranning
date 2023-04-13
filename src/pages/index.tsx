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
import { addTodo, deleteTodo,handleCheck,editTodo,handleBlurRedux,handleOnKeyDownRedux } from "./store/todoSlide";
import {  TodoProp } from "./interfaces";
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

  const ref = useRef<Array<HTMLDivElement | null>>([]);
  const dispatch = useDispatch();

  const min = 1;
  const max = 100;
  const editStatus = ["high", "medium", "low"];

  // useEffect(() => {
  //   console.log("Status", priority);
  // }, [priority]);


  const handleAddState = () => {

  
    dispatch(
      addTodo({
        id: v4(),
          name : works,
          status: false,
          point: point,
          priority: priority
        
      })
    );
      
    
    setWorks("");
    setPoint(1);
  };
  

  const handleDeleteJob = (todoId: string) => {
    
  dispatch(deleteTodo(todoId));    
  };

  const handleEditJob = ( id: number) => {
      setEdit(-1)    
  };

  const handleBlur = (id: string) => {
    dispatch(handleBlurRedux({ id,prevValue,prevNum}))
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    idItem: string
  ) => {
    if (event.key === "Enter") {
      dispatch(handleOnKeyDownRedux({id:idItem,idx: edit }))
    }
  };

  const handleCheckBox = (idx: number, newStatus: boolean) => {
    dispatch(handleCheck({idx,newStatus}))
  };

  useEffect(() => {
    if (ref.current[edit]) {
      ref.current[edit]!.focus();
    }
  }, [edit]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(min, Math.min(max, Number(e.target.value)));
    setPoint(value);
  };

  const update = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };
  return (
    <div className="flex items-center justify-center h-screen w-vw bg-[#489cc1]">
      <div className="flex flex-col h-auto gap-8 bg-white items-center justify-center relative ">
        <div className="flex w-full items-center justify-center text-5xl font-bold">
          TODOLIST
        </div>
        <div className="flex ">
          <div className="flex items-center justify-center ml-5 border border-black mr-9">
            <input
              value={works}
              type={"text"}
              onChange={(e) => setWorks(e.target.value)}
              className="outline-none px-4 py-2 w-[300px] box-border mr-2"
              placeholder="What needs to be done"
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

        <ul className="w-[80%] box-border pl-5">
          {todoList.map((todoProp: TodoProp, i: number) => {
            // console.log(todoProp);

            return (
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
                        dispatch(editTodo({value:e.target.value,id:todoProp.id}))
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
                    // onBlur={() => handleBlur(todoProp.id)}
                    onFocus={() => {
                      setPrevNum(todoProp.point);
                      // console.log(todoProp.point);
                    }}
                    onChange={(e) => {
                      // setTodos((prev) => {
                      //   const newTodos = [...prev];
                      //   const index = prev.findIndex(
                      //     (todo) => todo.id === todoProp.id
                      //   );
                      //   newTodos[index].point = Number(e.target.value)
                      //   return newTodos;
                      // });
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
                    <select onChange={(e) => update(e)}>
                      {editStatus.map((status, i) => {
                        return (
                          <option value={status} key={i}>
                            {todoProp.priority}
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
            );
          })}
        </ul>
      </div>
    </div>
  );
}
