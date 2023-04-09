import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { BiPlusMedical } from "react-icons/bi";
import { idText } from "typescript";
import produce from "immer";

interface TodoProp {
  id: number;
  name: string;
  status: boolean;
  priority: string;
}
export default function Home() {
  const [edit, setEdit] = useState(-1);
  const [works, setWorks] = useState("");
  const [prevValue, setPrevValue] = useState("");
  const [status, setStatus] = useState(false);
  const [priority, setPriority] = useState("Hight");
  const [todos, setTodos] = useState<TodoProp[]>([]);
  const ref = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    console.log("totos", todos);
  }, [todos]);

  const handleAddState = () => {
    if (works)
      setTodos((prev) => [
        ...prev,
        {
          id: Math.floor(Math.random() * 1000),
          name: works,
          status: false,
          priority: priority,
        },
      ]);
    setWorks("");
  };
  //
  const handleDeleteJob = (todoId: number) => {
    setTodos((prev) => {
      return prev.filter((e) => e.id !== todoId);
    });
  };

  const handleEditJob = (index: number) => {
    setEdit(index);
    console.log(index);
  };

  const handleBlur = (idItem: number) => {
    setTodos((prev) => {
      const curPrev = [...prev];
      const newValue = curPrev.findIndex((e) => e.id === idItem);
      curPrev[newValue].name = prevValue;

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
      console.log(ref.current[edit]);

      ref.current[edit]!.focus();
    }
  }, [edit]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
              onFocus={() => {}}
              value={works}
              type={"text"}
              onChange={(e) => setWorks(e.target.value)}
              id="firstInput"
              className="outline-none px-4 py-2 w-[300px] box-border"
              placeholder="What needs to be done"
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

        <ul className="w-full box-border pl-5 ">
          {todos.map((item, i) => {
            return (
              <li key={i} className="flex gap-10 items-center ">
                <input
                  type="checkbox"
                  checked={item.status}
                  onChange={() => handleCheck(i, !item.status)}
                />
                <input
                  disabled={edit !== i}
                  id={`${item.id}`}
                  type="text"
                  name={item.name}
                  ref={(el) => (ref.current[i] = el)}
                  value={item.name}
                  className={`pl-3 ${item.status ? "line-through" : {}}`}
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

                <div className="">{item.priority}</div>

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
