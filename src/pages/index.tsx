import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { BiPlusMedical } from "react-icons/bi";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import produce from "immer";

interface TodoProp {
  id: number;
  name: string;
  status: boolean;
  priority: string;
  point: number;
}
export default function Home() {
  const [edit, setEdit] = useState(-1);
  const [works, setWorks] = useState("");
  const [prevValue, setPrevValue] = useState("");
  const [prevNum, setPrevNum] = useState(0);
  // const [status, setStatus] = useState(false);
  const [priority, setPriority] = useState("Hight");
  const [point, setPoint] = useState(1);
  const [todos, setTodos] = useState<TodoProp[]>([]);
  const ref = useRef<Array<HTMLDivElement | null>>([]);

  const min = 1;
  const max = 100;
  useEffect(() => {
    // console.log("totos", todos);
  }, [todos]);

  const handleAddState = () => {
    if (works && point)
      setTodos((prev) => [
        ...prev,
        {
          id: Math.floor(Math.random() * 1000),
          name: works,
          status: false,
          priority: priority,
          point: point,
        },
      ]);
    setWorks("");
    setPoint(1);
  };
  //
  const handleDeleteJob = (todoId: number) => {
    setTodos((prev) => {
      return prev.filter((e) => e.id !== todoId);
    });
  };

  const handleEditJob = (index: number) => {
    setEdit(index);
  };

  const handleBlur = (idItem: number) => {
    setTodos((prev) => {
      const curPrev = [...prev];
      const newValue = curPrev.findIndex((e) => e.id === idItem);
      curPrev[newValue].name = prevValue;
      curPrev[newValue].point = prevNum;

      return curPrev;
    });
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    idItem: number
  ) => {
    if (event.key === "Enter") {
      const result = todos.find((e) => e.id === idItem);

      if (result?.id === idItem) {
        setEdit(-1);
      }
    }
  };

  const handleCheck = (idx: number, newStatus: boolean) => {
    console.log("idx", idx, newStatus);
    const nextState = produce(todos, (draftState) => {
      draftState[idx].status = newStatus;
    });

    setTodos(nextState);
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
              onChange={(e) => handleChange(e)}
            />
            <select value={priority} onChange={(e) => handleSelect(e)}>
              <option value={"Hight"}>Hight</option>
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
          {todos.map((item, i) => {
            return (
              <li
                key={i}
                className="grid grid-cols-3 gap-10 items-center justify-between"
              >
                <div className="flex">
                  <input
                    type="checkbox"
                    checked={item.status}
                    onChange={() => handleCheck(i, !item.status)}
                    className="w-full inline-block"
                  />
                  <input
                    disabled={edit !== i}
                    id={`${item.id}`}
                    type="text"
                    name={item.name}
                    ref={(el) => (ref.current[i] = el)}
                    value={item.name}
                    className={`pl-3 ${
                      item.status ? "line-through" : {}
                    } w-full flex justify-between`}
                    onBlur={() => handleBlur(item.id)}
                    onFocus={() => {
                      setPrevValue(item.name);
                    }}
                    onChange={(e) => {
                      setTodos((prev) => {
                        const newTodos = [...prev];
                        const index = prev.findIndex(
                          (todo) => todo.id === item.id
                        );

                        newTodos[index].name = e.target.value;
                        return newTodos;
                      });
                    }}
                    onKeyDown={(e) => {
                      handleKeyDown(e, item.id);
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <input
                    type="number"
                    value={item.point}
                    onBlur={() => handleBlur(item.id)}
                    onFocus={() => {
                      setPrevNum(item.point);
                      // console.log(item.point);
                    }}
                    onChange={(e) => {
                      setTodos((prev) => {
                        const newTodos = [...prev];
                        const index = prev.findIndex(
                          (todo) => todo.id === item.id
                        );

                        newTodos[index].point = Number(e.target.value);
                        return newTodos;
                      });
                    }}
                    onKeyDown={(e) => {
                      handleKeyDown(e, item.id);
                    }}
                    disabled={edit !== i}
                    className="w-10"
                    min={1}
                    max={100}
                  />

                  <select value={priority}>
                    <option value={"Hight"}>Hight</option>
                    <option value={"Medium"}>Medium</option>
                    <option value={"Low"}>Low</option>
                  </select>
                </div>

                <div className="flex justify-end gap-5">
                  <button
                    onClick={() => handleDeleteJob(item.id)}
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
