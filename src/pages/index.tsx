import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React from "react";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { BiPlusMedical } from "react-icons/bi";


// alt shift f format code

const inter = Inter({ subsets: ["latin"] });
// interface
interface TodoProp {
  id: number;
  name: string;
  status: string;
}

export default function Home() {
  const [edit, setEdit] = useState(0);
  const [works, setWorks] = useState("");
  const [prevValue, setPrevValue] = useState("")
  const [todos, setTodos] = useState<TodoProp[]>([]);

  const handleAddState = () => {
    if (works)
      setTodos((prev) => 
      [
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
    setEdit(todoId);
  };



  const handleBlur =(idItem: number)=>{

    setTodos((prev)=>{
      const curPrev = [...prev]
      const newValue = curPrev.findIndex((e)=> e.id  === idItem)
      curPrev[newValue].name = prevValue
      // console.log(curPrev[newValue].name);
      

       return curPrev
    })
    
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>,idItem: number) => {
    if (event.key === 'Enter') {
      const result = todos.find((e) => e.id === idItem);
      if (!result) {
        return;
      } else {
        if (result.id === idItem) 
          setEdit(0)
          
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-vw bg-[#489cc1]">
      <div className="flex flex-col w-[500px] h-auto gap-8 bg-white items-center justify-center ">
        <div className="flex w-full items-center justify-center text-5xl font-bold">TODOLIST</div>
        <div className="flex gap-5  ">
          <input
            value={works}
            type={"text"}
            onChange={(e) => setWorks(e.target.value)}
            id="firstInput"
            className="outline-none border border-blue-500 px-4 py-2 w-[400px]"
            placeholder="What needs to be done"
          />

          <button className="px-5 py-5 bg-[#489cc1] cursor-pointer text-black"  onClick={handleAddState}>
            <BiPlusMedical size={24}/>
          </button>

        </div>

        <ul>
          {todos.map((item, index) => {
            return (
              <li key={index} className="flex gap-10 items-center">
               

                  <input
                  disabled={(edit !== item.id)}
                    id={`${item.id}`}
                    type="text"
                    name={item.name}
                    value={item.name}
                    onBlur={() =>handleBlur(item.id)}
                    onFocus={()=> { setPrevValue(item.name)}}
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
            onKeyDown={(e)=>{handleKeyDown(e,item.id)}}
                  />
                
                <button
                  onClick={() => handleDeleteJob(item.id)}
                  className="my-2 cursor-pointer px-5 py-5 bg-blue-300 hover:bg-red-600 "
                >
                  <AiFillDelete />
                </button>
                <button
                  onClick={() => handleEditJob(item.id)}
                  className="my-2 cursor-pointer px-5 py-5 bg-blue-300 hover:bg-red-600 "
                >
                  <HiPencil />
                </button>
                
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
