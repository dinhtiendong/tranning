import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React from "react";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";

// alt shift f format code

const inter = Inter({ subsets: ["latin"] });
// interface
interface TodoProp {
  id: number;
  name: string;
  status: string;
}

export default function Home() {
  const [edit, setEdit] = useState(false);
  const [works, setWorks] = useState("");
  const [todos, setTodos] = useState<TodoProp[]>([]);

  const handleAddState = () => {
    if (works)
      setTodos((prev) => [
        ...prev,
        {
          id: Math.floor(Math.random() * 1000),
          name: works,
          status: "TODO",
        },
      ]);
    setWorks("");
  };

  const handleDeleteJob = (todoId: number) => {
    setTodos((prev) => {
      return prev.filter((e) => e.id !== todoId);
    });
  };

  const handleEditJob = (todoId: number) => {
    setEdit(true);

    const result = todos.find((e) => e.id === todoId);
    if (!result) {
      return;
    } else {
      if (result.id === todoId) {
        console.log("true");

        let changeValue = document.getElementById(`${result.id}`);
        console.log(changeValue);

        changeValue?.removeAttribute("disabled");
      }
    }
  };

  const handleUpdate = (todoId: number) => {
    // setEdit(true);

    const result = todos.find((e) => e.id === todoId);
    if (!result) {
      return;
    } else {
      if (result.id === todoId) console.log(result);
      let changeValue = document.querySelector(`input[name="${result.name}"]`);
      console.log(changeValue);

      changeValue?.setAttribute("disabled", "");

      setEdit(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8 h-screen items-center border border-red-500 justify-center ">
        <div className="flex gap-5 h-screen justify-center items-center">
          <input
            value={works}
            type={"text"}
            onChange={(e) => setWorks(e.target.value)}
            id="firstInput"
            className="outline-none border border-blue-500 px-4 py-2 w-[400px]"
          />

          <input
            onClick={handleAddState}
            type="button"
            className="outline-none px-4 py-2 bg-blue-500 rounded-md text-white"
            value="Add"
          />
        </div>

        <ul>
          {todos.map((item, index) => {
            return (
              <li key={index} className="flex gap-10 items-center">
                {/* setReworks(item.name) */}
                {edit === false ? (
                  <input
                    id={`${item.id}`}
                    type="text"
                    value={item.name}
                    disabled={true}
                  />
                ) : (
                  <input
                  disabled
                    id={`${item.id}`}
                    type="text"
                    name={item.name}
                    value={item.name}
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
                  />
                )}
                <span
                  onClick={() => handleDeleteJob(item.id)}
                  className="my-2 cursor-pointer px-5 py-5 bg-blue-300 hover:bg-red-600 "
                >
                  <AiFillDelete />
                </span>
                <span
                  onClick={() => handleEditJob(item.id)}
                  className="my-2 cursor-pointer px-5 py-5 bg-blue-300 hover:bg-red-600 "
                >
                  <HiPencil />
                </span>

                <span
                  onClick={() => handleUpdate(item.id)}
                  className={`my-2 cursor-pointer px-5 py-5 bg-blue-300 hover:bg-red-600 ${
                    edit === false
                      ? "opacity-0 cursor-default disabled"
                      : "opacity-100 cursor-pointer"
                  }`}
                >
                  Save
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
